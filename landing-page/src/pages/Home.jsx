import santStanding from "../assets/images/santa_standing_on_sled.png";
import torrus from "../assets/images/Torus_array.png";
import styles from "./components.module.css";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {Gift} from "../models/Gift"

const Home = () => {
 
  return (
    <section className="w-full h-full">
      <div className="relative z-10  h-full flex flex-col gap-4 items-center pt-5">
        <div className=" flex items-center justify-center">
          <div className="md:flex-row flex-col flex items-center justify-center w-full gap-4 md:gap-8 ">
            <div
              style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
              className="text-[3rem] md:text-[4rem] font-bold flex gap-2 items-center justify-center"
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
              className=" text-[3rem] md:text-[4rem]  text-yellow-500 font-bold flex gap-2 items-center justify-center"
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
        <div className="w-full">
          <Canvas style={{height: "20rem"}}>
            <Gift/>
          </Canvas>
        </div>
        <div className="flex flex-col items-center gap-10 z-50">
          <div className="w-[100%] max-w-[30rem] text-black text-center font-bold text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            neque justo.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
          <button className={`${styles.pushable}`}>
            <span className={`${styles.front}`}>Create Yours Today</span>
          </button>
        </div>
        <h2 className="text-4xl md:text-5xl w-full text-center tracking-tight mt-20 text-black font-semibold">
          How to create yours
        </h2>
      </div>
    </section>
  );
};

export default Home;
