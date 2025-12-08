import React, { useState } from "react";
import { RESET_PASSWORD_CONFIRM } from "../api.config";
function PasswordUpdate() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handlePasswordUpdate = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(RESET_PASSWORD_CONFIRM, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                    old_password: oldPassword,
                    new_password: newPassword,
                }),
            });
            if (!res.ok) throw new Error("Failed to update password");
            alert("Password updated successfully!");
            setOldPassword(""); setNewPassword(""); setConfirmPassword("");
        } catch (err) {
            console.error(err);
            alert("Failed to update password.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Update Password</h2>
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mb-3 w-full p-3 border rounded-lg dark:bg-gray-700"
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-3 w-full p-3 border rounded-lg dark:bg-gray-700"
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-3 w-full p-3 border rounded-lg dark:bg-gray-700"
            />
            <button
                onClick={handlePasswordUpdate}
                disabled={loading}
                className={`mt-2 py-3 rounded-lg w-full ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
                {loading ? "Updating..." : "Update Password"}
            </button>
        </div>
    );
}
export default PasswordUpdate;