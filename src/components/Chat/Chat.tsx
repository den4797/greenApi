import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import cn from "classnames";

import sendButton from "src/images/sendButton.png";

import TextArea from "src/components/TextArea/TextArea";
import Header from "./partials/Header/Header";

import { ReceiveMessage, sendMessage } from "src/Utils/api";

import styles from "./Chat.module.scss";
function Chat() {
  // @ts-ignore
  const isLoggedIn = useSelector((state) => state.data.isLoggedIn);
  // @ts-ignore
  const contactAvatar = useSelector((state) => state.data.contactAvatar);
  // @ts-ignore
  const myAvatar = useSelector((state) => state.data.myAvatar);

  const [outMessage, setOutMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    try {
      await sendMessage(outMessage, "SendMessage") // Отправляем сообщенине.
        .then(() => {
          setMessages([
            ...messages,
            { text: outMessage, type: "out", avatar: myAvatar },
          ]);
          setOutMessage("");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13 && !!outMessage) {
      setTimeout(() => {
        handleSendMessage();
      }, 200);
    }
  };

  let isRequestPending = false;

  const handleReceiveMessage = (avatar: string) => {
    if (!isRequestPending) {
      isRequestPending = true;
      ReceiveMessage("ReceiveNotification")
        .then((data) => {
          if (!data) {
            isRequestPending = false;
            return;
          }
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.textMessage, type: "in", avatar: avatar },
          ]);
        })
        .catch((error) => {
          isRequestPending = false;
          console.error("Ошибка при получении входящего сообщения:", error);
        })
        .finally(() => {
          isRequestPending = false;
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      const intervalId = setInterval(
        () => handleReceiveMessage(contactAvatar),
        5000
      );
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isLoggedIn, contactAvatar, handleReceiveMessage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />
        <div className={styles.messages}>
          {messages
            .slice()
            .reverse()
            .map((message, index) => (
              <div
                className={cn(styles.item, styles[`${message.type}`])}
                key={index}
              >
                {message.text}
              </div>
            ))}
        </div>
        <div className={styles.sendPanel}>
          <TextArea
            handleKeyDown={handleKeyDown}
            placeholder="Введите сообщение"
            value={outMessage}
            onChange={(e: any) => setOutMessage(e.target.value)}
          />

          {!!outMessage && (
            <img
              alt="sendButton"
              className={styles.sendButton}
              src={sendButton}
              onClick={handleSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
