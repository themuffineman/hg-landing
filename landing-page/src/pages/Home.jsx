import santStanding from "../assets/images/santa_standing_on_sled.png";
import torrus from "../assets/images/Torus_array.png";
import styles from "./components.module.css";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import Card from "../components/Cards";
import { Gift } from "../models/Gift";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef(null);
  const cardRefs = useRef([]);
  const POV = window.innerWidth < 500 ? 100 : 75;

  useEffect(() => {
    const handleScroll = () => {
      if (cardsRef.current) {
        const { top } = cardsRef.current.getBoundingClientRect();
        // Check if the cards are in view
        if (top <= 0) {
          // Cards are scrolled out of view, revert to normal flow
          cardsRef.current.style.position = 'absolute';
          cardsRef.current.style.top = 'initial'; // You can adjust this as necessary
        } else {
          // Cards are in view, set to sticky
          cardsRef.current.style.position = 'sticky';
          cardsRef.current.style.top = '20%'; // Adjust to stick at the top of the viewport
        }
      }
    };

    // Set the cards to sticky on initial load
    if (cardsRef.current) {
      cardsRef.current.style.position = 'sticky';
      cardsRef.current.style.top = '0';
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useGSAP(() => {
    const cards = cardRefs.current;
    const totalScrollHeight = window.innerHeight * 3;
    const positions = [14, 38, 62, 86];
    const rotations = window.innerWidth > 800 ? [-15, -7.5, 7.5, 15] : [0, 0, 0, 0]
    
    // gsap.to(container.current.querySelector(".cards"), {
    //   scrollTrigger: {
    //     trigger: container.current,
    //     start: "top top", // Starts pinning as soon as the container top hits the viewport top
    //     end: () => `+=${totalScrollHeight}`, // Adjusts according to your scroll length
    //     onEnter: () => {
    //       const topOffset = container.current.getBoundingClientRect().top;
    //       gsap.set(".cards", { position: "fixed", top: topOffset }); // Pin at the exact top of the container
    //     },
    //     onLeave: () => {
    //       gsap.set(".cards", { position: "absolute", top: "100%" }); // Ensures it reverts at the right place
    //     },
    //     onEnterBack: () => {
    //       const topOffset = container.current.getBoundingClientRect().top;
    //       gsap.set(".cards", { position: "fixed", top: topOffset });
    //     },
    //     onLeaveBack: () => {
    //       gsap.set(".cards", { position: "absolute", top: "initial" });
    //     },
    //   },
    // });

    // pin cards section
    ScrollTrigger.create({
      trigger: container.current.querySelector(".cards"),
      start: "top top",
      end: () => `+=${totalScrollHeight}`,
      pin: false,
      pinSpacing: false,
      scroller: document.querySelector(".main-body"),
    });

    // spread cards
    cards.forEach((card, index) => {
      const params =
        window.innerWidth > 800
          ? {
              left: `${positions[index]}%`,
              rotation: `${rotations[index]}`,
              ease: "none",
              scrollTrigger: {
                trigger: container.current.querySelector(".cards"),
                start: "top top",
                end: () => `+=${window.innerHeight}`,
                scrub: 0.5,
                id: `spread-${index}`,
                scroller: document.querySelector(".main-body"),
              },
            }
          : {
              top: `${positions[index] * 2}%`,
              rotation: `${rotations[index]}`,
              ease: "power1.out",
              scrollTrigger: {
                trigger: container.current.querySelector(".cards"),
                start: "top top",
                end: () => `+=${window.innerHeight}`,
                scrub: 1,
                id: `spread-${index}`,
                scroller: document.querySelector(".main-body"),
              },
            };
      gsap.to(card, params);
    });
    // rotate cards
    cards.forEach((card, index) => {
      const frontEl = card.querySelector(".flip-card-front");
      const backEl = card.querySelector(".flip-card-back");

      const staggerOffset = index * 0.05;
      const startOffset = 1 / 3 + staggerOffset;
      const endOffset = 2 / 3 + staggerOffset;
      const totalDuration = endOffset - startOffset;

      // Pre-calculate rotation values to avoid recalculating them in `onUpdate`
      const timeline = gsap.timeline({ paused: true });

      timeline.to(frontEl, {
        rotateY: -180,
        ease: "power1.out",
        duration: totalDuration,
      });
      timeline.to(
        backEl,
        { rotateY: 0, ease: "power1.out", duration: totalDuration },
        0
      );
      timeline.to(
        card,
        {
          xPercent: -50,
          yPercent: -50,
          rotate: rotations[index],
          ease: "power1.out",
          duration: totalDuration,
        },
        0
      );

      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        scrub: window.innerWidth > 800 ? 2 : 2,
        id: `rotate-flip-${index}`,
        scroller: document.querySelector(".main-body"),
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= startOffset && progress <= endOffset) {
            const animationProgress = (progress - startOffset) / totalDuration;
            timeline.progress(animationProgress);
          }
        },
      });
    }),
      { scope: container };
  });





  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="main-body " ref={container}>
      <div className="h-[520vh]">
        <section className="relative h-max min-h-[100vh] flex flex-col gap-4 items-center">
          <div className=" pt-10 flex items-center justify-center">
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
            <Canvas
              style={{ height: "25rem" }}
              camera={{
                position: [0, 0, 0],
                fov: POV,
                near: 0.1,
                far: 1000,
              }}
            >
              <Gift />
            </Canvas>
          </div>
          <div className="flex flex-col items-center gap-10 z-50">
            <div className="w-[100%] max-w-[30rem] text-black text-center font-bold text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              neque justo. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.
            </div>
            <button className={`${styles.pushable}`}>
              <span className={`${styles.front}`}>Create Yours Today</span>
            </button>
          </div>
          <h2 className="text-4xl md:text-5xl w-full text-center tracking-tight mt-20 text-black font-semibold">
            How to create yours
          </h2>
        </section>
        <section className="cards">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              id={`card-${index + 1}`}
              frontSrc="/card-front.png"
              frontAlt="Card Image"
              backText={`How it works ${index + 1}`}
              ref={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
