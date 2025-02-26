import React from 'react'
import { useUserContext } from "../../context"
import { Button } from '../../components';

export const HomePage = () => {
  const { loading, currentUser, setCurrentUser } = useUserContext(); 

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {currentUser ? (
        <div style={{display: "flex", flexDirection: "column", gap:10}}>
          {currentUser.user.email}
          <Button onClick={signOut}>Sign Out</Button>
        </div>
      ) : (
        "Guest"
      )}
    </div>
  );
};
