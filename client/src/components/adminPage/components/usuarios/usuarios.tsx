import { Box } from "@mui/material";
import React, { useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import {
  bannUser,
  getUsers,
  setEmployee,
} from "../../../../redux/actions/userActions";
import { User } from "../../../../redux/reducer/stateTypes";
import NavBar from "../../navBar";
import "./usuario.css";
import { Denunciation } from "../../../../redux/reducer/denunciationReducers";
import { Navigate } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const UsuariosAdmPage = () => {
  const dispatch = useDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { userSignin } = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getUsers());
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

  return (
    <Box>
      <NavBar></NavBar>
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
          <p className="one">Nombre</p>
          <p className="two">Email</p>
          <p className="three">Activo</p>
          <p className="four">Empleado</p>
          <p className="four">denuncias</p>
        </Box>
        {users?.map((e: User) => {
          let flag = e.active;
          let flagEmploye = e.type === "employee";
          return (
            <div className="card-usuario box">
              <div className="one">
                <p>
                  {e.name.firstName} {e.name.lastName}
                </p>
              </div>
              <div className="two">
                <p>{e.email}</p>
              </div>
              <div className="three">
                {e.type !== "admin" ? (
                  <input
                    type={"checkbox"}
                    defaultChecked={e.active}
                    onChange={(k: ChangeEvent) => {
                      dispatch(bannUser(e._id, !flag));
                      flag = !flag;
                    }}
                  />
                ) : (
                  <div>Admin</div>
                )}
              </div>
              <div className="four">
                {e.type !== "admin" ? (
                  <input
                    type={"checkbox"}
                    defaultChecked={e.type === "employee"}
                    onChange={(k: ChangeEvent) => {
                      dispatch(setEmployee(e._id, !flagEmploye));
                      flagEmploye = !flagEmploye;
                    }}
                  />
                ) : (
                  <div>Admin</div>
                )}
              </div>
              <div className="four">
                <div
                  style={{
                    backgroundColor: "gray",
                    color: "white",
                    borderRadius: "5px",
                    padding: "5px",
                    width: "100%",
                    marginBottom: "3px",
                    overflow: "auto",
                    height: "100px",
                  }}
                >
                  <p>cantidad de denuncias: {e.denunciations.length}</p>
                  {e.denunciations.length !== 0 ? (
                    <div>
                      <p> mensajes:</p>
                      <hr></hr>
                      {e.denunciations.map((k: Denunciation, index) => {
                        return (
                          <div>
                            <p>{k.message}</p>
                            {index !== e.denunciations.length - 1 ? (
                              <hr></hr>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default UsuariosAdmPage;
