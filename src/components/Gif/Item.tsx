import styles from "../../styles/components/card/item.module.scss";
import Locked from "../../assets/locked.svg";
import Unlocked from "../../assets/unlocked.svg";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import type { IGif } from "@giphy/js-types";
import { save, remove } from "../../redux/slices/gifSlice";

interface Item {
  data: IGif;
  position: number;
}

const Item = ({ data, position }: Item) => {
  const gif = useAppSelector((state) => state.gif);
  const dispatch = useAppDispatch();

  const isSaved = () => {
    return gif.savedData.find((item) => item.position == position);
  };

  return (
    <div className={styles.item_wrapper}>
      <button
        className={styles.lock_wrapper}
        onClick={() => {
          if (isSaved()) {
            dispatch(remove(position));
          } else {
            dispatch(save({ position, data }));
          }
        }}
      >
        {isSaved() ? (
          <img className={styles.lock} src={Locked} alt="Locked" />
        ) : (
          <img className={styles.lock} src={Unlocked} alt="Unlocked" />
        )}
      </button>
      <div className={styles.item}>
        <img
          className={styles.image}
          src={data.images.fixed_width.url}
          alt={data.alt_text || "GIF Image"}
        />
        <div className={styles.date}>
          {new Date(data.import_datetime).toISOString().split("T")[0]}
        </div>
        <div className={styles.title}>{data.title}</div>
      </div>
    </div>
  );
};

export default Item;
