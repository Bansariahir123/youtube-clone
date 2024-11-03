// src/pages/EditChannelPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./EditChannelPage.css";
const EditChannelPage = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [channelData, setChannelData] = useState({
        name: "",
        description: "",
        channelBanner: ""
    });

    useEffect(() => {
        // Fetch channel data to populate fields
        const fetchChannelData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/channels/${channelId}`);
                setChannelData({
                    name: response.data.name,
                    description: response.data.description,
                    channelBanner: response.data.channelBanner
                });
            } catch (error) {
                console.error("Error fetching channel data:", error);
            }
        };
        fetchChannelData();
    }, [channelId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChannelData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:5000/api/channels/${channelId}`,
                channelData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            alert("Channel updated successfully!");
            navigate(`/channel/${channelId}`);
        } catch (error) {
            console.error("Error updating channel:", error);
            alert("Failed to update the channel.");
        }
    };

    return (
        <div className="edit-channel-page">
              <Header />
              <Sidebar />
            <div className="edit-form-box">
            <h2>Edit Channel</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Channel Name:
                    <input
                        type="text"
                        name="name"
                        value={channelData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={channelData.description}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Channel Banner URL:
                    <input
                        type="text"
                        name="channelBanner"
                        value={channelData.channelBanner}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
            </div>
        </div>
    );
};

export default EditChannelPage;
