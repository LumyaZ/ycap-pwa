import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = ({ modelUrl }) => {
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1); // Adjust position as needed
    scene.add(directionalLight);

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        console.log('GLTF loaded successfully:', gltf);
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
        modelRef.current = model;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
      }
    );

    // Set initial camera position
    camera.position.set(0, 0, 10); // Adjust camera position as needed
    cameraRef.current = camera;

    const animate = function () {
      requestAnimationFrame(animate);

      // Update controls
      controls.update();

      // Rotate the model
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Example rotation speed, adjust as needed
      }

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

    canvasRef.current.appendChild(renderer.domElement);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [modelUrl]);

  return <div className="three-container" ref={canvasRef} />;
};

export default ThreeScene;
