import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function ServerModel() {
  const { scene } = useGLTF("/models/server-rack.glb");

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
      scale={0.03}
      position={[0, -1.5, 0]}
    />
  );
}

useGLTF.preload("/models/server-rack.glb");

export default ServerModel;