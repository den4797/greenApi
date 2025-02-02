import React, { useEffect } from "react";

import Login from "./Login/Login";
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";

import { useSelector } from "react-redux";

import styles from "./App.module.scss";

const App = () => {
  // @ts-ignore
  const isLoggedIn = useSelector((state) => state.data.isLoggedIn);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={styles.App}>
      {isLoggedIn ? (
        <div className={styles.wrapper}>
          <Sidebar />
          <Chat />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
