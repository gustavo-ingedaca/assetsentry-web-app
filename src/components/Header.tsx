import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <div className="logo">
                <h1>AssetSentry</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/features">Features</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;