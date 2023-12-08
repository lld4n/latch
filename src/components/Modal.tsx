import React from "react";

export default function Modal({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 right-0 min-h-full">
      <div className="bg-white z-10 w-[300px]">letsgo</div>
      <div
        className="min-h-full w-full  bg-black dark:bg-white absolute opacity-20 top-0 right-0 left-0 overflow-hidden cursor-pointer z-9"
        onClick={() => setOpenModal(false)}
      />
    </div>
  );
}
