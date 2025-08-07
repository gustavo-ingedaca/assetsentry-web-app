import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer">
                <p>&copy; {new Date().getFullYear()} AssetSentry. All rights reserved.</p>
                <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;