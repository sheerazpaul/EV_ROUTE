import React, { useState } from "react";
import SettingSidebar from "./SettingSidebar";
import ProfilePage from "./ProfilePage";
import SecurityPage from "./SecurityPage";
import PasswordUpdate from "./PasswordUpdate";
import AccountPrivacy from "./AccountPrivacy";
import DevicePermissions from "./DevicePermission";
import { Link } from "react-router-dom";
function SettingsPage() {
    const [activePage, setActivePage] = useState("profile");
    const renderPage = () => {
        switch (activePage) {
            case "profile":
                return <ProfilePage />;
            case "security":
                return <SecurityPage />;
            case "password":
                return <PasswordUpdate />;
            case "privacy":
                return <AccountPrivacy />;
            case "devices":
                return <DevicePermissions />;
            default:
                return <ProfilePage />;
        }
    };
    return (
        <div>
            <div className="p-4 bg-zinc-800 flex justify-between">
                <Link
                    to="/dashboard"
                    className="p-2 px-12 bg-green-600 rounded-xl hover:cursor-pointer
                    hover:bg-green-500"
                >
                    Back
                </Link>
                <Link
                to="/"
                className="p-2 px-12 bg-blue-600 rounded-xl hover:cursor-pointer
                    hover:bg-blue-500"
                >
                Home
                </Link>
            </div>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
                <SettingSidebar activePage={activePage} setActivePage={setActivePage} />
                <div className="flex-1 p-8">{renderPage()}</div>
            </div>
        </div>
    );
}
export default SettingsPage;