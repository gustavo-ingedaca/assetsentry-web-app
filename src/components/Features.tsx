import React from 'react';

const Features: React.FC = () => {
    return (
        <section className="features">
            <ul>
                <li>
                    <h3>Lifecycle Support</h3>
                    <p>From setup to daily operations and decommissioning.</p>
                </li>
                <li>
                    <h3>Hardware-Agnostic</h3>
                    <p>Integrates with any existing sensors or systems.</p>
                </li>
                <li>
                    <h3>Custom Alerts & Reports</h3>
                    <p>Delivered straight to your inbox.</p>
                </li>
                <li>
                    <h3>Intelligent Tagging</h3>
                    <p>Train your predictive models by flagging key events.</p>
                </li>
                <li>
                    <h3>Calendar Integration</h3>
                    <p>Sync with Google or Outlook effortlessly.</p>
                </li>
                <li>
                    <h3>Interactive Dashboards</h3>
                    <p>Explore your assets’ history visually.</p>
                </li>
            </ul>
        </section>
    );
};

export default Features;