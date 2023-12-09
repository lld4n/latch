import Link from 'next/link';
import React from 'react';
import logo from '../../../assets/logo.svg';
import Image from 'next/image';
export default function SignIn() {
  return (
    <main className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-10 w-[300px]">
        <Link href="/">
          <Image src={logo} alt="logo" width={30} height={30} />
        </Link>
        <input
          type="email"
          placeholder="Адрес электронной почты"
          className="flex h-10 w-full outline-none text-center border-b-2 bg-transparent dark:placeholder:text-zinc-700 dark:border-zinc-900 focus:border-black dark:focus:border-white"
        />
        <input
          type="password"
          placeholder="Пароль"
          className="flex h-10 w-full outline-none text-center border-b-2 bg-transparent dark:placeholder:text-zinc-700 dark:border-zinc-900 focus:border-black dark:focus:border-white"
        />
        <button className="flex justify-center items-center px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900">
          Войти
        </button>
        <Link href="signup" className="text-sm text-blue-600">
          Регистрация
        </Link>
      </div>
    </main>
  );
}
