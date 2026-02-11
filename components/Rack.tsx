'use client'

import { useRef } from 'react';
import * as THREE from 'three';

interface RackProps {
    position?: [number, number, number];
    shelves?: number;
    width?: number;
    height?: number;
    depth?: number;
    color?: string;
    metalColor?: string;
    showLabels?: boolean;
    rackId?: string;
}

export default function Rack({
    position = [0, 0, 0],
    shelves = 4,
    width = 2,
    height = 3,
    depth = 1,
    color = '#CDD6E3',
    metalColor = '#5A6480',
    showLabels = false,
    rackId = 'R-001'
}: RackProps) {
    const groupRef = useRef<THREE.Group>(null);

    const poleRadius = 0.04;
    const shelfThickness = 0.1;
    const shelfSpacing = height / shelves;

    const poles = [
        [-width / 2, height / 2, -depth / 2],
        [width / 2, height / 2, -depth / 2],
        [-width / 2, height / 2, depth / 2],
        [width / 2, height / 2, depth / 2],
    ];

    const shelfPositions = Array.from({ length: shelves + 1 }, (_, i) => ({
        y: i * shelfSpacing,
    }));

    return (
        <group ref={groupRef} position={position}>
            {poles.map((polePos, index) => (
                <mesh key={`pole-${index}`} position={polePos as [number, number, number]}>
                    <boxGeometry args={[poleRadius * 2, height, poleRadius * 2]} />
                    <meshToonMaterial
                        color={metalColor}
                    />
                </mesh>
            ))}

            {shelfPositions.map((shelf, index) => (
                <group key={`shelf-${index}`} position={[0, shelf.y, 0]}>
                    <mesh position={[0, shelfThickness / 2, 0]}>
                        <boxGeometry args={[width + 0.1, shelfThickness, depth + 0.1]} />
                        <meshToonMaterial
                            color={color}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
