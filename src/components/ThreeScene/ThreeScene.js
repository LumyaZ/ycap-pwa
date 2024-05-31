import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const ThreeScene = () => {
  const { scene } = useGLTF('../../assets/portail/portal_1.gltf');

  return (
    <Canvas style={{ height: '100vh', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <primitive object={scene} scale={[4, 4, 4]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeScene;
