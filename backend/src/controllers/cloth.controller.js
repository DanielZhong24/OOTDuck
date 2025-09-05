const clothesModel = require('../models/cloth.model');

const listAllClothes = async (req,res)=>{
    try{
        const clothes = await clothesModel.getAllClothes();
        res.status(200).json(clothes);
    }catch(error){
        console.log("Error fetching clothes:",error);
        res.status(500).json({error:"Failed to fetch data"});

    }
};

module.exports = {
    listAllClothes
}