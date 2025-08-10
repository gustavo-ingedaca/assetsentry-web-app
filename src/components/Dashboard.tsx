import React from 'react';
import '../styles/Dashboard.css';

import acMotorImg from '../assets/ac_motor.png';
import coldRoomImg from '../assets/cold_room.png';
import dieselTankImg from '../assets/diesel_tank.png';

interface AssetCardProps {
  title: string;
  description: string;
  status: 'Good' | 'Fault' | 'Failure';
  image: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ title, description, image }) => (
  <div className="asset-card">
    <img src={image} alt={title} className="asset-image" />
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const assets: AssetCardProps[] = [
    {
      title: 'AC Motor (AHU)',
      description: 'Fitted with a vibration sensor for condition monitoring.',
      status: 'Good',
      image: acMotorImg
    },
    {
      title: 'Cold Room',
      description: 'Monitored by a temperature probe sensor to ensure optimal storage.',
      status: 'Fault',
      image: coldRoomImg
    },
    {
      title: 'Diesel Tank',
      description: 'Equipped with a level sensor for fuel level tracking.',
      status: 'Failure',
      image: dieselTankImg
    }
  ];

  const statuses: { label: AssetCardProps['status']; colorClass: string }[] = [
    { label: 'Good', colorClass: 'green-header' },
    { label: 'Fault', colorClass: 'yellow-header' },
    { label: 'Failure', colorClass: 'red-header' }
  ];

  return (
    <div className="dashboard">
      <h1>Asset Kanban Dashboard</h1>
      <div className="kanban-board">
        {statuses.map(({ label, colorClass }) => (
          <div key={label} className="kanban-column">
            <h2 className={colorClass}>{label}</h2>
            {assets
              .filter(asset => asset.status === label)
              .map((asset, index) => (
                <AssetCard key={index} {...asset} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
