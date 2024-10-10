import { a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import islandScene from "../assets/3d/giftbox.glb";

export function Gift() {
  const islandRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  const { nodes, materials } = useGLTF(islandScene);

  useEffect(() => {
    const scrollContainer = document.querySelector(".main-body"); // Use query selector to find the element
    if (!scrollContainer) {
      return;
    }
    const handleScroll = () => {
      setScrollY(scrollContainer.scrollTop); // Get the current scroll position of the element
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((_, delta) => {
    const dampingFactor = 0.1;
    const originalRotationX = 0;
    const originalRotationY = islandRef.current?.rotation?.y || 0;

    if (islandRef.current) {
      islandRef.current.rotation.x = Math.min(Math.PI * 2, scrollY * 0.009); // Limit rotation to 180 degrees

      islandRef.current.rotation.y += 0.5 * delta;
      if (hovered) {
        const targetX = mousePos.y * 0.4;
        const targetY = islandRef.current.rotation.y + mousePos.x * 0.4;

        islandRef.current.rotation.x +=
          (targetX - islandRef.current.rotation.x) * dampingFactor;
        islandRef.current.rotation.y +=
          (targetY - islandRef.current.rotation.y) * dampingFactor;
      } else {
        islandRef.current.rotation.x +=
          (originalRotationX - islandRef.current.rotation.x) * dampingFactor;
        islandRef.current.rotation.y +=
          (originalRotationY - islandRef.current.rotation.y) * dampingFactor;
      }
    }
  });

  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(9, 5, 3); // Set camera to an isometric angle
    camera.lookAt(0, 0, 0); // Make sure the camera focuses on the center of the model
  }, [camera]); // This will update the camera position once on mount

  return (
    <>
      {/* Add basic lighting */}
      <ambientLight intensity={3.5} />
      <directionalLight position={[10, 10, 10]} />

      <a.group
        ref={islandRef}
        onPointerMove={handleMouseMove}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        position={[0, 0, 0]} // Center the model
        scale={[4, 4, 4]}
      >
        <a.group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.Mat1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            material={materials.Mat2}
          />
        </a.group>
      </a.group>
    </>
  );
}
