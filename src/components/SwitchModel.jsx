import { useGLTF } from "@react-three/drei";
import { useMemo, useEffect } from "react";
import * as THREE from "three";

function SwitchModel() {
  const { scene } = useGLTF("/models/switch.glb");

  const { scale, position } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const scaleValue = 4 / maxSize;

    return {
      scale: scaleValue,
      position: [
        -center.x * scaleValue,
        -center.y * scaleValue,
        -center.z * scaleValue,
      ],
    };
  }, [scene]);

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  const handleModelClick = (event) => {
    event.stopPropagation();

    if (event.object) {
      console.log("========== BAGIAN SWITCH ==========");
      console.log("Nama Mesh:", event.object.name);
      console.log("Posisi:", event.object.position);
      console.log("Object:", event.object);
      console.log("===================================");
    }
  };

  return (
    <group
      scale={scale}
      position={position}
      onClick={handleModelClick}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/switch.glb");

export default SwitchModel;