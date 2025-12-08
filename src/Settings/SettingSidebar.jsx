import React from "react";
function SettingSidebar({ activePage, setActivePage }) {
    const links = [
        { id: "profile", label: "Profile" },
        { id: "security", label: "Security" },
        { id: "password", label: "Password Update" },
        { id: "privacy", label: "Account Privacy" },
        { id: "devices", label: "Device Permissions" },
    ];
    return (
        <div className="w-64 bg-white dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Settings
            </h1>
            <nav className="flex flex-col gap-3">
                {links.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => setActivePage(link.id)}
                        className={`text-left px-4 py-2 rounded-lg w-full ${activePage === link.id
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        {link.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}
export default SettingSidebar;