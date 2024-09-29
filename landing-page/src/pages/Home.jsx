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
    <section className="w-full h-screen relative overflow-hidden">
      {/* Sky as background */}
      <div className="absolute inset-0 z-0">
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

      <div className="relative z-10 overflow-y-auto h-full flex flex-col gap-5 items-center pt-5">
        <div className=" flex items-center justify-center">
          <div className="flex items-center justify-center w-full gap-8 ">
            <div
              style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
              className="text-[4rem] font-bold flex gap-2 items-center justify-center"
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

            <img
              src={santStanding}
              className={`h-[80px] aspect-auto fixed top-[30%] right-20 ${styles.float}`}
            />
            <img
              src={torrus}
              className={`h-[80px] aspect-auto fixed bottom-[10%] left-36 ${styles.float}`}
            />
          </div>
        </div>
        <SplineViewer url="https://prod.spline.design/yP7VnrtsZgzFa8ZE/scene.splinecode" />
        <div className="flex flex-col items-center gap-5 z-50">
          <div className="w-[30rem] text-black text-center font-bold text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            neque justo
          </div>
          <button className={`${styles.pushable}`}>
            <span className={`${styles.front}`}>Create Yours Today</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
