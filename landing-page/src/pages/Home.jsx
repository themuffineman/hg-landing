import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Bletter from "../assets/images/B(black).png";
import Iletter from "../assets/images/I_angle(color).png";
import Gletter from "../assets/images/G_angle(color).png";
import gift from "../assets/images/gift.png";
import santStanding from "../assets/images/santa_standing_on_sled.png";
import styles from "./components.module.css";

import { Loader } from "../components";
import { Island, Sky } from "../models";

const Home = () => {
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-5 left-0 right-0 z-10 flex items-center justify-center">
        <img src={Bletter} className="h-[300px] aspect-auto -mr-10" />
        <img src={Iletter} className="h-[300px] aspect-auto mt-10 " />
        <img src={Gletter} className="h-[300px] aspect-auto -ml-10" />
        <img
          src={santStanding}
          className={`h-[150px] aspect-auto absolute top-20 left-20 animation ${styles.float}`}
        />
        <img
          src={gift}
          className={`h-[100px] aspect-auto absolute top-72 right-20 animation ${styles.float}`}
        />
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent`}
        camera={{ near: 0.1, far: 1000 }}
      >
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
          <Island />
        </Suspense>
      </Canvas>
      <button
        id="preloader-start--btn"
        className="btn size-[10rem] text-4xl p-8  transition absolute bottom-28 left-1/2 -translate-x-1/2 [filter:drop-shadow(0px 5px 3px rgba(17,24,55,.21))] bg-gradient-to-r from-pink-500 to-orange-500 "
      >
        <div class="btn-background"></div>
        <div class="btn-container">
          <span>Start Building</span>
        </div>
      </button>
    </section>
  );
};

export default Home;
