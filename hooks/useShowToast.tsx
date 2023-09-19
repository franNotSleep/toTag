import { resolveObjectURL } from "buffer";
import { useState } from "react";

type ToastType = {
  message: string;
  showSuccessToast: boolean;
  showFailToast: boolean;
};

type SetToastType = React.Dispatch<React.SetStateAction<ToastType>>;

const initialState: ToastType = {
  message: "",
  showFailToast: false,
  showSuccessToast: false,
};

export default function useShowToast(seconds: number) {
  const [toast, setToast] = useState<ToastType>(initialState);
  let message = "";

  function setToastMessage(text: string): void {
    message = text;
  }

  async function showSuccessToast() {
    setToast({ ...toast, showSuccessToast: true, message });
    await hideToast(toast, setToast, seconds);
  }

  async function showFailToast() {
    setToast({ ...toast, showFailToast: true, message });
    await hideToast(toast, setToast, seconds);
  }

  return {
    setToastMessage,
    showFailToast,
    showSuccessToast,
    toast,
  };
}

function hideToast(toast: ToastType, setToast: SetToastType, seconds: number) {
  return new Promise(() => {
    setTimeout(() => {
      setToast({ ...toast, showSuccessToast: false, showFailToast: false });
    }, seconds * 1000);
  });
}
