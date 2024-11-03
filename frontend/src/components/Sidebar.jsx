
import React from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome, 
    faFire, 
    faFilm, 
    faMusic, 
    faTv, 
    faShoppingBag, 
    faGamepad, 
    faNewspaper, 
    faFootballBall, 
    faBook, 
    faTshirt, 
    faPodcast, 
    faCogs, 
    faHistory, 
    faQuestionCircle, 
    faCommentDots,
    faCrown,
    faPlayCircle,
    faChild
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="sidebar-close" onClick={onClose}>
                ✖
            </button>
            <nav>
                <ul>
                    <li><FontAwesomeIcon icon={faHome} /> Home</li>
                    <li><FontAwesomeIcon icon={faFire} /> Trending</li>
                    <li><FontAwesomeIcon icon={faPlayCircle} /> Subscriptions</li>
                </ul>
                <hr />

                <h3>Explore</h3>
                <ul>
                    <li><FontAwesomeIcon icon={faFire} /> Trending</li>
                    <li><FontAwesomeIcon icon={faShoppingBag} /> Shopping</li>
                    <li><FontAwesomeIcon icon={faMusic} /> Music</li>
                    <li><FontAwesomeIcon icon={faFilm} /> Films</li>
                    <li><FontAwesomeIcon icon={faTv} /> Live</li>
                    <li><FontAwesomeIcon icon={faGamepad} /> Gaming</li>
                    <li><FontAwesomeIcon icon={faNewspaper} /> News</li>
                    <li><FontAwesomeIcon icon={faFootballBall} /> Sport</li>
                    <li><FontAwesomeIcon icon={faBook} /> Courses</li>
                    <li><FontAwesomeIcon icon={faTshirt} /> Fashion & Beauty</li>
                    <li><FontAwesomeIcon icon={faPodcast} /> Podcasts</li>
                </ul>
                <hr />

                <h3>More from YouTube</h3>
                <ul>
                    <li><FontAwesomeIcon icon={faCrown} /> YouTube Premium</li>
                    <li><FontAwesomeIcon icon={faPlayCircle} /> YouTube Studio</li>
                    <li><FontAwesomeIcon icon={faMusic} /> YouTube Music</li>
                    <li><FontAwesomeIcon icon={faChild} /> YouTube Kids</li>
                </ul>
                <hr />

                <ul>
                    <li><FontAwesomeIcon icon={faCogs} /> Settings</li>
                    <li><FontAwesomeIcon icon={faHistory} /> Report history</li>
                    <li><FontAwesomeIcon icon={faQuestionCircle} /> Help</li>
                    <li><FontAwesomeIcon icon={faCommentDots} /> Send feedback</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;





