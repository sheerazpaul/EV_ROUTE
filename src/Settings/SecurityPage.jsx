
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { USER_PROFILE_URL } from "../api.config";

export default function SecurityPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(USER_PROFILE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load sessions");
        const data = await res.json();
        setSessions(data.sessions || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const revokeSession = async (id) => {
    if (!confirm("Revoke this session?")) return;
    try {
      const token = localStorage.getItem("access");
      const res = await fetch(`${USER_PROFILE_URL}/sessions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to revoke session");
      setSessions((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to revoke session");
    }
  };

  if (loading) return <p className="text-gray-700 dark:text-gray-300">Loading sessions...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Security — Active Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No active sessions found.</p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s) => (
            <li key={s.id} className="flex justify-between items-center border-b py-3">
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">{s.device || s.ip || "Unknown device"}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{s.location || s.ip}</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{s.last_active || s.created_at}</div>
              </div>
              <div>
                <Button variant="light" className="px-4 py-2 rounded-lg" onPress={() => revokeSession(s.id)}>
                  Revoke
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
