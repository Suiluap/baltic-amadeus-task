import { useEffect } from "react";
import styles from "../../styles/components/card/list.module.scss";
import Item from "./Item";
import { fetchGifs } from "../../redux/slices/gifSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const List = () => {
  const gif = useAppSelector((state) => state.gif);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGifs());
  }, [dispatch]);

  return gif.loading ? (
    <div className="center">Loading...</div>
  ) : gif.error ? (
    <div className="center">Error: {gif.error}</div>
  ) : (
    <div className={styles.list}>
      {gif.data?.data.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          date={new Date(item.import_datetime).toISOString().split("T")[0]}
          image={{
            alt: item.alt_text || "GIF Image",
            url: item.images.fixed_width.url,
          }}
        />
      ))}
    </div>
  );
};

export default List;
