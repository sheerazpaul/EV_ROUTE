import React, { useState, useEffect } from "react";
import { useAuth } from "../Components/AuthContext";
import { UPLOAD_IMAGE_URL, USER_PROFILE_URL } from "../api.config.js";

function ProfilePage() {
  const { setUser } = useAuth();
  const [userData, setUserData] = useState({
    user: { first_name: "", last_name: "", email: "" },
    phone_number: "",
    vehicles: [],
    profile_image: null
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState("/default-avatar.png");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(USER_PROFILE_URL, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUserData({
          user: {
            first_name: data.user?.first_name || "",
            last_name: data.user?.last_name || "",
            email: data.user?.email || ""
          },
          phone_number: data.phone_number || "",
          vehicles: data.vehicles?.map(v => ({
            id: v.id || v.vehicle_id || "",
            name: v.name || ""
          })) || [],
          profile_image: null
        });
        setPreviewImage(data.profile_image || "/default-avatar.png");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateProfile = () => {
    const newErrors = {};
    if (!userData.user.first_name.trim()) newErrors.first_name = "First name required";
    if (!userData.user.last_name.trim()) newErrors.last_name = "Last name required";
    if (!userData.user.email.trim()) newErrors.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(userData.user.email)) newErrors.email = "Invalid email";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("access");
      const jsonPayload = {
        user: {
          first_name: userData.user.first_name,
          last_name: userData.user.last_name,
          email: userData.user.email
        },
        phone_number: userData.phone_number,
        vehicle_ids: userData.vehicles.map(v => v.id)
      };

      const res = await fetch(USER_PROFILE_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(jsonPayload)
      });
      if (!res.ok) throw new Error("Profile update failed");

      setUser(prev => ({
        ...prev,
        user: {
          ...prev.user,
          first_name: userData.user.first_name,
          last_name: userData.user.last_name,
          email: userData.user.email
        },
        phone_number: userData.phone_number
      }));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async () => {
    if (!userData.profile_image) return alert("Select image first");
    setSaving(true);
    try {
      const token = localStorage.getItem("access");
      const formData = new FormData();
      formData.append("profile_image", userData.profile_image);

      const res = await fetch(`${UPLOAD_IMAGE_URL}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error("Image upload failed");

      const imageUrl = URL.createObjectURL(userData.profile_image);

      setUser(prev => ({ ...prev, profile_image: imageUrl }));
      setPreviewImage(imageUrl);

      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-800 dark:text-gray-200">Loading profile...</p>;

  return (
    <div className="bg-white dark:bg-[#101922] p-5 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 h-[550px] w-[450px] ml-40 ">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Profile</h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-2">
          <img
            src={previewImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-md mb-1"
          />
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                setUserData({ ...userData, profile_image: file });
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
            className="p-1 border rounded-lg dark:bg-gray-700 w-full text-xs"
          />
        </div>

     
        <input
          type="text"
          value={userData.user.first_name}
          onChange={e => setUserData({ ...userData, user: { ...userData.user, first_name: e.target.value } })}
          placeholder="First Name"
          className="p-2 text-sm border rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}

        <input
          type="text"
          value={userData.user.last_name}
          onChange={e => setUserData({ ...userData, user: { ...userData.user, last_name: e.target.value } })}
          placeholder="Last Name"
          className="p-2 text-sm border rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}

        <input
          type="email"
          value={userData.user.email}
          onChange={e => setUserData({ ...userData, user: { ...userData.user, email: e.target.value } })}
          placeholder="Email"
          className="p-2 text-sm border rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

        <input
          type="text"
          value={userData.phone_number}
          onChange={e => setUserData({ ...userData, phone_number: e.target.value })}
          placeholder="Phone Number"
          className="p-2 text-sm border rounded-lg dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className={`mt-2 py-2 rounded-lg w-full text-sm font-semibold transition-all ${
            saving
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        <button
          onClick={handleImageUpload}
          className="mt-1 py-2 rounded-lg w-full text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-all"
        >
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
