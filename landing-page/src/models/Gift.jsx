import { a } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";
import { useGLTF, OrthographicCamera } from "@react-three/drei";
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
  camera.position.set(0, 0, 3); // Adjust the position to view the model from a 3D angle
  camera.lookAt(0, 0, 0); // Focus on the center of the scene

  useFrame((_, delta) => {
    const dampingFactor = 0.1;
    const originalRotationX = 0; // Original rotation (adjust as needed)
    const originalRotationY = islandRef.current.rotation.y;
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.5 * delta; // Adjust rotation speed as needed
      if (hovered) {
        // Interpolate the target rotation based on mouse position
        const targetX = mousePos.y * 0.4; // Desired rotation based on mouse
        const targetY = islandRef.current.rotation.y + mousePos.x * 0.4; // Add to current rotation

        // Smoothly transition to the target rotation
        islandRef.current.rotation.x +=
          (targetX - islandRef.current.rotation.z) * dampingFactor;
        islandRef.current.rotation.y +=
          (targetY - islandRef.current.rotation.y) * dampingFactor;
      } else {
        // Smoothly return to original rotation after hover ends
        islandRef.current.rotation.x +=
          (originalRotationX - islandRef.current.rotation.x) * dampingFactor;
        islandRef.current.rotation.y +=
          (originalRotationY - islandRef.current.rotation.y) * dampingFactor;
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
      position={[0, -0.7, 0]} // Adjust the Y value to lower the model
    >
      <a.group scale={0.01}>
        <directionalLight
          intensity={1}
          decay={2}
          rotation={[-0.511, 0.767, 0.679]}
        />
        <a.group position={[-6.576, 85.206, 44.731]} scale={0.941}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Boolean_3.geometry}
            material={nodes.Boolean_3.material}
            position={[-0.129, -26.3, -2.989]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Boolean_2.geometry}
            material={nodes.Boolean_2.material}
            position={[-0.846, -16.584, -0.994]}
          />
          <a.group position={[-26.697, 63.679, 0.011]}>
            <a.group position={[-2.693, 4.65, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rectangle.geometry}
                material={nodes.Rectangle.material}
                position={[5.179, -17.752, 0]}
                rotation={[-Math.PI, 0, 2.558]}
                scale={[1, 0.161, 1]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rectangle_1.geometry}
                material={nodes.Rectangle_1.material}
                position={[3.407, -18.922, 0]}
                rotation={[-Math.PI / 2, 0.987, Math.PI / 2]}
                scale={[1, 0.161, 1]}
              />
              <a.group
                position={[-0.682, 3.478, 4.119]}
                rotation={[0, 0, 0.693]}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Sphere.geometry}
                  material={nodes.Sphere.material}
                  position={[-1.16, -9.236, -1.554]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape_8.geometry}
                  material={nodes.Shape_8.material}
                  position={[-2.83, -12.196, 1.45]}
                  rotation={[0.695, 1.177, -1.18]}
                  scale={[0.386, 0.43, 0.43]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape_6.geometry}
                  material={nodes.Shape_6.material}
                  position={[2.495, -11.813, 4.112]}
                  rotation={[2.925, 0.099, 3.013]}
                  scale={[0.514, 0.574, 0.574]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape_5.geometry}
                  material={nodes.Shape_5.material}
                  position={[-4.739, -13.719, -2.625]}
                  rotation={[0.229, 0.594, -0.257]}
                  scale={[0.712, 0.794, 0.794]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape_4.geometry}
                  material={nodes.Shape_4.material}
                  position={[4.432, -11.904, -7.862]}
                  rotation={[1.687, -1.3, 1.452]}
                  scale={[0.712, 0.794, 0.794]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape_3.geometry}
                  material={nodes.Shape_3.material}
                  position={[10.824, -11.411, -0.501]}
                  rotation={[2.614, -0.478, 2.928]}
                  scale={[1.099, 1, 1]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape_2.geometry}
                  material={nodes.Shape_2.material}
                  position={[2.592, -14.29, 6.598]}
                  rotation={[2.848, 0.851, -2.918]}
                  scale={[1.173, 1, 1]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape_7.geometry}
                  material={nodes.Shape_7.material}
                  position={[-1.739, -13.575, -14.616]}
                  rotation={[0.308, -0.718, 0.311]}
                  scale={[0.803, 1, 1]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Shape.geometry}
                  material={nodes.Shape.material}
                  position={[-9.482, -16.45, -9.753]}
                  rotation={[-0.146, 0.188, 0]}
                />
              </a.group>
            </a.group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_2.geometry}
              material={nodes.Cube_2.material}
              position={[6.247, -15.289, -0.011]}
              rotation={[0, 0, 0.585]}
              scale={1.056}
            />
          </a.group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Boolean.geometry}
            material={nodes.Boolean.material}
            position={[0, -19.164, 0]}
          />
        </a.group>
        <OrthographicCamera
          makeDefault={false}
          far={100000}
          near={0}
          position={[351.846, 766.197, 709.558]}
          rotation={[-0.799, 0.351, 0.339]}
        />
      </a.group>
    </a.group>
  );
}
