import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if(!user){
        return setLoading(false);
      }

      const { token } = user;

      const isTokenExpired = (token) => {
        const payload = JSON.parse(atob(token.split(".")[1]));

        if(!payload){
          return true;
        }else{
          const currentTime = Date.now()/1000;
          return payload.exp < currentTime;
        }
      };

      if ( token && !isTokenExpired(token)){
        setCurrentUser(user);
        setLoading(false);
      }else{
        alert("Session is expired. Log back in to receive data");
        setCurrentUser(null);
        localStorage.removeItem('user');
        setLoading(false);
      }
    }catch(error){
      console.log("Error fetching user data");
    }
  },[]);

  return <UserContextProvider value = {{currentUser, setCurrentUser, loading}}>{children}</UserContextProvider>
};

export const useUserContext = () => {
  return useContext(UserContext);
};