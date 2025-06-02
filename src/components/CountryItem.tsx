import CountryImage from "./CountryImage";

import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country: {
    name: string;
    id: string;
    emoji: string;
  };
};

function CountryItem({ country }: CountryItemProps) {
  const { emoji, name } = country;

  return (
    <li className={styles.countryItem}>
      <span>
        <CountryImage countrycode={emoji} size="w40" name={name} />
      </span>
      <span>{name}</span>
    </li>
  );
}

export default CountryItem;
