import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Bletter from "../assets/images/B(black).png";
import Iletter from "../assets/images/I_angle(color).png";
import Gletter from "../assets/images/G_angle(color).png";
import gift from "../assets/images/gift.png";
import santStanding from "../assets/images/santa_standing_on_sled.png";
import torrus from "../assets/images/Torus_array.png";
import styles from "./components.module.css";

import { Loader } from "../components";
import { Island, Sky } from "../models";
import SplineViewer from "../components/Spline";

const Home = () => {
  return (
    <section className="w-full h-screen relative overflow-y-hidden">
      <SplineViewer url="https://prod.spline.design/yP7VnrtsZgzFa8ZE/scene.splinecode" />
      <div className="fixed top-10 left-0 right-0 z-10 flex items-center justify-center">
        <div className="flex items-center justify-center w-full gap-8 absolute top-2 left-1/2 -translate-x-1/2">
          <div
            style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
            className="text-[4rem]   font-bold flex gap-2 items-center justify-center mr-8"
          >
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:0s]`}
            >
              H
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:1s] lowercase`}
            >
              I
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:2s] lowercase`}
            >
              D
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:3s] lowercase`}
            >
              E
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:4s] lowercase`}
            >
              O
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:5s] lowercase`}
            >
              U
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:6s] lowercase`}
            >
              S
            </div>
          </div>
          <div
            style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
            className="text-[4rem]  text-yellow-500 font-bold flex gap-2 items-center justify-center"
          >
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:0s]`}
            >
              G
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:1s] lowercase`}
            >
              I
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:2s] lowercase`}
            >
              F
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:3s] lowercase`}
            >
              T
            </div>
            <div
              className={`w-max ${styles.wave} text-center [animation-delay:4s] lowercase`}
            >
              S
            </div>
          </div>
        </div>
        <img
          src={santStanding}
          className={`h-[80px] aspect-auto fixed top-[30%] right-20 ${styles.float}`}
        />
        <img
          src={torrus}
          className={`h-[80px] aspect-auto fixed bottom-[10%] left-36 ${styles.float}`}
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
          {/* <Island /> */}
        </Suspense>
      </Canvas>
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 z-50">
        <div className="w-[30rem] text-black text-center font-bold text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque neque
          justo
        </div>
        <button className={`${styles.pushable}`}>
          <span className={`${styles.front}`}>Create Yours Today</span>
        </button>
      </div>
    </section>
  );
};

export default Home;
