import santStanding from "../assets/images/santa_standing_on_sled.png";
import torrus from "../assets/images/Torus_array.png";
import styles from "./components.module.css";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Card from "../components/Cards";
import {Gift} from "../models/Gift"
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  const container = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const positions = [14, 38, 62, 86]; // Initial positions
    const rotations = [-15, -7.5, 7.5, 15]; // Initial rotations
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const totalScrollHeight = window.innerHeight * 3;
      const scrollProgress = scrollTop / totalScrollHeight;
  
      cardRefs.current.forEach((card, index) => {
        const leftPosition = positions[index];
        const rotation = rotations[index];
        
        // Limit the spread range and rotation effect to be much smaller (e.g., max shift by 10%).
        const maxSpreadAmount = 5; // Reduce spread to only 5% from initial position
        const maxRotationAmount = rotation * 0.2; // Smaller rotation change (20% of original)
  
        // Calculate the new position and rotation with a smaller range
        const cardProgress = Math.min(scrollProgress * 100, 100);
        const spreadLeft = leftPosition + (cardProgress * maxSpreadAmount) / 100;
        const spreadRotation = rotation - (cardProgress * maxRotationAmount) / 100;
  
        // Apply styles with reduced spreading and rotation
        card.style.left = `${spreadLeft}%`;
        card.style.transform = `rotate(${spreadRotation}deg)`;
      });
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
 
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
      <div className="card-container" ref={container}>
          <section className="cards card-section">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                id={`card-${index + 1}`}
                frontSrc="/card-front.png"
                frontAlt="Card Image"
                backText={`How it works ${index+1}`}
                ref={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </section>
        </div>
    </section>
  );
};

export default Home;
