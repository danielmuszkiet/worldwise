import styles from "./Message.module.css";

function Message({ message }: { message: string }) {
  return <p className={styles.message}>{message}</p>;
}

export default Message;
