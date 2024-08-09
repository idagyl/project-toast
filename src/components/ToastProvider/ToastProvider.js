import React, { useEffect } from "react";
import ToastShelf from "../ToastShelf";

export const ToastContext = React.createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEffect(() => {
    const handleKeyDownEvent = (event) => {
      if (event.key === "Escape") {
        setToasts([]);
      }
    };

    window.addEventListener("keydown", handleKeyDownEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, []);

  const addToast = (message, variant) => {
    setToasts([...toasts, { id: crypto.randomUUID(), message, variant }]);
  };

  const dismissToast = (id) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      <ToastShelf />
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { addToast } = context;
  return { addToast };
};
