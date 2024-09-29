import santStanding from "../assets/images/santa_standing_on_sled.png";
import torrus from "../assets/images/Torus_array.png";
import styles from "./components.module.css";
import { Suspense, useEffect, useRef } from "react";
import Card from "../components/Cards";
import SplineViewer from "../components/Spline";
import ReactLenis from "@studio-freight/react-lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;
      const positions = [14, 38, 62, 86];
      const rotations = [-15, -7.5, 7.5, 15];

      // pin cards section
      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // spread cards
      cards.forEach((card, index) => {
        gsap.to(card, {
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          ease: "none",
          scrollTrigger: {
            trigger: container.current.querySelector(".cards"),
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
            id: `spread-${index}`,
          },
        });
      });

      // flip cards and reset rotation with staggered effect
      cards.forEach((card, index) => {
        const frontEl = card.querySelector(".flip-card-front");
        const backEl = card.querySelector(".flip-card-back");

        const staggerOffset = index * 0.05;
        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: container.current.querySelector(".cards"),
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
          id: `rotate-flip-${index}`,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = rotations[index] * (1 - animationProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: "power1.out",
              });
            }
          },
        });
      });
    },
    { scope: container }
  );

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section className="w-full absolute top-0 h-screen main-body ">
      <div className="relative z-10  h-full flex flex-col gap-5 items-center pt-5">
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
        <div className="card-container" ref={container}>
          <section className="cards card-section">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                id={`card-${index + 1}`}
                frontSrc="/card-front.png"
                frontAlt="Card Image"
                backText="Your card details appear here"
                ref={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Home;
