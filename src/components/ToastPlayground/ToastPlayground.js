import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import Toast from "../Toast";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const INITIAL_VARIANT = VARIANT_OPTIONS[0];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(INITIAL_VARIANT);
  const [toastList, setToastList] = React.useState([]);

  const onDismiss = (toast) => {
    setToastList(toastList.filter((t) => t.id !== toast.id));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setToastList([...toastList, { id: crypto.randomUUID(), message, variant }]);
    setMessage("");
    setVariant(INITIAL_VARIANT);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toastList} onDismiss={onDismiss} />

      <form className={styles.controlsWrapper} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              required
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label key={option} htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  checked={option === variant}
                  onChange={() => setVariant(option)}
                  value={option}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
