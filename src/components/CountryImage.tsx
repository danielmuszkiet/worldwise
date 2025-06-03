function getCountryCodeFromEmoji(emoji: string) {
  const countryCode = [...emoji]
    .map((char) => {
      const codePoint = char.codePointAt(0);
      return codePoint !== undefined ? String.fromCodePoint(codePoint - 0x1f1e6 + 65) : "";
    })
    .join("")
    .toLowerCase();

  return countryCode;
}

function getFlagImageUrlFromEmoji(flag: string, size: string) {
  const countryCode = getCountryCodeFromEmoji(flag);
  return `https://flagcdn.com/${size}/${countryCode}.png`;
}

type CountryImageProps = { countrycode: string; size: string; name: string };

function CountryImage({ countrycode, size, name }: CountryImageProps) {
  return (
    <img
      src={getFlagImageUrlFromEmoji(countrycode, size)}
      alt={`Flag of ${name}`}
      style={{ borderRadius: "3px" }}
      title={name}
    />
  );
}

export default CountryImage;
