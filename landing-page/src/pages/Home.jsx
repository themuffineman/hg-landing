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

const Home = () => {
  return (
    <section className="w-full h-screen relative">
      <div className="fixed top-20 left-0 right-0 z-10 flex items-center justify-center">
        {/* <img src={Bletter} className="h-[300px] aspect-auto -mr-10" />
        <img src={Iletter} className="h-[300px] aspect-auto mt-10 " />
        <img src={Gletter} className="h-[300px] aspect-auto -ml-10" /> */}
        <div className="flex size-max -gap-28 relative">
          <div
            style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
            className="text-[9rem] absolute top-0 -right-32  font-bold"
          >
            Hideous
          </div>
          <div
            style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
            className="text-[9rem] absolute top-24 -left-5  text-yellow-500 font-bold"
          >
            Gifts
          </div>
        </div>
        <img
          src={santStanding}
          className={`h-[150px] aspect-auto fixed top-20 left-20 ${styles.float}`}
        />
        <img
          src={gift}
          className={`h-[100px] aspect-auto fixed top-72 right-20 ${styles.float}`}
        />
        <img
          src={torrus}
          className={`h-[100px] aspect-auto fixed top-[45rem] left-36 ${styles.float}`}
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
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5">
        <div className="w-[30rem] text-black text-center font-bold text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque neque
          justo
        </div>
        <button className="text-white shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] active:shadow-[2px_2px_0px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 active:translate-y-0 transition duration-200 ease-in-out shadow-[#00c6ff] bg-gradient-to-r from-[#00c6ff] to-[#0072ff] size-[10rem] text-2xl rounded-2xl p-5 font-semibold  transition ">
          <div class="btn-container">
            <span>Create Now</span>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Home;
