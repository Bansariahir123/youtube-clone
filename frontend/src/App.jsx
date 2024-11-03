// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import VideoPage from "./pages/VideoPage";
import ChannelPage from "./pages/ChannelPage";
import AuthPage from "./pages/AuthPage";
import { useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import EditChannelPage from "./pages/EditChannelPage";
import VideoUploadPage from "./pages/VideoUploadPage";
import VideoUpdatePage from "./pages/VideoUpdatePage";
function App() {
    
    return (
        <Router>
            <Routes>
            
                <Route path="/" element={<HomePage />} />
                <Route path="/video/:videoId" element={<VideoPage />} />
                <Route path="/channel/:channelId" element={<ChannelPage />} />
                <Route path="/auth" element={<AuthPage  />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/edit-channel/:channelId" element={<EditChannelPage />} />
                <Route path="/upload-video/:channelId" element={<VideoUploadPage />} />
                <Route path="/update-video/:videoId" element={<VideoUpdatePage />} />

            </Routes>
        </Router>
    );
}

export default App;

