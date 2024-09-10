import React, { useState } from 'react';

import UserProfile from './UserProfile';
import Orders from './Orders';
import Sidebar from './Sidebar';

const MyAccount = () => {
    const [currentView, setCurrentView] = useState('profile');


   return (
       <div className="my-account-container" style={{ display: 'flex' }}>
           <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
           <div className="my-account-content" style={{ marginLeft: '200px', padding: '20px' }}>
               {currentView === 'profile' && <UserProfile />}
               {currentView === 'orders' && <Orders />}
           </div>
       </div>
    );
};

export default MyAccount;
