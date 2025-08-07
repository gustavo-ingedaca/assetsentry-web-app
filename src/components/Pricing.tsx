import React from 'react';

const Pricing: React.FC = () => {
    return (
        <div className="pricing">
            <h2>Pricing Plans</h2>
            <p>Less than $100/month per asset</p>
            <p>All-inclusive monthly subscription with no hidden fees.</p>
            <p>Cancel or pause anytime—no long-term contracts.</p>
            <h3>Get started with full team coverage:</h3>
            <ul>
                <li>1 Admin</li>
                <li>1 Supervisor</li>
                <li>2 Maintainers</li>
            </ul>
            <h3>Start in 3 Easy Steps:</h3>
            <ol>
                <li>Create Your Free Account: No credit card needed.</li>
                <li>Explore with Simulated Assets: Full access to demo data and all features.</li>
                <li>Connect Your Real Assets: Go live in minutes.</li>
            </ol>
        </div>
    );
};

export default Pricing;