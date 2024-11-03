
// src/pages/ChannelPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import './ChannelPage.css';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const ChannelPage = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();
    const [channel, setChannel] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/channels/${channelId}`);
                setChannel(response.data);

                const userId = localStorage.getItem("userId");
                if (userId && response.data.owner._id === userId) {
                    setIsOwner(true);
                }
            } catch (error) {
                console.error("Error fetching channel:", error);
            }
        };

        fetchChannel();
    }, [channelId]);

    const handleSubscribe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            await axios.post(`http://localhost:5000/api/channels/${channelId}/subscribe`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsSubscribed(true);
            setChannel((prev) => ({ ...prev, subscribers: prev.subscribers + 1 }));
        } catch (error) {
            console.error("Error subscribing to channel:", error);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            await axios.post(`http://localhost:5000/api/channels/${channelId}/unsubscribe`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsSubscribed(false);
            setChannel((prev) => ({ ...prev, subscribers: prev.subscribers - 1 }));
        } catch (error) {
            console.error("Error unsubscribing from channel:", error);
        }
    };

    const handleEditChannel = () => {
        navigate(`/edit-channel/${channelId}`);
    };
    const handleUploadVideo = () => {
        navigate(`/upload-video/${channelId}`);
    };
    if (!channel) return <p>Loading...</p>;

    return (
        
        <div className="channel-page">
        <Header />
        <div className="channel-page-info">
        <h2>{channel.name}</h2>
        <p>{channel.description}</p>
        <p>Subscribers: {channel.subscribers}</p>
        
        {isOwner ? (
            <div >
            <button className="button-actions" onClick={handleEditChannel}>Edit Channel</button>
            <button onClick={handleUploadVideo}>Upload Video</button>
            </div>
        ) : (
            <button onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}>
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
        )}
        
        <div className="channel-videos">
            {channel.videos.map((video) => (
                <VideoCard key={video._id} video={video} />
            ))}
        </div>
        </div>
    </div>

    );
};

export default ChannelPage;




