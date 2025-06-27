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
    <div className="center">{gif.error}</div>
  ) : (
    <div className={styles.list}>
      {gif.data?.data.map((item, index) => (
        <Item key={item.id} data={item} position={index} />
      ))}
    </div>
  );
};

export default List;
