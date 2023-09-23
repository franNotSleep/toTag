import { resolveObjectURL } from "buffer";
import { fsync } from "fs";
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

  async function showToast(condition: boolean, message: string) {
    if (condition) {
      await showSuccessToast(message);
    } else {
      await showFailToast(message);
    }
  }

  async function showSuccessToast(message: string) {
    setToast({ ...toast, showSuccessToast: true, message });
    await hideToast(toast, setToast, seconds);
  }

  async function showFailToast(message: string) {
    setToast({ ...toast, showFailToast: true, message });
    await hideToast(toast, setToast, seconds);
  }

  return {
    toast,
    showToast,
  };
}

function hideToast(toast: ToastType, setToast: SetToastType, seconds: number) {
  return new Promise(() => {
    setTimeout(() => {
      setToast({ ...toast, showSuccessToast: false, showFailToast: false });
    }, seconds * 1000);
  });
}
