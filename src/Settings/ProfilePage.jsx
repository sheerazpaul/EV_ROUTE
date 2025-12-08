import React, { useState, useEffect } from "react";
import { USER_PROFILE_URL } from "../api.config";

function ProfilePage() {
    const [userData, setUserData] = useState({
        user: { first_name: "", last_name: "", email: "" },
        phone_number: "",
        profile_image: null,
        vehicles: []
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(USER_PROFILE_URL, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();

                setUserData({
                    user: {
                        first_name: data.user?.first_name || "",
                        last_name: data.user?.last_name || "",
                        email: data.user?.email || "",
                    },
                    phone_number: data.phone_number || "",
                    profile_image: null,
                    vehicles: data.vehicles || []
                });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    console.log("Fetched profile data:", userData);
    const validateProfile = () => {
        const newErrors = {};

        if (!userData.user.first_name.trim()) newErrors.first_name = "First name is required.";
        if (!userData.user.last_name.trim()) newErrors.last_name = "Last name is required.";
        if (!userData.user.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(userData.user.email))
            newErrors.email = "Invalid email format.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveProfile = async () => {
        if (!validateProfile()) return;

        setSaving(true);
        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();

            formData.append("first_name", userData.user.first_name);
            formData.append("last_name", userData.user.last_name);
            formData.append("email", userData.user.email);
            formData.append("phone_number", userData.phone_number);

            userData.vehicles.forEach(v => {
                formData.append("Vehicle_ids[]", v.id);
            });

         
            if (userData.profile_image)
                formData.append("profile_image", userData.profile_image);

            const res = await fetch(USER_PROFILE_URL, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            const updated = await res.json();

            setUserData(prev => ({
                ...prev,
                user: updated.user || prev.user,
                profile_image: updated.profile_image || prev.profile_image,
                vehicles: updated.vehicles || prev.vehicles
            }));

            alert("Profile updated successfully!");

        } catch (err) {
            console.error(err);
            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };


    if (loading) return <p>Loading profile...</p>;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Profile</h2>

            <div className="flex flex-col gap-4">

                <input
                    type="text"
                    value={userData.user.first_name}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            user: { ...userData.user, first_name: e.target.value }
                        })
                    }
                    placeholder="First Name"
                    className="p-3 border rounded-lg dark:bg-gray-700"
                />
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}

                <input
                    type="text"
                    value={userData.user.last_name}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            user: { ...userData.user, last_name: e.target.value }
                        })
                    }
                    placeholder="Last Name"
                    className="p-3 border rounded-lg dark:bg-gray-700"
                />
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}

                <input
                    type="email"
                    value={userData.user.email}
                    onChange={e =>
                        setUserData({
                            ...userData,
                            user: { ...userData.user, email: e.target.value }
                        })
                    }
                    placeholder="Email"
                    className="p-3 border rounded-lg dark:bg-gray-700"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                    type="text"
                    value={userData.phone_number}
                    onChange={e => setUserData({ ...userData, phone_number: e.target.value })}
                    placeholder="Phone Number"
                    className="p-3 border rounded-lg dark:bg-gray-700"
                />

                <input
                    type="file"
                    accept=".jpg,.png,.jpeg"
                    onChange={e => {
                        const file = e.target.files[0];
                        if (file) setUserData({ ...userData, profile_image: file });
                    }}
                    className="p-3 border rounded-lg dark:bg-gray-700"
                />

                {userData.vehicles.map((vehicle, index) => (
                    <input
                        key={index}
                        type="text"
                        value={vehicle.id}
                        onChange={e => {
                            const updated = [...userData.vehicles];
                            updated[index].id = e.target.value;
                            setUserData({ ...userData, vehicles: updated });
                        }}
                        placeholder={`Vehicle ${index + 1} ID`}
                        className="p-3 border rounded-lg dark:bg-gray-700"
                    />
                ))}

                <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className={`mt-2 py-3 rounded-lg w-full ${
                        saving
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    {saving ? "Saving..." : "Save Profile"}
                </button>
            </div>
        </div>
    );
}

export default ProfilePage;
