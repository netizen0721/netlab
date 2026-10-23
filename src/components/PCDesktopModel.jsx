import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function PCDesktopModel() {
  const { scene } = useGLTF("/models/pc-desktop.glb");

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
      scale={0.7}
      position={[0, -1, 0]}
    />
  );
}

useGLTF.preload("/models/pc-desktop.glb");

export default PCDesktopModel;