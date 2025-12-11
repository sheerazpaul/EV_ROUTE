
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { USER_PROFILE_URL } from "../api.config";

export default function DevicePermissions() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(`${USER_PROFILE_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load devices");
        const data = await res.json();
        setDevices(data.devices || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  const toggleDevice = async (id, current) => {
    try {
      const token = localStorage.getItem("access");
      const res = await fetch(`${USER_PROFILE_URL}/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ allowed: !current }),
      });
      if (!res.ok) throw new Error("Failed to update device");
      setDevices((d) => d.map((dev) => (dev.id === id ? { ...dev, allowed: !current } : dev)));
    } catch (err) {
      console.error(err);
      alert("Failed to update device permission.");
    }
  };

  if (loading) return <p className="text-gray-700 dark:text-gray-300">Loading devices...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Device Permissions</h2>
      {devices.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No devices registered.</p>
      ) : (
        <ul className="space-y-3">
          {devices.map((dev) => (
            <li key={dev.id} className="flex justify-between items-center border-b py-3">
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">{dev.name || dev.device || dev.ip}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{dev.last_used || dev.created_at}</div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="light"
                  className={`px-4 py-2 rounded-lg ${dev.allowed ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                  onPress={() => toggleDevice(dev.id, dev.allowed)}
                >
                  {dev.allowed ? "Allowed" : "Blocked"}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
