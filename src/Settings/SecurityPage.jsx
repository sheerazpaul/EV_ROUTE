import React, { useState, useEffect } from "react";
function SecurityPage() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(Security_api, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setSessions(data.sessions || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);
    const revokeSession = async (sessionId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${Api.Security_api}/${sessionId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to revoke session");
            setSessions(sessions.filter(s => s.id !== sessionId));
        } catch (err) {
            console.error(err);
            alert("Failed to revoke session.");
        }
    };
    if (loading) return <p>Loading security sessions...</p>;
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Security</h2>
            {sessions.length === 0 ? (
                <p>No active sessions.</p>
            ) : (
                <ul className="space-y-3">
                    {sessions.map(session => (
                        <li key={session.id} className="flex justify-between border-b py-2">
                            <span>{session.device} - {session.location}</span>
                            <button
                                onClick={() => revokeSession(session.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Revoke
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default SecurityPage;