

// src/pages/ProfilePage.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./ProfilePage.css";  // Import the CSS file

const ProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, [userId]);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <Header />
            <Sidebar />
            <div className="profile-box">
                <h2>{user.username}'s Profile</h2>
                <p>Email: {user.email}</p>
                <p>Channel Count: {user.channels.length}</p>
                <p>Subscription Count: {user.subscriptions.length}</p>
                {user.channels.length > 0 && (
                    <Link to={`/channel/${user.channels[0]._id}`}>Go to My Channel</Link>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;


