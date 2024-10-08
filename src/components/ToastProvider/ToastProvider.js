import React, { useCallback } from "react";
import ToastShelf from "../ToastShelf";
import { useKeydown } from "../../hooks/useKeydown";

export const ToastContext = React.createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const onEscape = useCallback(() => {
    setToasts([]);
  }, []);

  useKeydown("Escape", onEscape);

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
