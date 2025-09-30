import { Link,useLocation } from "react-router-dom";
import {Shirt,UserRound,House,Camera,Check, X, AlertCircleIcon,CheckCircle2Icon} from 'lucide-react';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import axios from "axios";
import { useRef, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {motion } from "framer-motion";

function Navbar() {
  const port = import.meta.env.VITE_BACKEND_ROUTE;
  const fileInputReferance = useRef<HTMLInputElement>(null);
  let location = useLocation();

  const [loading, setLoading] = useState<"idle" | "loading" | "success" | "fail">("idle");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleFileClick = () => {
    fileInputReferance.current?.click();
  }

  const submitImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading("loading");
    setAlertMessage(null);
    let bodyData = new FormData();
    if (e.target.files) {
      bodyData.append('image', e.target.files[0]);
    } else {
      console.log("error, image is not supported or wrong file");
      setLoading("idle");
      return;
    }

    bodyData.append("userId", "6bf87d16-ffca-4f6e-bff3-b2a654616acd");

    try {
      const response = await axios.post(`${port}api/clothes`, bodyData);
      console.log(response);
      setLoading("success");
    } catch (e: any) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status === 403) {
          setAlertMessage(e.response.data.error || "Closet limit reached");
          setLoading("fail");

        } else {
          setAlertMessage(e.response.data.error || "Failed to add clothing");
          setLoading("fail");
        }
      } else {
        setAlertMessage("Unknown error occurred");
        setLoading("fail");
      }
    } finally {
      setTimeout(() => setLoading("idle"), 2000);
    }
  }

  return (
    <div>
      {loading !== "idle" && (
        <div className="fixed flex items-center justify-center inset-0 bg-white z-20">
          {loading === "loading" && (
            <Spinner variant="circle" color="orange" size={60} />
          )}


          {loading === "success" && (
            <div className="flex flex-col items-center w-full h-full px-4">
              <div className="w-full flex justify-center mt-6">
                <Alert className="relative max-w-lg w-full">
                  <CheckCircle2Icon color="Green" />
                  <AlertTitle>Success! Your changes have been saved</AlertTitle>
                </Alert>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center max-w-md">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <Check color="green" size={120} className="mb-4 md:mb-6" />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      animate={{
                        scaleY: [1, 1.05, 0.95, 1.02, 1],
                        scaleX: [1, 0.95, 1.05, 0.98, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.img
                        src="./src/assets/success-removebg-preview.png"
                        className="w-48 md:w-64 mx-auto"
                        alt="Success Mascot"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, 5, -5, 0],
                          transition: {
                            duration: 0.5,
                            rotate: {
                              duration: 0.6,
                              ease: "easeInOut"
                            }
                          }
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {loading === "fail" && alertMessage && (
            <div className="flex flex-col items-center w-full h-full px-4">
              <div className="w-full flex justify-center mt-6">
                <Alert variant="destructive" className="max-w-lg w-full">
                  <AlertCircleIcon className="h-5 w-5" />
                  <AlertTitle>Oops!</AlertTitle>
                  <AlertDescription>
                    <p>{alertMessage}</p>
                  </AlertDescription>
                </Alert>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center max-w-md">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <X color="red" size={120} className="mb-4 md:mb-6" />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div
                      animate={{
                        scaleY: [1, 1.05, 0.95, 1.02, 1],
                        scaleX: [1, 0.95, 1.05, 0.98, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <motion.img
                        src="./src/assets/fail1.png"
                        className="w-48 md:w-64 mx-auto"
                        alt="Fail Mascot"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, 5, -5, 0],
                          transition: {
                            duration: 0.5,
                            rotate: {
                              duration: 0.6,
                              ease: "easeInOut"
                            }
                          }
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-100 pt-5 pb-5 rounded-2xl border-black shadow-2xl p-1">
        <div className="flex">
          <div className="group flex-1">
            <Link to="/" className="flex items-end justify-center text-center">
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500">
                <House strokeWidth="1"
                  color={location.pathname === "/" ? "oklch(76.9% 0.188 70.08)" : "black"}
                  fill={location.pathname === "/" ? "oklch(76.9% 0.188 70.08)" : "none"} size={32}
                  className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 " />
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <div className="flex items-end justify-center text-center">
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500" onClick={handleFileClick}>
                <Camera strokeWidth="1" size={32} className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 " />
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={submitImage} ref={fileInputReferance} capture="environment" />
            </div>
          </div>
          <div className="group flex-1">
            <Link to="/photo" className="flex items-end justify-center text-center">
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500">
                <Shirt strokeWidth="1"
                  color={location.pathname === "/photo" ? "oklch(76.9% 0.188 70.08)" : "black"}
                  fill={location.pathname === "/photo" ? "oklch(76.9% 0.188 70.08)" : "none"} size={32}
                  className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 " />
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <Link to="/setting" className="flex items-end justify-center text-center">
              <span className="block px-1 border-b-2 border-transparent hover:border-amber-500">
                <UserRound strokeWidth="1"
                  color={location.pathname === "/setting" ? "oklch(76.9% 0.188 70.08)" : "black"}
                  fill={location.pathname === "/setting" ? "oklch(76.9% 0.188 70.08)" : "none"} size={32}
                  className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105 " />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
