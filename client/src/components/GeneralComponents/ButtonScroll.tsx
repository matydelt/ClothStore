interface Props {
  idScroll: string;
  text: string;
  nameClass?: string;
}

const ButtonScroll = ({ idScroll, text, nameClass }: Props) => {
  return (
    <>
      <a
        className={nameClass}
        style={{ fontSize: "25px", textDecoration: "none", color: "#00c2cb" }}
        href={idScroll}
      >
        {text}
      </a>
    </>
  );
};

export default ButtonScroll;
