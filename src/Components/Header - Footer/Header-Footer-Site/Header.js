import React from 'react';

const roleNames = {
  mentor: 'Mentor',
  student: 'Student',
  editingteacher: 'Editing Teacher',
  teachingassistant: 'Teaching Assistant',
  manager: 'Manager'
};

function Header() {
  const usernameDetail = JSON.parse(localStorage.getItem('username , roles'));

  const [username, roles] = usernameDetail.split('/');

  const roleDisplayNames = roles.split(',').map((role) => roleNames[role]);

  return (
    <>
      <div>
        <span>Welcome Back: {username}</span>
      </div>
      <div>
        <span>You Have {roleDisplayNames.length} Roles - </span>
        <span>Your Roles:</span> {roleDisplayNames.join(', ')}
      </div>
    </>
  );
}

export default Header;