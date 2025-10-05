import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Photo from "./pages/Photo";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Setting from "./pages/Settings";
import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import AuthProvider from "./context/AuthProvider";
import Protected from "./components/Protected";
import Error from "./pages/Error";
import { useAuth } from "@/context/AuthContext";

function AnimatedRoutes() {
  const location = useLocation();
  const { session } = useAuth();
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  };

  const pageTransition: Transition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  const showNav = session;

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/landing" element={<Landing />} />
          <Route
            path="/"
            element={
              <Protected>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Home />
                </motion.div>
              </Protected>
            }
          />
          <Route
            path="/photo"
            element={
              <Protected>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Photo />
                </motion.div>
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <motion.div
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Setting />
                </motion.div>
              </Protected>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/signup"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Signup />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
              >
                <Error />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      {showNav && <Navbar />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen min-w-screen justify-center overflow-hidden bg-white select-none">
          <AnimatedRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
