import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function LaptopModel() {
  const { scene } = useGLTF("/models/laptop.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={6}
      position={[0, -6, 0]}
    />
  );
}

useGLTF.preload("/models/laptop.glb");

export default LaptopModel;