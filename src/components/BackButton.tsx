import { useNavigate } from "react-router";

import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      children="< Back"
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    />
  );
}

export default BackButton;
