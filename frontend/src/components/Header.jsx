// src/components/Header.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaBell, FaVideo, FaSearch } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './Header.css';
import cover from "../../src/assets/logo (1).png";
const Header = ({ user, channelId, onSearch, onCategorySelect }) => {
    const [query, setQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); 
    const [selectedCategory, setSelectedCategory] = useState("");

    const isAuthenticated = !!localStorage.getItem("token");
    const username = localStorage.getItem("username"); 
    const userId = localStorage.getItem("userId"); 

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleCategoryClick = (category) => {
        const newCategory = category === selectedCategory ? "" : category;
        setSelectedCategory(newCategory);
        onCategorySelect(newCategory);
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleUpload = () => setUploadOpen(!uploadOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("channelId");
        localStorage.removeItem("username");
        window.location.href = "/"; 
    };

    return (
        <header className="header">
            <div className="header-left">
                <FaBars className="hamburger" onClick={toggleSidebar} />
                <h1 className="logo">
                    <Link to="/">
                        <img src={cover} alt="YouTube Logo" className="logo-img"/>
                        YouTube Clone
                    </Link>
                </h1>
            </div>

            <div className="search-container">
                <form onSubmit={handleSearch} className="search-bar">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title or description..."
                    />
                    <button type="submit" className="search-icon">
                        <FaSearch />
                    </button>
                </form>

                <div className="filter-tags">
                    {["Animals", "Nature", "Birds", "Human", "Education"].map((tag) => (
                        <button 
                            key={tag} 
                            className={`filter-tag ${selectedCategory === tag ? "active" : ""}`}
                            onClick={() => handleCategoryClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className="header-right">
                <FaVideo className="icon" onClick={toggleUpload} />
                <FaBell className="icon" />
                {isAuthenticated ? (
                    <div className="user-dropdown">
                        <button onClick={toggleDropdown} className="auth-link">
                            User 
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to={`/profile/${userId}`} className="dropdown-item">View Profile</Link>
                                <button onClick={handleLogout} className="dropdown-item">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/auth" className="auth-link">Sign In</Link>
                )}
            </div>

            <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

            {uploadOpen && (
                <VideoUpload
                    onClose={toggleUpload}
                    user={user}
                    channelId={channelId}
                />
            )}
        </header>
    );
};

export default Header;










