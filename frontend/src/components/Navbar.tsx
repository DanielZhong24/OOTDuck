import { Link, useLocation } from "react-router-dom";
import {
  Shirt,
  UserRound,
  House,
  Camera,
  Check,
  X,
  AlertCircleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import axios from "axios";
import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@supabase/supabase-js";
import failImg from "../assets/fail1.png";
import successImg from "../assets/success.png";

function Navbar() {
  const port = import.meta.env.VITE_BACKEND_ROUTE;
  const fileInputReferance = useRef<HTMLInputElement>(null);
  let location = useLocation();

  const [loading, setLoading] = useState<"idle" | "loading" | "success" | "fail">("idle");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const { session } = useAuth();
  const user: User = session?.user as User;

  const handleFileClick = () => {
    fileInputReferance.current?.click();
  };

  const submitImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading("loading");
    setAlertMessage(null);
    let bodyData = new FormData();
    if (e.target.files) {
      bodyData.append("image", e.target.files[0]);
    } else {
      ("error, image is not supported or wrong file");
      setLoading("idle");
      return;
    }

    bodyData.append("userId", user.id);

    try {
      const response = await axios.post(`${port}api/clothes`, bodyData);
      (response);
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
  };

  return (
    <div>
      {loading !== "idle" && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-white">
          {loading === "loading" && <Spinner variant="circle" color="orange" size={60} />}

          {loading === "success" && (
            <div className="flex h-full w-full flex-col items-center px-4">
              <div className="mt-6 flex w-full justify-center">
                <Alert className="relative w-full max-w-lg">
                  <CheckCircle2Icon color="Green" />
                  <AlertTitle>Success! Your changes have been saved</AlertTitle>
                </Alert>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="flex max-w-md flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
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
                      ease: "easeInOut",
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
                        ease: "easeInOut",
                      }}
                    >
                      <motion.img
                        src={successImg}
                        className="mx-auto w-48 md:w-64"
                        alt="Success Mascot"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, 5, -5, 0],
                          transition: {
                            duration: 0.5,
                            rotate: {
                              duration: 0.6,
                              ease: "easeInOut",
                            },
                          },
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {loading === "fail" && alertMessage && (
            <div className="flex h-full w-full flex-col items-center px-4">
              <div className="mt-6 flex w-full justify-center">
                <Alert variant="destructive" className="w-full max-w-lg">
                  <AlertCircleIcon className="h-5 w-5" />
                  <AlertTitle>Oops!</AlertTitle>
                  <AlertDescription>
                    <p>{alertMessage}</p>
                  </AlertDescription>
                </Alert>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="flex max-w-md flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
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
                      ease: "easeInOut",
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
                        ease: "easeInOut",
                      }}
                    >
                      <motion.img
                        src={failImg}
                        className="mx-auto w-48 md:w-64"
                        alt="Fail Mascot"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, 5, -5, 0],
                          transition: {
                            duration: 0.5,
                            rotate: {
                              duration: 0.6,
                              ease: "easeInOut",
                            },
                          },
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
      <div className="fixed bottom-0 left-0 w-full rounded-2xl border-black bg-gray-100 p-1 pt-5 pb-5 shadow-2xl">
        <div className="flex">
          <div className="group flex-1">
            <Link to="/home" className="flex items-end justify-center text-center">
              <span className="block border-b-2 border-transparent px-1 hover:border-amber-500">
                <House
                  strokeWidth="1"
                  color={location.pathname === "/home" ? "oklch(76.9% 0.188 70.08)" : "black"}
                  fill={location.pathname === "/home" ? "oklch(76.9% 0.188 70.08)" : "none"}
                  size={32}
                  className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105"
                />
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <div className="flex items-end justify-center text-center">
              <span
                className="block border-b-2 border-transparent px-1 hover:border-amber-500"
                onClick={handleFileClick}
              >
                <Camera
                  strokeWidth="1"
                  size={32}
                  className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105"
                />
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={submitImage}
                ref={fileInputReferance}
                capture="environment"
              />
            </div>
          </div>
          <div className="group flex-1">
            <Link to="/photo" className="flex items-end justify-center text-center">
              <span className="block border-b-2 border-transparent px-1 hover:border-amber-500">
                <Shirt
                  strokeWidth="1"
                  color={
                    location.pathname === "/photo" ? "oklch(76.9% 0.188 70.08)" : "black"
                  }
                  fill={
                    location.pathname === "/photo" ? "oklch(76.9% 0.188 70.08)" : "none"
                  }
                  size={32}
                  className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105"
                />
              </span>
            </Link>
          </div>
          <div className="group flex-1">
            <Link to="/settings" className="flex items-end justify-center text-center">
              <span className="block border-b-2 border-transparent px-1 hover:border-amber-500">
                <UserRound
                  strokeWidth="1"
                  color={
                    location.pathname === "/settings"
                      ? "oklch(76.9% 0.188 70.08)"
                      : "black"
                  }
                  fill={
                    location.pathname === "/settings"
                      ? "oklch(76.9% 0.188 70.08)"
                      : "none"
                  }
                  size={32}
                  className="mb-1 block transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:scale-105"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
