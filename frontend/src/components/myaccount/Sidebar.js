import React from 'react';

const Sidebar = ({ currentView, setCurrentView }) => {
    return (
        <div className="sidebar">
            <ul>
                <li
                    className={currentView === 'profile' ? 'active' : ''}
                    onClick={() => setCurrentView('profile')}
                >
                    Profile
                </li>
                <li
                    className={currentView === 'orders' ? 'active' : ''}
                    onClick={() => setCurrentView('orders')}
                >
                    Orders
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
