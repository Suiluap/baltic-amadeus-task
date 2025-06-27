import styles from "../styles/components/refresh-button.module.scss";
import RefreshIcon from "../assets/refresh.svg";
import { fetchGifs } from "../redux/slices/gifSlice";
import { useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

const RefreshButton = () => {
  const dispatch = useAppDispatch();

  const debounceFetchGifs = useDebouncedCallback(() => {
    dispatch(fetchGifs());
  }, 300);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key == " ") {
        debounceFetchGifs();
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == " ") {
        event.preventDefault();
      }
    };
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [debounceFetchGifs]);

  return (
    <button className={styles.button} onClick={debounceFetchGifs}>
      <img className={styles.icon} src={RefreshIcon} alt="Refresh icon" />
      <span className={styles.text}>
        Hit here to refresh gifs or press space
      </span>
    </button>
  );
};

export default RefreshButton;
