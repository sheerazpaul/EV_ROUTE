import React, { useState, useEffect } from "react";

function AccountPrivacy() {
    const [privacy, setPrivacy] = useState({
        showEmail: true,
        showPhone: true,
        showProfile: true,
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPrivacy = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(Api.Privacy_api, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setPrivacy(data);
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
            const token = localStorage.getItem("token");
            const res = await fetch(Api.Privacy_api, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ [key]: !privacy[key] }),
            });
            if (!res.ok) throw new Error("Failed to update privacy");
            setPrivacy({ ...privacy, [key]: !privacy[key] });
        } catch (err) {
            console.error(err);
            alert("Failed to update privacy setting.");
        }
    };
    if (loading) return <p>Loading privacy settings...</p>;
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Account Privacy</h2>
            <ul className="space-y-3">
                {Object.keys(privacy).map(key => (
                    <li key={key} className="flex justify-between items-center border-b py-2">
                        <span>{key.replace(/([A-Z])/g, " $1")}</span>
                        <button
                            onClick={() => togglePrivacy(key)}
                            className={`px-3 py-1 rounded ${
                                privacy[key] ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                        >
                            {privacy[key] ? "Visible" : "Hidden"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default AccountPrivacy;