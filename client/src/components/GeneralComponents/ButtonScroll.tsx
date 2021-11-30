import React from 'react'


interface Props {
    idScroll: string,
    text: string,
    nameClass?: string
}


const ButtonScroll: React.FC<Props> = ({ idScroll, text, nameClass }) => {
    return (
        <>
            <a className={nameClass} style={{fontSize: '25px', textDecoration: 'none', color: '#00c2cb'}} href={idScroll}>{text}</a>
        </>
    )
}

export default ButtonScroll
