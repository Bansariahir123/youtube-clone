import { Link } from "react-router-dom";
import "./VideoCard.css";
const VideoCard = ({ video }) => {

    const uploaderName = video.uploader ? video.uploader.username : "Unknown Uploader";
    // Default views to 0 if undefined
    const viewsCount = video.views || 0;

    return (
        <div className="video-card">
            <Link to={`/video/${video._id}`}>
                <img src={video.thumbnailUrl} alt={video.title} />
            </Link>
            
            <h4>{video.title}</h4>
            <h4>Description:{video.description}</h4>
            <p> {uploaderName}</p>
            <p>{viewsCount} views</p>
            
        </div>
    );
};

export default VideoCard;
