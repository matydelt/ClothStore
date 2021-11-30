import React from "react";
import { Link } from "react-router-dom";

interface Props {
    link: string,
    text: string,
    nameClass?: string
}

const ButtonsNav: React.FC<Props> = ({ link, text, nameClass}) => {
    return (
        <>
            <Link
                className={nameClass}
                to={link}
            >
                {text}
            </Link>
        </>
    )
}

export default ButtonsNav;
