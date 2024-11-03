// src/pages/VideoUploadPage.jsx
// VideoUploadPage.jsx
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./VideoUploadPage.css"; 
const VideoUploadPage = () => {
    const { channelId } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const navigate = useNavigate();
    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token"); // Retrieve the token for authorization
            await axios.post(
                "http://localhost:5000/api/videos",
                { title, description, videoUrl, thumbnailUrl, channelId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Video uploaded successfully!");
            navigate(`/`);
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Failed to upload video.");
        }
    };

    return (
        
        <div className="video-upload-page">
             <Header />
             <Sidebar />
            <div className="upload-form-box">
            <h2>Upload Video</h2>
            <form onSubmit={handleUpload}>
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
                <button type="submit">Upload</button>
            </form>
            </div>
        </div>
    );
};

export default VideoUploadPage;

