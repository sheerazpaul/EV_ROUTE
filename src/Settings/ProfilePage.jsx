import  { useState, useEffect } from "react";
import { UPLOAD_IMAGE_URL, USER_PROFILE_URL } from "../api.config";

function ProfilePage() {
  const [userData, setUserData] = useState({
    user: { first_name: "", last_name: "", email: "" },
    phone_number: "",
    vehicles: [],
    profile_image: null
  });

  const [previewImage, setPreviewImage] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(USER_PROFILE_URL, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        console.log("Profile Data:", data);

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
    if (typeof fetchProfile === "function") fetchProfile();

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

  try {
    const token = localStorage.getItem("access");
    const formData = new FormData();
    formData.append("profile_image", userData.profile_image);

    const res = await fetch(UPLOAD_IMAGE_URL, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    if (!res.ok) throw new Error("Image upload failed");

    if (typeof fetchProfile === "function") fetchProfile();

    alert("Image uploaded successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to upload image");
  }
};


  if (loading)
    return <p className="text-gray-800 dark:text-gray-200">Loading profile...</p>;

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl h-[400px] flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
        Profile Settings
      </h2>

      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <img
            src={previewImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 shadow-lg transition-transform duration-300 group-hover:scale-105"
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
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          />
          <div className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-500 text-white p-1 rounded-full shadow cursor-pointer text-xs font-semibold">
            Change
          </div>
        </div>
        {[
          { label: "First Name", value: userData.user.first_name, key: "first_name" },
          { label: "Last Name", value: userData.user.last_name, key: "last_name" },
          { label: "Email", value: userData.user.email, key: "email" },
          { label: "Phone Number", value: userData.phone_number, key: "phone" }
        ].map(field => (
          <div key={field.key} className="w-full">
            <input
              type={field.key === "email" ? "email" : "text"}
              value={field.key === "phone" ? userData.phone_number : userData.user[field.key]}
              onChange={e => {
                if (field.key === "phone") {
                  setUserData({ ...userData, phone_number: e.target.value });
                } else {
                  setUserData({ ...userData, user: { ...userData.user, [field.key]: e.target.value } });
                }
              }}
              placeholder={field.label}
              className="w-full p-3 border rounded-xl dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            {errors[field.key] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>
            )}
          </div>
        ))}
        <div className="flex gap-3 w-full mt-2 ">
          <button
            onClick={handleImageUpload}
            className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow transition duration-200 "
          >
            Upload Image
          </button>

          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className={`flex-1 py-2 rounded-xl font-semibold text-white shadow transition duration-200 ${
              saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
