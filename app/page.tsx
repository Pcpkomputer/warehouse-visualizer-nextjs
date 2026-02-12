"use client";

import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { WarehouseData, RackData, ZoneData, RouteData, Item } from "@/types/warehouse";
import { ThreeEvent } from "@react-three/fiber";
import Rack from "@/components/Rack";
import Zone from "@/components/Zone";
import RouteLine from "@/components/RouteLine";
import Forklift from "@/components/Forklift";
import PopupFilterCondition from "@/components/PopupFilterCondition";
import { useWarehouseStore } from "@/store/useWarehouseStore";
import warehouseData from "@/warehouse-data.json";


export default function Home() {
    const {
        data,
        setData,
        selectedItem,
        setSelectedItem,
        selectedConditions,
        setSelectedConditions
    } = useWarehouseStore();

    const hasInitializedFilter = React.useRef(false);

    React.useEffect(() => {
        setData(warehouseData as WarehouseData);
    }, [setData]);

    React.useEffect(() => {
        if (data.racks.length > 0 && !hasInitializedFilter.current) {
            const conditions = new Set<string>();
            data.racks.forEach((rack) => {
                rack.items.forEach((item) => {
                    if (item.condition) conditions.add(item.condition);
                });
            });
            const allConditions = Array.from(conditions);
            if (allConditions.length > 0) {
                setSelectedConditions(allConditions);
                hasInitializedFilter.current = true;
            }
        }
    }, [data.racks, setSelectedConditions]);

    const racks = useMemo<RackData[]>(() => {
        return data.racks || [];
    }, [data]);

    const zones = useMemo<ZoneData[]>(() => {
        return data.zones || [];
    }, [data]);

    const routes = useMemo<RouteData[]>(() => {
        return data.routes || [];
    }, [data]);

    const boxSize = 1;
    const halfBoxSize = boxSize / 2;

    return (
        <>
            <Canvas style={{ width: "100%", height: "100vh", backgroundColor: "white" }} camera={{ position: [8, 10, 8], fov: 50, zoom: 0.6 }}>
                <ambientLight intensity={1.2} />
                <directionalLight position={[10, 10, 5]} intensity={1.8} castShadow />
                <pointLight position={[-10, 10, -5]} intensity={0.6} />
                <hemisphereLight args={["#ffffff", "#aaaaaa", 1.0]} />
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.01, 0]}
                    receiveShadow
                    onPointerEnter={() => setSelectedItem(null)}
                >
                    <planeGeometry args={[100, 100]} />
                    <meshToonMaterial color="#F3F4F6" />
                </mesh>
                <gridHelper
                    args={[100, 100, "#F9FAFB", "#F9FAFB"]}
                    onPointerEnter={() => setSelectedItem(null)}
                />

                {racks.map((rack, rackIdx: number) => {
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
                        <group key={rackIdx} onPointerEnter={() => setSelectedItem(null)}>
                            <Rack color="#94A3B8" position={rack.coordinate} shelves={2} width={3} height={4} depth={1} />
                            <Text
                                position={[rack.coordinate[0], 5.5, rack.coordinate[2]]}
                                fontSize={0.3}
                                color="#1f2937"
                                anchorX="center"
                                anchorY="middle"
                                outlineWidth={0.02}
                                outlineColor="#ffffff"
                            >
                                {rack.name}
                            </Text>
                            {rack.items.map((item: Item, itemIdx: number) => {
                                const x = item.position.x;
                                const y = item.position.y;

                                const adjustedY = (maxY - y);

                                const itemX = rack.coordinate[0] - 1 + x;
                                const itemY = rack.coordinate[1] + adjustedY * shelfSpacing + halfBoxSize;
                                const itemZ = rack.coordinate[2];

                                return (
                                    <group key={`${rackIdx}-item-${itemIdx}`}>
                                        {selectedConditions.includes(item.condition) && (
                                            <group position={[itemX, itemY, itemZ]}>
                                                <mesh
                                                    onPointerEnter={(e: ThreeEvent<PointerEvent>) => {
                                                        e.stopPropagation();
                                                        document.body.style.cursor = "pointer";
                                                        setSelectedItem(item);
                                                    }}
                                                >
                                                    <boxGeometry args={[boxSize, boxSize, boxSize]} />
                                                    <meshToonMaterial
                                                        color={item?.color}
                                                        emissive={selectedItem?.serialNo === item.serialNo ? item.color : "black"}
                                                        emissiveIntensity={selectedItem?.serialNo === item.serialNo ? 0.5 : 0}
                                                    />
                                                </mesh>
                                                <Text fontSize={0.1} position={[0, 0.1, 0.52]} raycast={() => null}>
                                                    {item?.condition}
                                                </Text>

                                                {selectedItem?.serialNo === item.serialNo && (
                                                    <mesh position={[0, 0, 0]} raycast={() => null}>
                                                        <boxGeometry args={[boxSize * 1.05, boxSize * 1.05, boxSize * 1.05]} />
                                                        <meshBasicMaterial color="white" wireframe transparent opacity={0.3} />
                                                    </mesh>
                                                )}

                                                {selectedItem?.serialNo === item.serialNo && (
                                                    <Html center zIndexRange={[100, 0]} pointerEvents="none">
                                                        <div
                                                            style={{
                                                                transform: "translate(160px, -50%)",
                                                                width: "300px",
                                                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                                                backdropFilter: "blur(10px)",
                                                                padding: "24px",
                                                                borderRadius: "16px",
                                                                boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
                                                                border: `2px solid ${item.color}`,
                                                                fontFamily: "inherit",
                                                                zIndex: 1000,
                                                                position: "relative",
                                                                pointerEvents: "none",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "center",
                                                                    marginBottom: "18px",
                                                                }}
                                                            >
                                                                <h3 style={{ margin: 0, color: "#111827", fontSize: "18px", fontWeight: 600 }}>Item Details</h3>
                                                            </div>

                                                            <div style={{ fontSize: "14px", lineHeight: "1.8", color: "#374151" }}>
                                                                <p style={{ margin: "8px 0" }}>
                                                                    <strong style={{ color: "#6b7280" }}>Serial No:</strong>{" "}
                                                                    <span style={{ float: "right", color: "#111827" }}>{item.serialNo}</span>
                                                                </p>
                                                                <p style={{ margin: "8px 0" }}>
                                                                    <strong style={{ color: "#6b7280" }}>Lot:</strong>{" "}
                                                                    <span style={{ float: "right", color: "#111827" }}>{item.lot}</span>
                                                                </p>
                                                                <div style={{ margin: "12px 0", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
                                                                    <strong style={{ display: "block", marginBottom: "4px", color: "#6b7280" }}>
                                                                        Description:
                                                                    </strong>
                                                                    <p style={{ margin: 0, color: "#111827" }}>{item.description}</p>
                                                                </div>
                                                                <div style={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
                                                                    <strong style={{ color: "#6b7280", marginRight: "12px" }}>Condition:</strong>
                                                                    <span
                                                                        style={{
                                                                            padding: "4px 12px",
                                                                            borderRadius: "20px",
                                                                            backgroundColor: item.color,
                                                                            color: "white",
                                                                            fontSize: "11px",
                                                                            fontWeight: 600,
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.05em",
                                                                        }}
                                                                    >
                                                                        {item.condition}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Html>
                                                )}

                                            </group>
                                        )}
                                    </group>
                                );
                            })}
                        </group>
                    );
                })}

                {zones?.map((zone: ZoneData, zoneIdx: number) => (
                    <group key={`zone-${zoneIdx}`} onPointerEnter={() => setSelectedItem(null)}>
                        <Zone
                            key={`zone-${zoneIdx}`}
                            type={zone.type}
                            name={zone.name}
                            position={zone.coordinate as [number, number, number]}
                            dimensions={zone.dimensions as [number, number]}
                            color={zone.color}
                            opacity={0.4}
                        />
                    </group>
                ))}

                {routes?.map((route: RouteData, routeIdx: number) => (
                    <group key={`route-group-${routeIdx}`} onPointerEnter={() => setSelectedItem(null)}>
                        <RouteLine path={route.path as [number, number, number][]} color={route.color} />
                        {route.type === "forklift" && <Forklift path={route.path as [number, number, number][]} color={route.color} speed={3} />}
                    </group>
                ))}
                <OrbitControls enableDamping enablePan dampingFactor={0.05} minDistance={3} maxDistance={20} maxPolarAngle={Math.PI / 2} />
            </Canvas>
            <PopupFilterCondition />
        </>
    );
}
