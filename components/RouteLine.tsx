'use client'

import * as THREE from 'three';

interface RouteLineProps {
    path: [number, number, number][];
    color?: string;
    width?: number;
}

export default function RouteLine({
    path,
    color = '#facc15',
    width = 0.4
}: RouteLineProps) {
    const points = path.map(p => new THREE.Vector3(...p));

    return (
        <group>
            {path.map((point, idx) => {
                if (idx === path.length - 1) return null;
                const start = new THREE.Vector3(...point);
                const end = new THREE.Vector3(...path[idx + 1]);
                const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
                const distance = start.distanceTo(end);
                const direction = new THREE.Vector3().subVectors(end, start).normalize();

                center.y += 0.01;

                return (
                    <mesh
                        key={idx}
                        position={center}
                        rotation={[-Math.PI / 2, 0, Math.atan2(direction.x, direction.z)]}
                    >
                        <planeGeometry args={[width, distance]} />
                        <meshStandardMaterial
                            color={color}
                            transparent
                            opacity={0.3}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                );
            })}
            {path.map((point, idx) => {
                if (idx === path.length - 1) return null;

                const start = new THREE.Vector3(...point);
                const end = new THREE.Vector3(...path[idx + 1]);
                const distance = start.distanceTo(end);
                const direction = new THREE.Vector3().subVectors(end, start).normalize();

                return (
                    <mesh
                        key={`dash-${idx}`}
                        position={[
                            (start.x + end.x) / 2,
                            0.015,
                            (start.z + end.z) / 2
                        ]}
                        rotation={[-Math.PI / 2, 0, Math.atan2(direction.x, direction.z)]}
                    >
                        <planeGeometry args={[0.05, distance]} />
                        <meshStandardMaterial
                            color={color}
                            opacity={0.8}
                            transparent
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
