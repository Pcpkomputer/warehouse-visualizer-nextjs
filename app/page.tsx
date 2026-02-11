'use client'

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { WarehouseData } from '@/types/warehouse';

export default function Home() {

  const [data, setData] = useState<WarehouseData>({
    "racks": [
      {
        "name": "Rack A-1",
        "coordinate": [
          -5,
          0,
          -5
        ],
        "items": [
          {
            "serialNo": "ITEM-1001",
            "lot": "LOT-2023-A01",
            "description": "High Performance Brake Pads",
            "condition": "Good",
            "color": "#22c55e",
            "position": {
              "x": 1,
              "y": 1
            }
          },
          {
            "serialNo": "ITEM-1002",
            "lot": "LOT-2023-B05",
            "description": "Oil Filter Type A",
            "condition": "Damage",
            "color": "#ef4444",
            "position": {
              "x": 2,
              "y": 2
            }
          },
          {
            "serialNo": "ITEM-1003",
            "lot": "LOT-2023-C12",
            "description": "Spark Plug Set",
            "condition": "Good",
            "color": "#22c55e",
            "position": {
              "x": 0,
              "y": 2
            }
          }
        ]
      },
      {
        "name": "Rack A-2",
        "coordinate": [
          -1.5,
          0,
          -5
        ],
        "items": [
          {
            "serialNo": "ITEM-2001",
            "lot": "LOT-2023-D09",
            "description": "Air Filter",
            "condition": "Quarantine",
            "color": "#eab308",
            "position": {
              "x": 1,
              "y": 1
            }
          }
        ]
      },
      {
        "name": "Rack A-3",
        "coordinate": [
          2,
          0,
          -5
        ],
        "items": []
      },
      {
        "name": "Rack B-1",
        "coordinate": [
          -5,
          0,
          -1
        ],
        "items": [
          {
            "serialNo": "ITEM-3001",
            "lot": "LOT-2023-E22",
            "description": "Headlight Assembly",
            "condition": "Good",
            "color": "#22c55e",
            "position": {
              "x": 1,
              "y": 3
            }
          },
          {
            "serialNo": "ITEM-3002",
            "lot": "LOT-2023-F33",
            "description": "Rear Bumper",
            "condition": "Scrap",
            "color": "#000000",
            "position": {
              "x": 2,
              "y": 2
            }
          }
        ]
      },
      {
        "name": "Rack B-2",
        "coordinate": [
          -1.5,
          0,
          -1
        ],
        "items": []
      },
      {
        "name": "Rack B-3",
        "coordinate": [
          2,
          0,
          -1
        ],
        "items": []
      },
      {
        "name": "Rack C-1",
        "coordinate": [
          -5,
          0,
          2
        ],
        "items": [
          {
            "serialNo": "ITEM-4001",
            "lot": "LOT-2023-G45",
            "description": "Timing Belt",
            "condition": "Good",
            "color": "#22c55e",
            "position": {
              "x": 1,
              "y": 2
            }
          }
        ]
      },
      {
        "name": "Rack C-2",
        "coordinate": [
          -1.5,
          0,
          2
        ],
        "items": []
      }
    ],
    "zones": [
      {
        "type": "loading_zone",
        "name": "Loading",
        "coordinate": [
          12,
          0.02,
          0
        ],
        "dimensions": [
          6,
          8
        ],
        "color": "#fbbf24"
      }
    ],
    "routes": [
      {
        "type": "forklift",
        "name": "Main Forklift Route",
        "path": [
          [
            -8,
            0,
            6
          ],
          [
            -8,
            0,
            -8
          ],
          [
            8,
            0,
            -8
          ],
          [
            8,
            0,
            4
          ],
          [
            12,
            0,
            4
          ]
        ],
        "color": "#facc15"
      }
    ]
  })

  return (
    <>
      <Canvas
        style={{ width: '100%', height: '100vh', backgroundColor: "white" }}
        camera={{ position: [8, 6, 8], fov: 50, zoom: 0.8 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <pointLight position={[-10, 10, -5]} intensity={0.3} />
        <hemisphereLight args={['#ffffff', '#444444', 0.6]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="white" roughness={0.8} />
        </mesh>
        <gridHelper args={[40, 40, '#white', 'white']} />
        <OrbitControls
          enableDamping
          enablePan
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    
    </>
  );
}