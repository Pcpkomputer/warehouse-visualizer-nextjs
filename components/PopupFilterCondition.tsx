export default function PopupFilterCondition({
    uniqueConditions,
    selectedConditions,
    setSelectedConditions,
    conditionColors,
}: {
    uniqueConditions: string[];
    selectedConditions: string[];
    setSelectedConditions: any;
    conditionColors: Record<string, string>;
}) {
    return (
        <div
            style={{
                position: "fixed",
                right: "24px",
                top: "24px",
                width: "240px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(12px)",
                padding: "24px",
                borderRadius: "20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                border: "1px solid rgba(229, 231, 235, 0.5)",
                fontFamily: "system-ui, -apple-system, sans-serif",
                zIndex: 2000,
            }}
        >
            <h2 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: 600, color: "#111827" }}>Filter by Condition</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {uniqueConditions.map((condition) => (
                    <label
                        key={condition}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            padding: "8px 12px",
                            borderRadius: "10px",
                            backgroundColor: selectedConditions.includes(condition) ? "#f8fafc" : "transparent",
                            transition: "background-color 0.2s",
                            border: "1px solid transparent",
                            borderColor: selectedConditions.includes(condition) ? "#e2e8f0" : "transparent",
                        }}
                    >
                        <input
                            type="checkbox"
                            style={{ display: "none" }}
                            checked={selectedConditions.includes(condition)}
                            onChange={() => {
                                setSelectedConditions((prev: any) =>
                                    prev.includes(condition) ? prev.filter((c: any) => c !== condition) : [...prev, condition],
                                );
                            }}
                        />
                        <div
                            style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "3px",
                                backgroundColor: conditionColors[condition],
                                marginRight: "12px",
                                boxShadow: `0 0 0 2px ${selectedConditions.includes(condition) ? "rgba(0,0,0,0.05)" : "transparent"}`,
                            }}
                        />
                        <span
                            style={{
                                fontSize: "13px",
                                color: selectedConditions.includes(condition) ? "#1e293b" : "#64748b",
                                fontWeight: selectedConditions.includes(condition) ? 500 : 400,
                            }}
                        >
                            {condition}
                        </span>
                    </label>
                ))}
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
                <button
                    onClick={() => setSelectedConditions(uniqueConditions)}
                    style={{
                        flex: 1,
                        padding: "8px",
                        fontSize: "11px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#f1f5f9",
                        color: "#475569",
                        cursor: "pointer",
                        fontWeight: 500,
                    }}
                >
                    All
                </button>
                <button
                    onClick={() => setSelectedConditions([])}
                    style={{
                        flex: 1,
                        padding: "8px",
                        fontSize: "11px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#f1f5f9",
                        color: "#475569",
                        cursor: "pointer",
                        fontWeight: 500,
                    }}
                >
                    None
                </button>
            </div>
        </div>
    );
}
