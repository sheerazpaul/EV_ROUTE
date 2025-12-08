import React, { useState, useEffect } from "react";

function DevicePermissions() {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(Api.Device_api, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setDevices(data.devices || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDevices();
    }, []);
    const togglePermission = async (deviceId, allowed) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${Api.Device_api}/${deviceId}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ allowed: !allowed }),
            });
            if (!res.ok) throw new Error("Failed to update device permission");
            setDevices(devices.map(d => d.id === deviceId ? { ...d, allowed: !allowed } : d));
        } catch (err) {
            console.error(err);
            alert("Failed to update permission.");
        }
    };
    if (loading) return <p>Loading devices...</p>;
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Device Permissions</h2>
            {devices.length === 0 ? (
                <p>No devices registered.</p>
            ) : (
                <ul className="space-y-3">
                    {devices.map(device => (
                        <li key={device.id} className="flex justify-between items-center border-b py-2">
                            <span>{device.name}</span>
                            <button
                                onClick={() => togglePermission(device.id, device.allowed)}
                                className={`px-3 py-1 rounded ${
                                    device.allowed ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                }`}
                            >
                                {device.allowed ? "Allowed" : "Blocked"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default DevicePermissions;
