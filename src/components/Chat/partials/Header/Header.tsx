import React from "react";
import { useDispatch, useSelector } from "react-redux";

import defaultAvatar from "src/images/avatarDefault.png";
import { clearData } from "src/slices/dataSlice";

import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  const senderName = useSelector((state) => state.data.senderName);
  // @ts-ignore
  const phoneNumber = useSelector((state) => state.data.phoneNumber);
  // @ts-ignore
  const contactAvatar = useSelector((state) => state.data.contactAvatar);

  const logout = () => {
    dispatch(clearData());
    localStorage.clear();
  };

  return (
    <div className={styles.header}>
      <img
        alt="avatar"
        className={styles.avatar}
        src={contactAvatar || defaultAvatar}
      />
      <div className={styles.containerText}>
        <div className={styles.name}>{senderName || phoneNumber}</div>
        <div className={styles.time}>Был(а) - </div>
      </div>
      <button className={styles.logoutButton} onClick={logout}>
        Выход
      </button>
    </div>
  );
};

export default Header;
