
import React, { useState } from "react";
import { Button } from "@heroui/react";

function PasswordUpdate() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) return alert("Please fill all fields.");
    if (newPassword !== confirmPassword) return alert("Passwords do not match.");
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      const res = await fetch(`${USER_PROFILE_URL}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update password");
      }
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
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Update Password</h2>

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

      <Button
        variant="light"
        className={`mt-2 py-3 rounded-lg w-full font-semibold ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        onPress={handlePasswordUpdate}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </div>
  );
}

export default PasswordUpdate;
