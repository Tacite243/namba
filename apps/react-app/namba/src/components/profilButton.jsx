import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';  // You can use Bootstrap for styling

const ProfileButton = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div className="profile-button">
            <Dropdown show={showDropdown} onToggle={toggleDropdown}>
                <Dropdown.Toggle variant="link" id="profile-button" onClick={toggleDropdown}>
                    {/* <img src="/path-to-avatar.jpg" alt="Profile Avatar" className="avatar" /> */}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                    <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                    <Dropdown.Item onClick={() => { /* Logout logic */ }}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default ProfileButton;