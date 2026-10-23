import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function ModemModel() {
  const { scene } = useGLTF("/models/modem.glb");

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
      scale={1.5}
      position={[0, 0, 0]}
    />
  );
}

useGLTF.preload("/models/modem.glb");

export default ModemModel;