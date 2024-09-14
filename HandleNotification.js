/*
I am building a notification function where a notification appears each time 
a user clicks the like or dislike button. 
The more clicks, the more notifications will show up. After 3 seconds, 
the notifications will start disappearing one by one, with the first one disappearing first.
*/
import React, { useState, useEffect } from 'react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  // Function to handle new notifications
  const addNotification = (type) => {
    const id = Date.now();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, type, message: `${type === 'like' ? 'Liked!' : 'Disliked!'}` },
    ]);

    // Automatically remove after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  // Function to remove the first notification (FIFO)
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div>
      <div>
        <button onClick={() => addNotification('like')}>Like</button>
        <button onClick={() => addNotification('dislike')}>Dislike</button>
      </div>

      <div className="notification-container">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification">
            {notification.message}
          </div>
        ))}
      </div>

      <style jsx>{`
        .notification-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .notification {
          padding: 10px 20px;
          background-color: lightblue;
          border: 1px solid blue;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default NotificationSystem;
