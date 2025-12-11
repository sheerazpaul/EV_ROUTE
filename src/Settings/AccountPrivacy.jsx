
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { USER_PROFILE_URL } from "../api.config";
export default function AccountPrivacy() {
  const [privacy, setPrivacy] = useState({
    showEmail: true,
    showPhone: true,
    showProfile: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(`${USER_PROFILE_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load privacy");
        const data = await res.json();
        setPrivacy((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacy();
  }, []);

  const togglePrivacy = async (key) => {
    try {
      const token = localStorage.getItem("access");
      const res = await fetch(`${USER_PROFILE_URL}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: !privacy[key] }),
      });
      if (!res.ok) throw new Error("Failed to update privacy");
      setPrivacy((p) => ({ ...p, [key]: !p[key] }));
    } catch (err) {
      console.error(err);
      alert("Failed to update privacy setting.");
    }
  };

  if (loading) return <p className="text-gray-700 dark:text-gray-300">Loading privacy settings...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Account Privacy</h2>

      <ul className="space-y-3">
        {Object.keys(privacy).map((key) => (
          <li key={key} className="flex justify-between items-center border-b py-3">
            <div className="capitalize text-gray-800 dark:text-gray-200">{key.replace(/([A-Z])/g, " $1")}</div>
            <Button
              variant="light"
              className={`${privacy[key] ? "bg-green-500 text-white" : "bg-red-500 text-white"} rounded-lg px-4 py-2`}
              onPress={() => togglePrivacy(key)}
            >
              {privacy[key] ? "Visible" : "Hidden"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
