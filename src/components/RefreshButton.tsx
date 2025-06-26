import styles from "../styles/components/refresh-button.module.scss";
import RefreshIcon from "../assets/refresh.svg";
import { fetchGifs } from "../redux/slices/gifSlice";
import { useAppDispatch } from "../redux/store";
import { useEffect } from "react";

const RefreshButton = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == " ") {
        event.preventDefault();
        dispatch(fetchGifs());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <button className={styles.button} onClick={() => dispatch(fetchGifs())}>
      <img className={styles.icon} src={RefreshIcon} alt="Refresh icon" />
      <span className={styles.text}>
        Hit here to refresh gifs or press space
      </span>
    </button>
  );
};

export default RefreshButton;
