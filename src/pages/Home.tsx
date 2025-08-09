import React from 'react';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import '../styles/Home.css'; // Import the CSS file for styling
import '../styles/global.css';
import '../styles/main.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <h1>Welcome to AssetSentry</h1>
                <p>Simplify maintenance reporting and keep your assets running at peak performance.</p>
                <button className="cta-button">Get Started</button>
            </header>
            <main>
                <section className="features-section">
                    <h2>Key Features</h2>
                    <Features />
                </section>
                <section className="pricing-section">
                    <Pricing />
                </section>
            </main>
        </div>
    );
};

export default Home;