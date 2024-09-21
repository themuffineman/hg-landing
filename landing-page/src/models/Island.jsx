import { a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/gift_box.glb";

export function Island() {
  const islandRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    // Get normalized mouse position (-1 to 1)
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  const handlePointerOver = () => {
    setHovered(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const { nodes, materials } = useGLTF(islandScene);
  const { camera } = useThree();
  camera.position.set(0, 2, 4); // Adjust the position to view the model from a 3D angle
  camera.lookAt(0, 0, 0); // Focus on the center of the scene

  useFrame((_, delta) => {
    const dampingFactor = 0.1;
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.5 * delta; // Adjust rotation speed as needed
      if (hovered) {
        // Interpolate the target rotation based on mouse position
        const targetX = mousePos.y * 0.2; // Desired rotation based on mouse
        const targetY = islandRef.current.rotation.y + mousePos.x * 0.2; // Add to current rotation

        // Smoothly transition to the target rotation
        islandRef.current.rotation.x +=
          (targetX - islandRef.current.rotation.x) * dampingFactor;
        islandRef.current.rotation.y +=
          (targetY - islandRef.current.rotation.y) * dampingFactor;
      }
    }
  });
  return (
    // {Island 3D model from: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907}
    <a.group
      ref={islandRef}
      onPointerMove={handleMouseMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      position={[0, -1.4, 0]} // Adjust the Y value to lower the model
    >
      <a.group rotation={[-Math.PI / 2, 0, -0.01]} scale={0.7}>
        <a.group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Pink01}
            position={[0.001, 1.058, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.Pink02}
            position={[0.001, 1.307, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={1.026}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.Pink02}
            position={[0.009, 2.189, 0]}
            rotation={[0, -Math.PI / 4, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.Pink03}
            position={[0.009, 2.189, 0]}
            rotation={[-0.051, 0, 0]}
            scale={[0.183, 0.403, 0.363]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials.Pink01}
            position={[0.009, 2.189, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_14.geometry}
            material={materials.Yellow01}
            position={[0.003, 2.377, 0.007]}
            scale={0.168}
          />
        </a.group>
      </a.group>
    </a.group>
  );
}
