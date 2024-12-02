import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  console.log(isAuthorized)
  console.log(user)
  // yaha per user variable me setuser ke value store hoge uuser fetch karne ke lyie 
  //hum user.user.role, user.token, user.success
return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);