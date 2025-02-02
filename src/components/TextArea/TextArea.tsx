import React, { useLayoutEffect, useRef, FC } from "react";

import styles from "./TextArea.module.scss";

type TTextArea = {
  value: string;
  placeholder: string;
  handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const TextArea: FC<TTextArea> = (props) => {
  const { value, placeholder, handleKeyDown, onChange } = props;
  const textbox = useRef(null);

  function adjustHeight() {
    textbox.current.style.height = "inherit";
    textbox.current.style.height = `${textbox.current.scrollHeight}px`;
  }

  useLayoutEffect(adjustHeight, []);

  function handleKeyDowns(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    handleKeyDown(e);
    adjustHeight();
  }
  return (
    <textarea
      className={styles.textArea}
      maxLength={1000}
      placeholder={placeholder}
      ref={textbox}
      rows={1}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDowns}
    />
  );
};

export default TextArea;
