import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = ({ modelUrl, onClose }) => {
    const canvasRef = useRef(null);
    const modelRef = useRef(null);
    const mixerRef = useRef(null);

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
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);

        // Load initial 3D model
        const loader = new GLTFLoader();
        loader.load(
            modelUrl,
            (gltf) => {
                console.log('GLTF loaded successfully:', gltf);
                const model = gltf.scene;
                model.scale.set(0.5, 0.5, 0.5);
                model.rotation.set(0, 190, 0);
                modelRef.current = model;
                scene.add(model);

                // Initialize animation mixer
                mixerRef.current = new THREE.AnimationMixer(model);
                const clips = gltf.animations;

                // Check if there are animations
                if (clips && clips.length) {
                    clips.forEach((clip) => {
                        const action = mixerRef.current.clipAction(clip);
                        action.play();
                    });
                }

                // Event listener for model click
                model.addEventListener('click', () => {
                    // Remove current model
                    scene.remove(modelRef.current);

                    // Load and add new model
                    loader.load(
                        '/models/orb.glb', // Path to the new model
                        (newGltf) => {
                            const newModel = newGltf.scene;
                            newModel.scale.set(0.5, 0.5, 0.5);
                            newModel.rotation.set(0, 190, 0);
                            modelRef.current = newModel;
                            scene.add(newModel);
                        },
                        undefined,
                        (error) => {
                            console.error('An error occurred while loading the new GLTF model:', error);
                        }
                    );
                });
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the GLTF model:', error);
            }
        );

        camera.position.set(0, 0, 1);

        const animate = function () {
            requestAnimationFrame(animate);

            // Update controls
            controls.update();

            // Update animation mixer
            if (mixerRef.current) {
                mixerRef.current.update(0.01);
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

    return (
        <div className="three-container" ref={canvasRef} />
    );
};

export default ThreeScene;
