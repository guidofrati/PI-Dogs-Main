import { Link } from "react-router-dom";
import styles from "./NotPath.module.css";

export default function NotPath() {
  return (
    <div className={styles.incorrect}>
      <img
        src="https://static.vecteezy.com/system/resources/previews/011/097/420/original/forbidding-sign-dog-walking-is-prohibited-free-vector.jpg"
        alt="page not found"
        width="300px"
        height="300px"
      />
      <h1>This is an incorrect path!</h1>
      <h3>Click here to teletransport where all dogs have fun</h3>
      <Link to="/">
        <button className={styles.btn}>Teleport</button>
      </Link>
    </div>
  );
}
