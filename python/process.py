from network import U2NET

import os
from PIL import Image
import cv2
import gdown
import argparse
import numpy as np
from PIL import Image
import torch
import torch.nn.functional as F
import torchvision.transforms as transforms

from collections import OrderedDict
from options import opt

from transformers import CLIPProcessor, CLIPModel




device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = CLIPModel.from_pretrained("patrickjohncyh/fashion-clip").to(device)
processor = CLIPProcessor.from_pretrained("patrickjohncyh/fashion-clip",use_fast=False)

CLOTHING_CLASSES = [
    {"name": "t-shirt", "category": "top", "height_ratio": 0.7, "season": "spring/summer"},
    {"name": "sweat pants", "category": "bottom", "height_ratio": 0.85, "season": "all seasons"},
    {"name": "shirt", "category": "top", "height_ratio": 0.7, "season": "spring/summer"},
    {"name": "crop top", "category": "top", "height_ratio": 0.65, "season": "spring/summer"},
    {"name": "hoodie", "category": "top", "height_ratio": 0.75, "season": "fall/winter"},
    {"name": "sweater", "category": "top", "height_ratio": 0.75, "season": "fall/winter"},
    {"name": "cardigan", "category": "top", "height_ratio": 0.7, "season": "fall/winter"},
    {"name": "tank top", "category": "top", "height_ratio": 0.6, "season": "spring/summer"},
    {"name": "jacket", "category": "outerwear", "height_ratio": 0.8, "season": "fall/winter"},
    {"name": "jeans", "category": "bottom", "height_ratio": 0.85, "season": "all seasons"},
    {"name": "trousers", "category": "bottom", "height_ratio": 0.8, "season": "all seasons"},
    {"name": "skirt", "category": "bottom", "height_ratio": 0.5, "season": "spring/summer"},
    {"name": "shorts", "category": "bottom", "height_ratio": 0.6, "season": "spring/summer"},
    {"name": "leggings", "category": "bottom", "height_ratio": 0.8, "season": "all seasons"},
    {"name": "dress", "category": "onepiece", "height_ratio": 0.9, "season": "spring/summer"},
    {"name": "coat", "category": "outerwear", "height_ratio": 0.85, "season": "fall/winter"},
    {"name": "leather jacket", "category": "outerwear", "height_ratio": 0.8, "season": "fall/winter"},
    {"name": "denim jacket", "category": "outerwear", "height_ratio": 0.8, "season": "fall/winter"},
    {"name": "puffer jacket", "category": "outerwear", "height_ratio": 0.85, "season": "fall/winter"},
    {"name": "bomber jacket", "category": "outerwear", "height_ratio": 0.8, "season": "fall/winter"},
    {"name": "jumpsuit", "category": "onepiece", "height_ratio": 0.9, "season": "spring/summer"},
    {"name": "romper", "category": "onepiece", "height_ratio": 0.7, "season": "spring/summer"},
    {"name": "suit", "category": "onepiece", "height_ratio": 0.9, "season": "all seasons"},
    {"name": "activewear", "category": "activewear", "height_ratio": 0.75, "season": "spring/summer"}
]

def resize_clothing(img: Image.Image, pred_type: str) -> Image.Image:
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    metadata = next((c for c in CLOTHING_CLASSES if c["name"] == pred_type), None)
    if metadata is None:
        metadata = {"category": "top", "height_ratio": 0.7}  # default

    if metadata["category"] in ["bottom", "activewear"]:
        canvas_w, canvas_h = 400, 500
    else:  
        canvas_w, canvas_h = 400, 400

    target_h = int(canvas_h * metadata["height_ratio"])

    w, h = img.size
    ratio = target_h / h
    new_w = int(w * ratio)
    img = img.resize((new_w, target_h))

    canvas = Image.new("RGBA", (canvas_w, canvas_h), (255, 255, 255, 0))
    x = (canvas_w - new_w) // 2
    y = (canvas_h - target_h) // 2
    canvas.paste(img, (x, y), img)

    return canvas
#too lazy to train a new model, this api allows us to get a percentage of likelyhood base on text prompt
def predict_clothing_type_fashionclip(cropped_img: Image.Image):
    inputs = processor(
        text=[c["name"] for c in CLOTHING_CLASSES],
        images=cropped_img,
        return_tensors="pt",
        padding=True
    ).to(device)
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits_per_image = outputs.logits_per_image
        probability = logits_per_image.softmax(dim=1)
        max_prob,predicted_idx = probability.max(dim=1)
    
    if max_prob.item() < 0.7:
        raise TypeError("Not a valid cloth",max_prob.item())
    return CLOTHING_CLASSES[predicted_idx]["name"]


    
def determine_season(typed_clothing: str):
    SEASON_MAP = {
        't-shirt': 'spring/summer',
        'shirt': 'spring/summer',
        'crop top': 'spring/summer',
        'hoodie': 'fall/winter',
        'sweater': 'fall/winter',
        'cardigan': 'fall/winter',
        'tank top': 'spring/summer',
        'jacket': 'fall/winter',
        'jeans': 'all seasons',
        'trousers': 'all seasons',
        'skirt': 'spring/summer',
        'shorts': 'spring/summer',
        'leggings': 'all seasons',
        'dress': 'spring/summer',
        'coat': 'fall/winter',
        'leather jacket': 'fall/winter',
        'denim jacket': 'fall/winter',
        'puffer jacket': 'fall/winter',
        'bomber jacket': 'fall/winter',
        'jumpsuit': 'spring/summer',
        'romper': 'spring/summer',
        'suit': 'all seasons',
        'activewear': 'spring/summer'
    }

    if typed_clothing in SEASON_MAP:
        return SEASON_MAP[typed_clothing]
    else:
        return 'unknown'

def load_checkpoint(model, checkpoint_path):
    if not os.path.exists(checkpoint_path):
        print("----No checkpoints at given path----")
        return
    model_state_dict = torch.load(checkpoint_path, map_location=torch.device("cpu"))
    new_state_dict = OrderedDict()
    for k, v in model_state_dict.items():
        name = k[7:]  # remove `module.`
        new_state_dict[name] = v

    model.load_state_dict(new_state_dict)
    print("----checkpoints loaded from path: {}----".format(checkpoint_path))
    return model


def get_palette(num_cls):
    """ Returns the color map for visualizing the segmentation mask.
    Args:
        num_cls: Number of classes
    Returns:
        The color map
    """
    n = num_cls
    palette = [0] * (n * 3)
    for j in range(0, n):
        lab = j
        palette[j * 3 + 0] = 0
        palette[j * 3 + 1] = 0
        palette[j * 3 + 2] = 0
        i = 0
        while lab:
            palette[j * 3 + 0] |= (((lab >> 0) & 1) << (7 - i))
            palette[j * 3 + 1] |= (((lab >> 1) & 1) << (7 - i))
            palette[j * 3 + 2] |= (((lab >> 2) & 1) << (7 - i))
            i += 1
            lab >>= 3
    return palette


class Normalize_image(object):
    """Normalize given tensor into given mean and standard dev

    Args:
        mean (float): Desired mean to substract from tensors
        std (float): Desired std to divide from tensors
    """

    def __init__(self, mean, std):
        assert isinstance(mean, (float))
        if isinstance(mean, float):
            self.mean = mean

        if isinstance(std, float):
            self.std = std

        self.normalize_1 = transforms.Normalize(self.mean, self.std)
        self.normalize_3 = transforms.Normalize([self.mean] * 3, [self.std] * 3)
        self.normalize_18 = transforms.Normalize([self.mean] * 18, [self.std] * 18)

    def __call__(self, image_tensor):
        if image_tensor.shape[0] == 1:
            return self.normalize_1(image_tensor)

        elif image_tensor.shape[0] == 3:
            return self.normalize_3(image_tensor)

        elif image_tensor.shape[0] == 18:
            return self.normalize_18(image_tensor)

        else:
            assert "Please set proper channels! Normlization implemented only for 1, 3 and 18"




def apply_transform(img):
    transforms_list = []
    transforms_list += [transforms.ToTensor()]
    transforms_list += [Normalize_image(0.5, 0.5)]
    transform_rgb = transforms.Compose(transforms_list)
    return transform_rgb(img)



def generate_mask(input_image, net, palette, device = 'cpu'):

    img = input_image
    img_size = img.size
    img = img.resize((768, 768), Image.BICUBIC)
    image_tensor = apply_transform(img)
    image_tensor = torch.unsqueeze(image_tensor, 0)

    alpha_out_dir = os.path.join(opt.output,'alpha')
    cloth_seg_out_dir = os.path.join(opt.output,'cloth_seg')

    os.makedirs(alpha_out_dir, exist_ok=True)
    os.makedirs(cloth_seg_out_dir, exist_ok=True)

    with torch.no_grad():
        output_tensor = net(image_tensor.to(device))
        output_tensor = F.log_softmax(output_tensor[0], dim=1)
        output_tensor = torch.max(output_tensor, dim=1, keepdim=True)[1]
        output_tensor = torch.squeeze(output_tensor, dim=0)
        output_arr = output_tensor.cpu().numpy()

    classes_to_save = []

    # Check which classes are present in the image
    for cls in range(1, 4):  # Exclude background class (0)
        if np.any(output_arr == cls):
            classes_to_save.append(cls)

    # Save alpha masks
    for cls in classes_to_save:
        alpha_mask = (output_arr == cls).astype(np.uint8) * 255
        alpha_mask = alpha_mask[0]  # Selecting the first channel to make it 2D
        alpha_mask_img = Image.fromarray(alpha_mask, mode='L')
        alpha_mask_img = alpha_mask_img.resize(img_size, Image.BICUBIC)
        alpha_mask_img.save(os.path.join(alpha_out_dir, f'{cls}.png'))

    # Save final cloth segmentations
    cloth_seg = Image.fromarray(output_arr[0].astype(np.uint8), mode='P')
    cloth_seg.putpalette(palette)
    cloth_seg = cloth_seg.resize(img_size, Image.BICUBIC)
    cloth_seg.save(os.path.join(cloth_seg_out_dir, 'final_seg.png'))
    return cloth_seg



def rgb_to_color_name(rgb):
    """
    Map an (R,G,B) tuple to a simple color name using HSV hue ranges.
    """
    r, g, b = [x/255.0 for x in rgb]
    import colorsys
    h, s, v = colorsys.rgb_to_hsv(r, g, b)

    if v < 0.2:
        return "black"
    elif v > 0.9 and s < 0.2:
        return "white"
    elif s < 0.25:
        return "gray"
    else:
        h_deg = h * 360
        if h_deg < 15 or h_deg >= 345:
            return "red"
        elif h_deg < 45:
            return "orange"
        elif h_deg < 70:
            return "yellow"
        elif h_deg < 160:
            return "green"
        elif h_deg < 260:
            return "blue"
        elif h_deg < 310:
            return "purple"
        else:
            return "pink"




def check_or_download_model(file_path):
    if not os.path.exists(file_path):
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        url = "https://drive.google.com/uc?id=11xTBALOeUkyuaK3l60CpkYHLTmv7k3dY"
        gdown.download(url, file_path, quiet=False)
        print("Model downloaded successfully.")
    else:
        print("Model already exists.")


def load_seg_model(checkpoint_path, device='cpu'):
    net = U2NET(in_ch=3, out_ch=4)
    check_or_download_model(checkpoint_path)
    net = load_checkpoint(net, checkpoint_path)
    net = net.to(device)
    net = net.eval()

    return net


def main(args):

    device = 'cuda:0' if args.cuda else 'cpu'

    # Create an instance of your model
    model = load_seg_model(args.checkpoint_path, device=device)

    palette = get_palette(4)

    img = Image.open(args.image).convert('RGB')

    cloth_seg = generate_mask(img, net=model, palette=palette, device=device)



if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Help to set arguments for Cloth Segmentation.')
    parser.add_argument('--image', type=str, help='Path to the input image')
    parser.add_argument('--cuda', action='store_true', help='Enable CUDA (default: False)')
    parser.add_argument('--checkpoint_path', type=str, default='model/cloth_segm.pth', help='Path to the checkpoint file')
    args = parser.parse_args()

    main(args)