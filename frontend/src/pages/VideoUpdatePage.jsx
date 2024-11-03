// VideoUpdatePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./VideoUpdatePage.css";
const VideoUpdatePage = () => {
    const { videoId } = useParams(); // Get videoId from the URL
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch existing video data when page loads
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/videos/${videoId}`);
                const { title, description, videoUrl, thumbnailUrl } = response.data;
                setTitle(title);
                setDescription(description);
                setVideoUrl(videoUrl);
                setThumbnailUrl(thumbnailUrl);
            } catch (error) {
                console.error("Error fetching video data:", error);
            }
        };
        fetchVideoData();
    }, [videoId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.put(
                `http://localhost:5000/api/videos/${videoId}`,
                { title, description, videoUrl, thumbnailUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Video updated successfully!");
            navigate(`/video/${videoId}`); // Redirect back to the video page after updating
        } catch (error) {
            console.error("Error updating video:", error);
            alert("Failed to update video.");
        }
    };

    return (
        <div className="video-update-page">
             <Header />
             <Sidebar />
            <div className="update-form-box">
            <h2>Update Video</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Video Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Thumbnail URL"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
            </div>
        </div>
    );
};

export default VideoUpdatePage;
