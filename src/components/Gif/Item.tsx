import styles from "../../styles/components/card/item.module.scss";
// import Locked from "../../assets/locked.svg";
import Unlocked from "../../assets/unlocked.svg";

interface Gif {
  title: string;
  date: string;
  image: {
    alt: string;
    url: string;
  };
}

const Item = ({ title, date, image }: Gif) => {
  return (
    <div className={styles.item_wrapper}>
      <button className={styles.lock_wrapper}>
        <img className={styles.lock} src={Unlocked} alt="Unlocked" />
      </button>
      <div className={styles.item}>
        <img className={styles.image} src={image.url} alt={image.alt} />
        <div className={styles.date}>{date}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default Item;
