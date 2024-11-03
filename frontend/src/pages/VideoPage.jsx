
// src/pages/VideoPage.jsx

import { Link, useParams, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import './VideoPlayerPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisV } from '@fortawesome/free-solid-svg-icons';


const VideoPage = () => {
    const navigate = useNavigate();
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedText, setEditedText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const channelId = localStorage.getItem("channelId");
    useEffect(() => {
        // Fetch video details and comments by videoId
        const fetchVideo = async () => {
            try {
                const videoResponse = await axios.get(`http://localhost:5000/api/videos/${videoId}`);
                setVideo(videoResponse.data);

                const commentsResponse = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
                setComments(commentsResponse.data);

                const userResponse = await axios.get(`http://localhost:5000/api/auth/${userId}`);
                    setIsSubscribed(userResponse.data.subscriptions.includes(channelId));
            } catch (error) {
                console.error("Error fetching video or comments:", error);
            }
        };
        fetchVideo();
    }, [videoId]);

    const handleLike = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/videos/${videoId}/like`, 
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            setVideo((prevVideo) => ({
                ...prevVideo,
                likes: [...prevVideo.likes, token]
            }));
        } catch (error) {
            console.error("Error liking video:", error);
        }
    };

    const handleDislike = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/videos/${videoId}/dislike`, 
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            setVideo((prevVideo) => ({
                ...prevVideo,
                dislikes: [...prevVideo.dislikes, token]
            }));
        } catch (error) {
            console.error("Error disliking video:", error);
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/comments`,
                { text: commentText, videoId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setComments((prevComments) => [...prevComments, response.data]);
            setCommentText("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleEditComment = async (commentId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/comments/${commentId}`,
                { text: editedText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setComments((prevComments) => 
                prevComments.map((comment) =>
                    comment._id === commentId ? { ...comment, text: response.data.text } : comment
                )
            );
            setEditingCommentId(null);
            setEditedText("");
            setErrorMessage("");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setErrorMessage("Not authorized to edit this comment.");
            } else {
                console.error("Error updating comment:", error);
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
            setErrorMessage("");
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setErrorMessage("Not authorized to delete this comment.");
            } else {
                console.error("Error deleting comment:", error);
            }
        }
    };


    const handleNavigateToUpdate = () => {
        navigate(`/update-video/${videoId}`);
    };

    const handleDeleteVideo = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Video deleted successfully!");
            navigate(`/`);
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    };
     

    const handleSubscribe = async () => {
        try {
            const token = localStorage.getItem('token');
            const channelId = video.channelId._id; // Get the channel ID from the video

            await axios.post(`http://localhost:5000/api/channels/${channelId}/subscribe`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsSubscribed(true);
            
            setVideo((prev) => ({
                ...prev,
                channelId: {
                    ...prev.channelId,
                    subscribers: prev.channelId.subscribers + 1
                }
            }));
        } catch (error) {
            console.error("Error subscribing to channel:", error);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            const token = localStorage.getItem('token');
            const channelId = video.channelId._id; // Get the channel ID from the video

            await axios.post(`http://localhost:5000/api/channels/${channelId}/unsubscribe`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsSubscribed(false);
           
            setVideo((prev) => ({
                ...prev,
                channelId: {
                    ...prev.channelId,
                    subscribers: prev.channelId.subscribers - 1
                }
            }));
        } catch (error) {
            console.error("Error unsubscribing from channel:", error);
        }
    };

    if (!video) return <p>Loading...</p>;

    return (
        <div className="video-page">
             <Header />
             <div className="video-content">
             <div className="video-details">
            <video controls src={video.videoUrl}></video>
            <h2>{video.title}</h2>
            
            <div className="video-actions">
            <p>
                Uploader: 
                {video.uploader ? (
                    <Link to={`/channel/${video.channelId._id}`}>
                        {video.uploader.username}
                    </Link>
                ) : (
                    "Unknown Uploader"
                )}
            </p>
            {/* Subscribe/Unsubscribe Button */}
            {video.channelId && (
                <button onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}>
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
            )}
            <button onClick={handleLike}><FontAwesomeIcon icon={faThumbsUp} /> ({video.likes.length})</button>
            <button onClick={handleDislike}> <FontAwesomeIcon icon={faThumbsDown} />({video.dislikes.length})</button>
            </div>

            <div className="video-content-description">

            <p>{video.views} views</p>
            <p>Description of the video: {video.description}</p>
            {video.uploader && video.uploader._id === userId && (
                <div className="video-controls">
                    <button onClick={handleNavigateToUpdate}>Update Video</button>
                    <button onClick={handleDeleteVideo}>Delete Video</button>
                </div>
            )}
            </div>
            
            
            <section className="comments">
                <h3>Comments</h3>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="add-comment">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={handleAddComment}>Comment</button>
                </div>
                
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            {editingCommentId === comment._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                    <button onClick={() => handleEditComment(comment._id)}>Save</button>
                                </div>
                            ) : (
                                <p>{comment.text}</p>
                            )}
                            <button onClick={() => {
                                setEditingCommentId(comment._id);
                                setEditedText(comment.text);
                            }}>Edit</button>
                            <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
                
                
            </section>
            </div>
            <aside className="related-videos">
                <h3>Related Videos</h3>
                <div className="thumbnail">
                    <img src="https://res.cloudinary.com/drqq5q7gw/image/upload/v1730378640/samples/dessert-on-a-plate.jpg" alt="Thumbnail 1" />
                    <p>Sample Video Title 1</p>
                </div>
                <div className="thumbnail">
                    <img src="https://res.cloudinary.com/drqq5q7gw/image/upload/v1730378640/samples/dessert-on-a-plate.jpg" alt="Thumbnail 2" />
                    <p>Sample Video Title 2</p>
                </div>
                <div className="thumbnail">
                    <img src="https://res.cloudinary.com/drqq5q7gw/image/upload/v1730378640/samples/dessert-on-a-plate.jpg" alt="Thumbnail 3" />
                    <p>Sample Video Title 3</p>
                </div>
            </aside>
            </div>
        </div>
    );
};

export default VideoPage;















