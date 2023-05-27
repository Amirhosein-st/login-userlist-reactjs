import { useUserContext } from '../../Components/UserContext/UserContext';
import { Link } from 'react-router-dom';
import Logout from "../../Components/Logout/Logout-btn";

const HomePage = () => {
  
  const { profile } = useUserContext();

  return (
    <div>
      <h1>You are logged in!</h1>
      <h3>Home Page</h3>
      <Link to="/home/userlist"><button style={{color:"orange" , backgroundColor:"green"}}>View User List</button></Link>
      <Logout />
      <div className="user-detail">
        <h2>User Details:</h2>
        {profile && (
          <>
            <p>Id: {profile.id}</p>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            {profile.roles && (
              <>
                <p>Roles - {profile.roles.length}:</p>
                <ul>
                  {profile.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;