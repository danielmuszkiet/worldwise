import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country: {
    name: string;
    id: number;
    emoji: string;
  };
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.name}</span>
    </li>
  );
}

export default CountryItem;
