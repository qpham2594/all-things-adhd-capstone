import React from 'react';

const Dashboard = ({ username }) => {
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>This is your dashboard. You have successfully logged in.</p>
    </div>
  );
};

export default Dashboard;
