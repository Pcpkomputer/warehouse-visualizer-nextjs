'use client'

import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface ZoneProps {
    type?: string;
    name?: string;
    position?: [number, number, number];
    dimensions?: [number, number];
    color?: string;
    opacity?: number;
}

export default function Zone({
    type = 'zone',
    name = 'Zone',
    position = [0, 0.02, 0],
    dimensions = [4, 4],
    color = '#fbbf24',
    opacity = 0.3
}: ZoneProps) {
    const [width, depth] = dimensions;

    return (
        <group position={position}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[width, depth]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <lineSegments>
                <edgesGeometry
                    args={[
                        new THREE.PlaneGeometry(width, depth)
                    ]}
                />
                <lineBasicMaterial color={color} linewidth={2} />
            </lineSegments>

            <Text
                position={[0, 0.1, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.5}
                color={color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#ffffff"
            >
                {name}
            </Text>

            {[
                [-width / 2, 0, -depth / 2],
                [width / 2, 0, -depth / 2],
                [-width / 2, 0, depth / 2],
                [width / 2, 0, depth / 2],
            ].map((cornerPos, idx) => (
                <mesh key={`corner-${idx}`} position={cornerPos as [number, number, number]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            ))}
        </group>
    );
}
