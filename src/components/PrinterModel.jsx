import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

function PrinterModel() {
  const { scene } = useGLTF("/models/printer.glb");

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
      scale={1}
      position={[0, -1, 0]}
    />
  );
}

useGLTF.preload("/models/printer.glb");

export default PrinterModel;