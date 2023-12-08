"use client";
import React from "react";
import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Search, Sun, SunMoon } from "lucide-react";
import { toast } from "sonner";
import Modal from "@/components/Modal";
export default function Header() {
  const [openModal, setOpenModal] = React.useState(false);
  const { theme, setTheme } = useTheme();
  return (
    <>
      <header className="flex justify-between  p-4 rounded-lg bg-white dark:bg-black border border-gray-100 dark:border-zinc-900 items-center fixed left-4 right-4 top-4">
        <div>123</div>
        <Link href="/">
          <Image src={logo} alt="logo" width={30} height={30} />
        </Link>
        <div>
          <button
            className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900"
            onClick={() => {
              let newTheme = "";
              let messageTheme = "";
              if (theme === "system") {
                messageTheme = "темную тему";
                newTheme = "dark";
              } else if (theme === "dark") {
                messageTheme = "светлую тему";
                newTheme = "light";
              } else {
                messageTheme = "системную тему";
                newTheme = "system";
              }
              toast.info("Цветовая тема изменилась на " + messageTheme);
              setTheme(newTheme);
            }}
          >
            <SunMoon size={16} />
          </button>
          <button
            className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900"
            onClick={() => setOpenModal(true)}
          >
            <Search size={16} />
          </button>
        </div>
      </header>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </>
  );
}
