/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { Box } from "@mui/material";
import { useEffect, useState, SyntheticEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { getUsers } from "../../../../redux/actions/userActions";
import { Publication } from "../../../../redux/types";
import ENavBar from "../../employeeNavBar";
import NavBar from "../../navBar";
import { Link, Navigate } from "react-router-dom";
import "./publicaciones.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  activatePublication,
  getAllPublications,
  publicationMessage,
} from "../../../../redux/actions/publicationActions";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const PublicacionesAdmPage = () => {
  const dispatch = useDispatch();
  const { userSignin, publicationList } = useAppSelector((state) => state);
  const { userInfo } = userSignin;
  const publications = publicationList.publicationsAdm;
  const [mensaje, setMensaje] = useState("");
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllPublications());
  }, [dispatch]);

  if (!userInfo?.type) return <div></div>;
  // console.log(publications);

  async function HandlerSubmit(e: SyntheticEvent<EventTarget>, id: string) {
    e.preventDefault();
    await dispatch(publicationMessage(id, mensaje));
    await dispatch(getAllPublications());
  }

  if (userSignin.loading === false) {
    if (
      userSignin.userInfo?.type !== "admin" &&
      userSignin.userInfo?.type !== "employee"
    ) {
      return <Navigate to="/" />;
    }
  } else {
    if (userSignin?.loading === true) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HourglassEmptyIcon />
        </div>
      );
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <Box>
      {userInfo?.type === "admin" ? <NavBar></NavBar> : <ENavBar></ENavBar>}
      <Box className="box-usuarios">
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            borderBottom: "black solid 1px",
            justifyContent: "initial",
            width: "70%",
          }}
          className="box"
        >
          <p className="one">#</p>
          <p className="two">marca</p>
          <p className="three">Activar</p>
          <p className="four">detalle</p>
          <p className="four">ver</p>
        </Box>
        {publications.length > 0 ? (
          publications.map((e: Publication) => {
            return (
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  borderBottom: "#e6e6e6 solid 1px",
                  justifyContent: "initial",
                  width: "70%",
                  alignItems: "center",
                }}
              >
                <div className="one">
                  <img
                    src={e.images[0].url}
                    alt="no se encontro img"
                    style={{ width: "100px" }}
                  ></img>
                </div>
                <div className="two">
                  <p>{e.mark}</p>
                </div>
                <div
                  className="three"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {flag ? (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "initial",
                          marginBottom: "2px",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "initial",
                          marginBottom: "2px",
                        }}
                      >
                        <button
                          className="rechazar"
                          onClick={() => setFlag(!flag)}
                        >
                          RECHAZAR
                        </button>
                      </div>{" "}
                      <div
                        style={{ display: "flex", justifyContent: "initial" }}
                      >
                        <input
                          type="button"
                          value={"ACEPTAR"}
                          className="aceptar"
                          style={{ display: "flex", justifyContent: "center" }}
                          onClick={async () => {
                            await dispatch(activatePublication(e._id, true));
                            await dispatch(getAllPublications());
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={(k: SyntheticEvent<EventTarget>) =>
                        HandlerSubmit(k, e._id)
                      }
                      style={{ marginTop: "3px", marginBottom: "3px" }}
                    >
                      <div
                        style={{ display: "flex", justifyContent: "initial" }}
                      >
                        <textarea
                          style={{
                            minWidth: "90%",
                            resize: "none",
                            minHeight: "80px",
                          }}
                          className="text"
                          onChange={(
                            e: ChangeEvent<HTMLTextAreaElement>
                          ): any => setMensaje(e.target.value)}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "3px",
                        }}
                      >
                        <input
                          type={"submit"}
                          value="ENVIAR"
                          className="aceptar"
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "3px",
                        }}
                      >
                        <input
                          type={"button"}
                          className="rechazar"
                          value={"SALIR"}
                          onClick={() => setFlag(!flag)}
                        />
                      </div>
                    </form>
                  )}
                </div>
                <div className="four">
                  <div
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#3562",
                      width: "50%",
                      height: "50%",
                      padding: "3px",
                    }}
                  >
                    <p>{e.detail}</p>
                  </div>
                </div>
                <div className="four">
                  <Link to={`/publication/${e._id}`} target={"_blank"}>
                    <RemoveRedEyeIcon sx={{ color: "black" }} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ marginTop: "20px", color: "gray" }}>
            No hay publicaciones nuevas
          </div>
        )}
      </Box>
    </Box>
  );
};

export default PublicacionesAdmPage;
