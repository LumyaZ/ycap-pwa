import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = ({ modelUrl, spawnModelUrl }) => {
    const canvasRef = useRef(null);
    const modelRef = useRef(null);
    const mixerRef = useRef(null);
    const spawnRef = useRef(null);
    const [spawned, setSpawned] = useState(false);

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

        // Load main 3D model
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

                camera.position.set(0, 0, 10);

                // Automatically replace after 5 seconds
                setTimeout(() => {
                    if (!spawned) {

                        // Load and add spawned model
                        loader.load(
                            spawnModelUrl,
                            (spawnedGltf) => {
                                const spawnModel = spawnedGltf.scene;
                                spawnModel.scale.set(0.5, 0.5, 0.5);
                                spawnRef.current = spawnModel;
                                scene.add(spawnModel);
                                camera.position.set(0, 0, 1);

                                // Set spawned state to true
                                setSpawned(true);
                                // Remove main model
                                scene.remove(modelRef.current);
                            },
                            undefined,
                            (error) => {
                                console.error('An error occurred while loading the spawn GLTF model:', error);
                            }
                        );
                    }
                }, 3000);
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

            // Grow the scale of the main model over time
            if (modelRef.current && !spawned) {
                modelRef.current.scale.x += 0.01;
                modelRef.current.scale.y += 0.01;
                modelRef.current.scale.z += 0.01;
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
    }, [modelUrl, spawnModelUrl, spawned]);

    return (
        <div className="three-container" ref={canvasRef} />
    );
};

export default ThreeScene;
