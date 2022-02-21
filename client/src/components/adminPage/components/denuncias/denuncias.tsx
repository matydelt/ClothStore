/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import { Box } from "@mui/material";
import { useEffect, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import ENavBar from "../../employeeNavBar";
import NavBar from "../../navBar";
import { Link, Navigate } from "react-router-dom";
import "./denuncias.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  deleteDenunciations,
  getDenunciations,
  putDenunciations,
} from "../../../../redux/actions/denunciationActions";
import { publicationMessage } from "../../../../redux/actions/publicationActions";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const Denuncias = () => {
  const dispatch = useDispatch();
  const { userSignin, denunciation } = useAppSelector((state) => state);
  const { userInfo } = userSignin;
  const denuncias = denunciation.denunciations;

  useEffect(() => {
    dispatch(getDenunciations());
  }, [dispatch]);

  if (userSignin.loading === false) {
    if (
      userSignin.userInfo?.type !== "admin" &&
      userSignin.userInfo?.type !== "employee"
    ) {
      return <Navigate to="/" />;
    }
  } else {
    if (userSignin.loading === true) {
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

  async function estimar(e: SyntheticEvent<EventTarget>, id: string) {
    e.preventDefault();
    try {
      await dispatch(putDenunciations(id));
      await dispatch(
        publicationMessage(
          id,
          "su publicacion fue denunciada, y quedara desactivada hasta que la modifique y vuelva a ser aprobada"
        )
      );
      await dispatch(getDenunciations());
    } catch (e) {
      console.log(e);
    }
  }
  async function desestimar(e: SyntheticEvent<EventTarget>, id: string) {
    e.preventDefault();
    try {
      await dispatch(deleteDenunciations(id));
      await dispatch(getDenunciations());
    } catch (e) {
      console.log(e);
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
          <p className="one">infractor</p>
          <p className="two">Autor de la denuncia</p>
          <p className="three">Procedimiento</p>
          <p className="four">detalle</p>
          <p className="four">Publicacion Denunciada</p>
        </Box>
        {!!denuncias?.find((d) => d.denunciation.state === false) &&
        denuncias?.length > 0 ? (
          denuncias?.map((e) => {
            const { denunciation, infractor, author, publication } = e;
            // console.log(infractor)
            // console.log(author)
            if (!denunciation.state) {
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
                    <p>
                      {infractor.name.firstName + " " + infractor.name.lastName}
                    </p>
                    <p>{infractor.email}</p>
                    <p>denuncias actuales: {infractor.denunciations.length}</p>
                  </div>
                  <div className="two">
                    <p>{author.name.firstName + " " + author.name.lastName}</p>
                    <p>{author.email}</p>
                  </div>
                  <div
                    className="three"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ display: "flex", justifyContent: "initial" }}>
                      <button
                        className="estimarButton"
                        onClick={(e: SyntheticEvent<EventTarget>) =>
                          estimar(e, denunciation._id)
                        }
                      >
                        estimar
                      </button>
                    </div>

                    <div style={{ display: "flex", justifyContent: "initial" }}>
                      <button
                        className="desestimarButton"
                        onClick={(e: SyntheticEvent<EventTarget>) =>
                          desestimar(e, denunciation._id)
                        }
                      >
                        desestimar
                      </button>
                    </div>
                  </div>
                  <div className="three">
                    <p
                      style={{
                        backgroundColor: "gray",
                        width: "60%",
                        borderRadius: "10px",
                        padding: "4px",
                        color: "white",
                      }}
                    >
                      {denunciation.message}
                    </p>
                  </div>
                  <Link
                    to={`/publication/${publication._id}`}
                    target={"_blank"}
                    className="four"
                    style={{ color: "black" }}
                  >
                    <RemoveRedEyeIcon />
                    Ver
                  </Link>
                </div>
              );
            } else {
              return <div></div>;
            }
          })
        ) : (
          <div style={{ marginTop: "20px", color: "gray" }}>
            No hay denuncias nuevas
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Denuncias;
