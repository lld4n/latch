"use client";
import Link from "next/link";
import React from "react";
import logo from "../../../assets/logo.svg";
import Image from "next/image";
import styles from "./signup.module.scss";
import { Eye, EyeOff, Loader2, Upload, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import md5 from "md5";
import { useRouter } from "next/navigation";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
export default function SignIn() {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [passwordInput2, setPasswordInput2] = React.useState("");
  const [passwordShow2, setPasswordShow2] = React.useState(false);
  const [photoURL, setPhotoURL] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const router = useRouter();

  const getUrl = useMutation(api.files.getUrl);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createUser = useMutation(api.users.createUser);
  React.useEffect(() => {
    if (danger) {
      setTimeout(() => {
        setDanger(false);
      }, 4000);
    }
  }, [danger]);

  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    // @ts-ignore
    const url = await getUrl({ storageId: uploaded?.[0].response.storageId });
    if (url) {
      setPhotoURL(url);
    }
  };
  const handleSignUp = async () => {
    setLoading(true);
    const password_hash = md5(passwordInput);
    try {
      const user = await createUser({
        password_hash,
        email: emailInput,
        username: usernameInput,
        photo: photoURL,
      });
      localStorage.setItem("latch-user", user);
      localStorage.setItem("latch-photo", photoURL);
      router.push("/");
    } catch (e) {
      setDanger(true);
    }
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.section}>
        <Link href="/">
          <Image src={logo} alt="logo" width={30} height={30} />
        </Link>
        <div className={styles.avatar}>
          Аватарка
          <UploadButton
            uploadUrl={generateUploadUrl}
            fileTypes={["image/*"]}
            onUploadComplete={saveAfterUpload}
            onUploadError={(error: unknown) => {
              alert(`ERROR! ${error}`);
            }}
          />
          {photoURL && (
            <img src={photoURL} alt="avatar" className={styles.avatar__img} />
          )}
        </div>
        <label className={styles.label}>
          <input
            tabIndex={0}
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Имя пользователя"
            className={styles.input}
          />
          {usernameInput && (
            <button
              className={styles.btn__relative}
              onClick={() => setUsernameInput("")}
            >
              <X size={12} />
            </button>
          )}
        </label>
        <label className={styles.label}>
          <input
            tabIndex={0}
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Адрес электронной почты"
            className={
              danger ? styles.input + " " + styles.danger : styles.input
            }
          />
          {emailInput && (
            <button
              className={styles.btn__relative}
              onClick={() => setEmailInput("")}
            >
              <X size={12} />
            </button>
          )}
        </label>
        <label className={styles.label}>
          <input
            tabIndex={0}
            type={passwordShow ? "text" : "password"}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Пароль"
            className={styles.input}
          />
          {passwordInput && (
            <button
              className={
                styles.btn__relative + " " + styles.btn__relative_double
              }
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
          )}
          {passwordInput && (
            <button
              className={styles.btn__relative}
              onClick={() => setPasswordInput("")}
            >
              <X size={12} />
            </button>
          )}
        </label>
        <label className={styles.label}>
          <input
            tabIndex={0}
            type={passwordShow2 ? "text" : "password"}
            value={passwordInput2}
            onChange={(e) => setPasswordInput2(e.target.value)}
            placeholder="Повторите пароль"
            className={styles.input}
          />
          {passwordInput2 && (
            <button
              className={
                styles.btn__relative + " " + styles.btn__relative_double
              }
              onClick={() => setPasswordShow2(!passwordShow2)}
            >
              {passwordShow2 ? <EyeOff size={12} /> : <Eye size={12} />}
            </button>
          )}
          {passwordInput2 && (
            <button
              className={styles.btn__relative}
              onClick={() => setPasswordInput2("")}
            >
              <X size={12} />
            </button>
          )}
        </label>
        {emailInput &&
        passwordInput &&
        usernameInput &&
        passwordInput === passwordInput2 &&
        loading ? (
          <Loader2 size={16} className={styles.loader} />
        ) : (
          <button className={styles.btn} onClick={handleSignUp} tabIndex={0}>
            Зарегистрироваться
          </button>
        )}

        <Link href="signin" className={styles.link}>
          Авторизация
        </Link>
      </div>
    </main>
  );
}
