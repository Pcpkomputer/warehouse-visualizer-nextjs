'use client'

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { WarehouseData, Item, RackData } from '@/types/warehouse';
import Rack from '@/components/Rack';

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

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

   const racks = useMemo<RackData[]>(() => {
    return data.racks || [];
  }, [data]);

  const boxSize = 1;
  const halfBoxSize = boxSize / 2;

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
        
        {
          racks.map((rack, rackIdx: number) => {

            const maxPositionX: number[] = [];
            const maxPositionY: number[] = [];

            rack.items.forEach((item) => {
              maxPositionY.push(item.position.y);
              maxPositionX.push(item.position.x);
            });

            //const maxX = rack.items.length > 0 ? Math.max(...maxPositionX) : 2;
            let maxY = rack.items.length > 0 ? Math.max(...maxPositionY) : 2;

            if (maxY < 2) {
              maxY = 2;
            }

            const rackHeight = maxY * 2;
            const shelfSpacing = rackHeight / maxY;

            return (
              <group key={rackIdx}>
                <Rack position={rack.coordinate} shelves={maxY} width={3} height={rackHeight} depth={1} />
                <Text
                  position={[rack.coordinate[0], rack.coordinate[1] + rackHeight + 1.5, rack.coordinate[2]]}
                  fontSize={0.3}
                  color="#1f2937"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.02}
                  outlineColor="#ffffff"
                >
                  {rack.name}
                </Text>
                {
                  rack.items.map((item: any, itemIdx: number) => {

                    const x = item.position.x;
                    const y = item.position.y;

                    // Calculate position: align items with rack shelves
                    const itemX = rack.coordinate[0] - 1 + x;
                    const itemY = rack.coordinate[1] + (y * shelfSpacing) + halfBoxSize;
                    const itemZ = rack.coordinate[2];

                    return (
                      <group key={`${rackIdx}-item-${itemIdx}`}>
                        {selectedConditions.includes(item.condition) && (
                          <mesh
                            position={[itemX, itemY, itemZ]}
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setSelectedItem(item);
                            }}
                            onPointerOver={() => (document.body.style.cursor = 'pointer')}
                            onPointerOut={() => (document.body.style.cursor = 'auto')}
                          >
                            <boxGeometry args={[boxSize, boxSize, boxSize]} />
                            <meshStandardMaterial
                              color={item?.color}
                              emissive={selectedItem?.serialNo === item.serialNo ? item.color : 'black'}
                              emissiveIntensity={selectedItem?.serialNo === item.serialNo ? 0.5 : 0}
                            />
                            <Text fontSize={0.1} position={[0, 0.1, 0.52]}>
                              {item?.condition}
                            </Text>
                            {/* Selection indicator */}
                            {selectedItem?.serialNo === item.serialNo && (
                              <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[boxSize * 1.05, boxSize * 1.05, boxSize * 1.05]} />
                                <meshBasicMaterial color="white" wireframe transparent opacity={0.3} />
                              </mesh>
                            )}
                            {
                              selectedItem?.serialNo === item.serialNo && (
                                <Html center zIndexRange={[100, 0]}>
                                  <div
                                    style={{
                                      transform: 'translate(160px, -50%)',
                                      width: '300px',
                                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                      backdropFilter: 'blur(10px)',
                                      padding: '24px',
                                      borderRadius: '16px',
                                      boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                                      border: `2px solid ${item.color}`,
                                      fontFamily: 'inherit',
                                      zIndex: 1000,
                                      position: 'relative',
                                      pointerEvents: 'auto'
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                                      <h3 style={{ margin: 0, color: '#111827', fontSize: '18px', fontWeight: 600 }}>Item Details</h3>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedItem(null);
                                        }}
                                        style={{
                                          border: 'none',
                                          background: '#f3f4f6',
                                          width: '28px',
                                          height: '28px',
                                          borderRadius: '50%',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          fontSize: '18px',
                                          cursor: 'pointer',
                                          color: '#6b7280',
                                          transition: 'all 0.2s'
                                        }}
                                      >
                                        ×
                                      </button>
                                    </div>

                                    <div style={{ fontSize: '14px', lineHeight: '1.8', color: '#374151' }}>
                                      <p style={{ margin: '8px 0' }}><strong style={{ color: '#6b7280' }}>Serial No:</strong> <span style={{ float: 'right', color: '#111827' }}>{item.serialNo}</span></p>
                                      <p style={{ margin: '8px 0' }}><strong style={{ color: '#6b7280' }}>Lot:</strong> <span style={{ float: 'right', color: '#111827' }}>{item.lot}</span></p>
                                      <div style={{ margin: '12px 0', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                                        <strong style={{ display: 'block', marginBottom: '4px', color: '#6b7280' }}>Description:</strong>
                                        <p style={{ margin: 0, color: '#111827' }}>{item.description}</p>
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                                        <strong style={{ color: '#6b7280', marginRight: '12px' }}>Condition:</strong>
                                        <span style={{
                                          padding: '4px 12px',
                                          borderRadius: '20px',
                                          backgroundColor: item.color,
                                          color: 'white',
                                          fontSize: '11px',
                                          fontWeight: 600,
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.05em'
                                        }}>
                                          {item.condition}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </Html>
                              )
                            }
                          </mesh>
                        )}
                      </group>
                    )
                  })
                }
              </group>
            )
          })
        }
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