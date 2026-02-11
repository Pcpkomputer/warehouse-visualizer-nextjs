'use client'

import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ForkliftProps {
    path: [number, number, number][];
    speed?: number;
    color?: string;
}

export default function Forklift({
    path,
    speed = 2,
    color = '#facc15'
}: ForkliftProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [currentPointIndex, setCurrentPointIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const segments = useMemo(() => {
        const result = [];
        for (let i = 0; i < path.length - 1; i++) {
            const start = new THREE.Vector3(...path[i]);
            const end = new THREE.Vector3(...path[i + 1]);
            const distance = start.distanceTo(end);
            result.push({ start, end, distance });
        }
        return result;
    }, [path]);

    useFrame((state, delta) => {
        if (!groupRef.current || segments.length === 0) return;

        const segment = segments[currentPointIndex];
        const step = (speed * delta) / segment.distance;

        let newProgress = progress + step;

        if (newProgress >= 1) {
            newProgress = 0;
            setCurrentPointIndex((prev) => (prev + 1) % segments.length);
        }

        setProgress(newProgress);

        const currentPos = new THREE.Vector3().lerpVectors(
            segment.start,
            segment.end,
            newProgress
        );

        groupRef.current.position.copy(currentPos);

        const direction = new THREE.Vector3().subVectors(segment.end, segment.start).normalize();
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1), // Default forward for our model
            direction
        );
        groupRef.current.quaternion.slerp(targetQuaternion, 0.1);
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.8, 0.6, 1.2]} />
                <meshToonMaterial color={color} />
            </mesh>

            <mesh position={[0, 1.0, -0.2]}>
                <boxGeometry args={[0.7, 0.6, 0.5]} />
                <meshToonMaterial color="#333" transparent opacity={0.7} />
            </mesh>

            <mesh position={[0, 0.8, 0.6]}>
                <boxGeometry args={[0.6, 1.5, 0.1]} />
                <meshToonMaterial color="#444" />
            </mesh>

            <group position={[0, 0.1, 0.7]}>
                <mesh position={[-0.2, 0, 0.3]}>
                    <boxGeometry args={[0.15, 0.05, 0.8]} />
                    <meshToonMaterial color="#888" />
                </mesh>
                <mesh position={[0.2, 0, 0.3]}>
                    <boxGeometry args={[0.15, 0.05, 0.8]} />
                    <meshToonMaterial color="#888" />
                </mesh>
            </group>

            {[
                [-0.4, 0.15, 0.4],
                [0.4, 0.15, 0.4],
                [-0.4, 0.15, -0.4],
                [0.4, 0.15, -0.4],
            ].map((pos, idx) => (
                <mesh key={idx} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.1, 12]} />
                    <meshToonMaterial color="#111" />
                </mesh>
            ))}
        </group>
    );
}
