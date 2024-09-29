import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ReactLenis from "@studio-freight/react-lenis";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Loader } from "./components";
import { Island, Sky } from "./models";

import { Home } from "./pages";

const App = () => {
  return (
    <ReactLenis root>
      <main className=" w-full h-full">
        <div className="absolute inset-0 z-0 h-full w-full">
          <Canvas className="w-full h-full" camera={{ near: 0.1, far: 1000 }}>
            <Suspense fallback={<Loader />}>
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
            </Suspense>
          </Canvas>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </main>
    </ReactLenis>
  );
};

export default App;
