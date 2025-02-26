import { createContext, useContext, useEffect, useState } from "react";

const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));

  if (!payload) {
    return true;
  } else {
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setLoading(false);
        return;
      }

      const { token } = user;

      if (token && !isTokenExpired(token)) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        alert("Session is expired. Log back in to retrieve data");
        setCurrentUser(null);
        localStorage.removeItem("user");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};