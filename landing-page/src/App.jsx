import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ReactLenis from "@studio-freight/react-lenis";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Loader } from "./components";
import { Sky } from "./models";
import "./pages/globals.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const App = () => {
  return (
    <Router>
      <main className="w-full h-screen parent-container">
        <div className="h-full absolute inset-0 -z-10 w-full">
          <Canvas
            camera={{
              position: [0, 0, 0],
              fov: 50,
              aspect: window.innerWidth / window.innerHeight,
              near: 0.1,
              far: 1000,
            }}
            style={{ width: "100%", height: "100vh" }}
          >
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 5, 10]} intensity={2} />
            <spotLight
              position={[0, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
            <hemisphereLight
              skyColor="#b1e1ff"
              groundColor="#000000"
              intensity={1}
            />
            <Sky />
          </Canvas>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
