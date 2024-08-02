import React from "react";
import { createPortal } from "react-dom";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider";

function ToastShelf() {
  const { toasts, dismissToast } = React.useContext(ToastContext);
  return createPortal(
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            variant={toast.variant}
            onDismiss={() => dismissToast(toast.id)}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>,
    document.querySelector("#toast-shelf")
  );
}

export default ToastShelf;
