import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = ({ modelUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        console.log('GLTF loaded successfully:', gltf);
        const model = gltf.scene;
        scene.add(model);

        model.position.set(0, 0, -5);
        model.scale.set(0.5, 0.5, 0.5);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
      }
    );

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = canvasRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [modelUrl]);

  return (
    <div className="three-container" ref={canvasRef} />
  );
};

export default ThreeScene;
