"use client";
import Link from "next/link";
import React from "react";
import logo from "../../../assets/logo.svg";
import Image from "next/image";
import styles from "./signin.module.scss";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import md5 from "md5";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const getUser = useMutation(api.users.getUser);
  const router = useRouter();
  const sign = async () => {
    setLoading(true);
    const password_hash = md5(passwordInput);
    const user = await getUser({
      email: emailInput,
    });

    if (user) {
      if (user.length === 1) {
        if (user[0].password_hash === password_hash) {
          localStorage.setItem("latch-user", user[0]._id);
          router.push("/");
        } else {
          setDanger(true);
        }
      } else {
        setDanger(true);
      }
    } else {
      setDanger(true);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (danger) {
      setTimeout(() => {
        setDanger(false);
      }, 4000);
    }
  }, [danger]);

  return (
    <main className={styles.main}>
      <div className={styles.section}>
        <Link href="/">
          <Image src={logo} alt="logo" width={30} height={30} />
        </Link>
        <label className={styles.label}>
          <input
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
            type={passwordShow ? "text" : "password"}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Пароль"
            className={
              danger ? styles.input + " " + styles.danger : styles.input
            }
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
        {emailInput && passwordInput && loading ? (
          <Loader2 size={16} className={styles.loader} />
        ) : (
          <button className={styles.btn} onClick={sign}>
            Войти
          </button>
        )}

        <Link href="signup" className={styles.link}>
          Регистрация
        </Link>
      </div>
    </main>
  );
}
