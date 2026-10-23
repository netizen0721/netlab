import { useGLTF } from "@react-three/drei";
import { useMemo, useEffect } from "react";
import * as THREE from "three";

function RouterModel() {
  const { scene } = useGLTF("/models/router_with_antennas.glb");

  const { scale, position } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const scaleValue = 3.5 / maxSize;

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

  return (
    <group
      scale={scale}
      position={position}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/router_with_antennas.glb");

export default RouterModel;