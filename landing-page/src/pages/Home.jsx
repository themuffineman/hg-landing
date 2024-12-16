import santStanding from "../assets/images/santa_standing_on_sled.png";
import torrus from "../assets/images/Torus_array.png";
import styles from "./components.module.css";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import Card from "../components/Cards";
import { Gift } from "../models/Gift";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { copy } from "../../websiteCopy/copy";
import { images } from "../../cardImages/cardImages";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const container = useRef(null);
  const CardContainer = useRef(null);
  const cardRefs = useRef([]);
  const POV = window.innerWidth < 500 ? 100 : 75;

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  });
  function addScrollRotationListener() {
    const elements = document.querySelectorAll(".card-mobile");
    const scrollContainer = document.querySelector(".main-body");

    let lastScrollPosition = scrollContainer.scrollTop; // Track the last scroll position

    const rotateElement = () => {
      const currentScrollPosition = scrollContainer.scrollTop; // Current scroll position
      const isScrollingDown = currentScrollPosition > lastScrollPosition;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();

        // Trigger rotation when the element is 50px from the top of the viewport
        const triggerPoint = 250 + index * 50;
        const maxRotation = 180;

        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          // Calculate the progress from the trigger point to when the element fully exits the viewport
          const scrollProgress = Math.min(
            1,
            Math.max(0, (triggerPoint - rect.top) / rect.height)
          );
          const rotationChange = scrollProgress * maxRotation;

          // Get current rotation value
          const currentRotation =
            parseFloat(
              element.style.transform.replace(/rotateY\((.*)deg\)/, "$1")
            ) || 0;

          // Adjust rotation based on scroll direction
          const newRotation = isScrollingDown
            ? Math.min(maxRotation, currentRotation + rotationChange)
            : Math.max(0, currentRotation - rotationChange);

          element.style.transform = `rotateY(${newRotation}deg)`;
        } else if (rect.top > triggerPoint) {
          // Reset rotation if the element is not yet at the trigger point
          element.style.transform = "rotateY(0deg)";
        }
      });

      lastScrollPosition = currentScrollPosition; // Update the last scroll position
    };

    scrollContainer.addEventListener("scroll", rotateElement);
  }

  useEffect(() => {
    addScrollRotationListener();
  }, []);

  useGSAP(() => {
    const cards = cardRefs.current;
    const isMobile = window.innerWidth <= 800;
    const totalScrollHeight = isMobile ? innerHeight * 2 : innerHeight * 3;
    const positions =
      window.innerWidth > 800 ? [14, 38, 62, 86] : [38, 86, 134, 182];
    const rotations =
      window.innerWidth > 800 ? [-15, -7.5, 7.5, 15] : [0, 0, 0, 0];

    if (!isMobile) {
      ScrollTrigger.create({
        trigger: container.current.querySelector(".cards"),
        start: "top top",
        end: () =>
          `+=${isMobile ? totalScrollHeight * 0.4 : totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
        scroller: document.querySelector(".main-body"),
      });
      cards.forEach((card, index) => {
        const params = {
          left: `${positions[index]}%`,
          rotation: `${rotations[index]}`,
          ease: "power1.out",
          scrollTrigger: {
            trigger: container.current.querySelector(".cards"),
            start: "top top",
            end: () => `+=${innerHeight}`,
            scrub: 0.5,
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
        const totalDuration = isMobile
          ? (endOffset - startOffset) * 0.5
          : endOffset - startOffset;

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
              const animationProgress =
                (progress - startOffset) / totalDuration;
              timeline.progress(animationProgress);
            }
          },
        });
      }),
        { scope: container };
    }
  });

  return (
    <div
      className="main-body overflow-x-hidden flex flex-col justify-between "
      ref={container}
    >
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
                className={`h-[80px] torrus aspect-auto fixed bottom-[10%] ${styles.float}`}
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
          `
          <div className="flex flex-col items-center gap-10 z-50">
            <div className="w-[100%] max-w-[30rem] text-black text-center font-bold text-xl">
              {copy.heroDescription}
            </div>
            <button className={`${styles.pushable}`}>
              <span className={`${styles.front}`}>
                <a target="_blank" href="https://app.hideousgifts.com">
                  Create Yours Today
                </a>
              </span>
            </button>
          </div>
          <h2 className="text-4xl md:text-5xl w-full text-center tracking-tight mt-20 text-black font-semibold">
            How to create yours
          </h2>
        </section>
        <section ref={CardContainer} className="cards hidden md:block">
          {[...Array(4)].map((_, index) => {
            const cardKey = `step${index + 1}`;
            return (
              <Card
                key={index}
                id={`card-${index + 1}`}
                frontSrc="/card-front.png"
                frontAlt="Card Image"
                backText={copy.howItWorks[cardKey]}
                ref={(el) => (cardRefs.current[index] = el)}
                imgUrl={images[index]}
              />
            );
          })}
        </section>
        <section className="md:hidden mt-10 ">
          {[...Array(4)].map((_, index) => {
            const cardKey = `step${index + 1}`;
            return (
              <div key={cardKey} className="card-container">
                <div className="card-mobile" id={`card-${index + 1}`}>
                  <div className="back-mobile"></div>
                  <div className="front-mobile">
                    <h2>Step {index + 1}</h2>
                    <img
                      className="w-[200px] aspect-auto rounded-md"
                      src={images[index]}
                    />
                    <p>{copy.howItWorks[cardKey]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <footer className=" p-5 justify-self-end bg-purple-950  w-full">
          <h3
            style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
            className="text-4xl text-yellow-400 "
          >
            <span className="text-white">Hideous</span> Gifts
          </h3>
          <div className="links-section flex gap-10 items-center">
            <div className="flex flex-col items-start gap-2">
              <div className="text-white text-base font-medium">Socials</div>
              <div>
                <ul>
                  <li className=" hover:underline text-sm text-white">
                    <a href="https://Instagram.com" tabIndex={"_blank"}>
                      Instagram
                    </a>
                  </li>
                  <li className=" hover:underline text-sm text-white">
                    <a href="https://Facebook.com" tabIndex={"_blank"}>
                      Facebook
                    </a>
                  </li>
                  <li className=" hover:underline text-sm text-white">
                    <a href="https://TikTok.com" tabIndex={"_blank"}>
                      TikTok
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="text-white text-base font-medium">More Info</div>
              <div>
                <ul>
                  <li className=" hover:underline text-sm text-white">
                    <a href="https://Instagram.com" tabIndex={"_blank"}>
                      About Us
                    </a>
                  </li>
                  <li className=" hover:underline text-sm text-white">
                    <a href="https://Facebook.com" tabIndex={"_blank"}>
                      Terms of service
                    </a>
                  </li>
                  <li className=" hover:underline text-sm text-white">
                    <a href="https://TikTok.com" tabIndex={"_blank"}>
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
