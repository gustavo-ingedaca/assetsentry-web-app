import React from 'react';
import '../styles/Home.css'; // Import the CSS file for styling

const About: React.FC = () => {
    return (
        <div className="about-section">
            <h1>About AssetSentry</h1>
            <p>
                AssetSentry is a cloud-based platform designed to simplify maintenance management and enhance asset performance. 
                Our mission is to help maintenance teams work smarter, not harder, by providing tools that automate reporting, 
                streamline operations, and reduce manual data entry.
            </p>
            <h2>Our Challenges</h2>
            <p>
                We understand the challenges faced by maintenance managers, including overloaded operators, 
                understaffed teams, and the complexities of managing growing asset fleets. 
                AssetSentry adapts to your assets, providing a tailored solution that meets your specific needs.
            </p>
            <h2>Key Features</h2>
            <ul>
                <li>Lifecycle Support: From setup to decommissioning.</li>
                <li>Hardware-Agnostic: Integrates with existing sensors and systems.</li>
                <li>Custom Alerts & Reports: Delivered straight to your inbox.</li>
                <li>Intelligent Tagging: Train predictive models by flagging key events.</li>
                <li>Calendar Integration: Sync with Google or Outlook effortlessly.</li>
                <li>Interactive Dashboards: Visual exploration of asset history.</li>
            </ul>
            <h2>Get Started</h2>
            <p>
                Start your journey with AssetSentry today. Create a free account and explore our features with simulated assets. 
                Connect your real assets and go live in minutes!
            </p>
        </div>
    );
};

export default About;