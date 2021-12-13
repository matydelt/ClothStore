import * as React from "react";
import { Link } from "react-router-dom";

type Props = {
  link: string;
  text: string;
  nameClass?: string;
};

export default function ButtonsNav({ link, text, nameClass }: Props) {
  return (
    <>
      <Link className={nameClass} to={link}>
        {text}
      </Link>
    </>
  );
}
