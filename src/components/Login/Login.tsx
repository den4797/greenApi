import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  getContactInfo,
  getMyAvatar,
  getSettings,
  getStateInstance,
} from "src/Utils/api";
import {
  setContactAvatar,
  setIsLoggedIn,
  setMyAvatar,
  setPhoneNumber,
  setSenderName,
} from "src/slices/dataSlice";

import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const handleLogin = async (data: any) => {
    // Приведение номера к формату ********@c.us и сохранение данных в localStorage
    data.phoneNumber &&
      localStorage.setItem(
        "phoneNumber",
        data.phoneNumber.replace("+", "") + "@c.us"
      );
    localStorage.setItem("idInstance", data.idInstance);
    localStorage.setItem("apiTokenInstance", data.apiTokenInstance);
    try {
      const response = await getStateInstance("getStateInstance");
      if (response.stateInstance === "authorized") {
        dispatch(setIsLoggedIn(true));
        dispatch(setPhoneNumber(data.phoneNumber));

        const { name, avatar } = await getContactInfo("getContactInfo");

        dispatch(setContactAvatar(avatar));
        dispatch(setSenderName(name));

        const { wid: ownerId } = await getSettings("getSettings");
        // Записываем ownerId в localStorage
        localStorage.setItem("ownerId", ownerId);

        dispatch(setMyAvatar(await getMyAvatar("GetAvatar")));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = (data: any) => {
    handleLogin(data);
    reset();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <h2 className={styles.headline}>У вас пока нет активных чатов</h2>
        <ol className={styles.instruction}>
          <li>
            Откройте сайт &nbsp;
            <a href="https://green-api.com/" rel="noreferrer" target="_blank">
              Green API
            </a>
            &nbsp; и авторузуйтесь, либо зарегистрируйтесь
          </li>
          <li>
            Выберите вкладку &nbsp;
            <a
              href="https://console.green-api.com/instanceList"
              rel="noreferrer"
              target="_blank"
            >
              инстансы
            </a>
            &nbsp;, а затем выберите какой хотите использовать
          </li>
          <li>Используйте idInstance и apiTokenInstance для входа</li>
        </ol>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.inputWrapper}>
            <label>idInstance</label>
            <input
              className={styles.input}
              {...register("idInstance", {
                required: "Поле обязательно для заполнения",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Неверный формат ID (ожидается 10 цифр)",
                },
                minLength: {
                  value: 10,
                  message: "Должно быть 10 цифр",
                },
              })}
              autoComplete="on"
              id="idInstance"
              maxLength={10}
              type="text"
            />
            {errors.idInstance && (
              <span className={styles.inputErrorText}>
                {errors.idInstance.message.toString()}
              </span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label>apiTokenInstance</label>
            <input
              className={styles.input}
              {...register("apiTokenInstance", {
                required: "Поле обязательно для заполнения",
                pattern: {
                  value: /^[a-zA-Z0-9]{50}$/,
                  message:
                    "Неверный формат apiTokenInstance (ожидается 50 символов)",
                },
                minLength: {
                  value: 50,
                  message: "Должно быть 50 символов",
                },
              })}
              id="apiTokenInstance"
              maxLength={50}
              type="text"
            />
            {errors.apiTokenInstance && (
              <span className={styles.inputErrorText}>
                {errors.apiTokenInstance.message.toString()}
              </span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <label>Номер телефона собеседника</label>
            <input
              className={styles.input}
              {...register("phoneNumber", {
                required: "Поле обязательно для заполнения",
                pattern: {
                  value: /^\+7\d{10}$/,
                  message: "Неверный формат номера.",
                },
              })}
              defaultValue="+7"
              id="phoneNumber"
              maxLength={12}
              type="text"
              onChange={(e) => {
                console.log(e);
              }}
              onKeyDown={(e) => {
                // @ts-ignore
                if (e.key === "Backspace" && e.target.value === "+7") {
                  e.preventDefault();
                }
              }}
            />
            {errors.phoneNumber && (
              <span className={styles.inputErrorText}>
                {errors.phoneNumber.message.toString()}
              </span>
            )}
          </div>
          <button className={styles.button} type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
