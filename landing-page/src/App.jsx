import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ReactLenis from "@studio-freight/react-lenis";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Loader } from "./components";
import { Sky } from "./models";
import "./pages/globals.css";


import { Home } from "./pages";

const App = () => {
  return (
      <main className=" w-full h-screen main-body">
        <div className=" h-full] absolute inset-0 -z-10 w-full">
          <Canvas className="h-full w-full"
              camera={{
                position: [10, 10, 10],
                fov: 200,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 1000,
              }}
              style={{ width: "100%", height: "500vh" }}
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
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </main>
  );
};

export default App;
