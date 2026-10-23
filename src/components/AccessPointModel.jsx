import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function AccessPointModel() {
  const { scene } = useGLTF("/models/access-point.glb");

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
      scale={2}
      position={[0, -4, 0]}
    />
  );
}

useGLTF.preload("/models/access-point.glb");

export default AccessPointModel;