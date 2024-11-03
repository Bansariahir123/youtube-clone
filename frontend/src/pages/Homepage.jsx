
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import './HomePage.css';

const HomePage = ({ user, onSignOut }) => {
    const [videos, setVideos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchBackendVideos = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/videos");
                if (!response.ok) throw new Error('Failed to fetch backend videos');
                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error("Error fetching backend videos:", error);
            }
        };
        fetchBackendVideos();
    }, []);

    // Filter videos by search query (in title or description) 
    const filteredVideos = videos.filter((video) => {
        const queryLower = searchQuery.toLowerCase();
        const titleMatches = video.title.toLowerCase().includes(queryLower);
        const descriptionMatches = video.description.toLowerCase().includes(queryLower);
        const categoryMatches = selectedCategory
            ? video.title.toLowerCase().includes(selectedCategory.toLowerCase())
            : true;
        return (titleMatches || descriptionMatches) && categoryMatches;
    });

    return (
        <div className="home-page">
            <Header 
                user={user} 
                onSignOut={onSignOut}
                onSearch={setSearchQuery}
                onCategorySelect={setSelectedCategory} 
            />
            <Sidebar />
            <section className="video-grid">
                {filteredVideos.map((video) => (
                    <VideoCard key={video.videoId} video={video} />
                ))}
            </section>
        </div>
    );
};

export default HomePage;

