import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { bannUser, getUsers, setEmployee } from "../../../../redux/actions/userActions"
import { User } from "../../../../redux/reducer/stateTypes"
import { DefaultRootState } from "../../../../redux/types"
import NavBar from "../../navBar"
import "./usuario.css"
import CloseIcon from '@mui/icons-material/Close';
import { Denunciation } from "../../../../redux/reducer/denunciationReducers"
const UsuariosAdmPage = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: DefaultRootState) => state)
    const users = state.users.users

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    return (
        <Box>
            <NavBar></NavBar>
            <Box className="box-usuarios">
                <Box sx={{ flexDirection: "row", display: "flex", borderBottom: "black solid 1px", justifyContent: "initial", width: "70%" }} className="box">
                    <p className="one">Nombre</p>
                    <p className="two">Email</p>
                    <p className="three">Activo</p>
                    <p className="four">Empleado</p>
                    <p className="four">denuncias</p>
                </Box>
                {
                    users?.map((e: User) => {
                        let flag = e.active
                        let flagEmploye = (e.type === "employee")
                        return (<div className="card-usuario box">
                            <div className="one" >
                                <p>{e.name.firstName} {e.name.lastName}</p>
                            </div>
                            <div className="two" >
                                <p>{e.email}</p>
                            </div>
                            <div className="three" >
                                {e.type !== "admin" ?
                                    <input type={"checkbox"} defaultChecked={e.active} onChange={(k: React.ChangeEvent) => { dispatch(bannUser(e._id, !flag)); flag = !flag }} />
                                    :
                                    <div>Admin</div>

                                }
                            </div>
                            <div className="four">

                                {e.type !== "admin" ?

                                    <input type={"checkbox"} defaultChecked={e.type === "employee"} onChange={(k: React.ChangeEvent) => { dispatch(setEmployee(e._id, !flagEmploye)); flagEmploye = !flagEmploye }} />
                                    :
                                    <div>Admin</div>
                                }
                            </div>
                            <div className="four" >
                                <div style={{ backgroundColor: "gray", color: "white", borderRadius: "5px", padding: "5px", width: "100%", marginBottom: "3px", overflow: "auto", height: "100px" }}>

                                    <p>cantidad de denuncias: {e.denunciations.length}</p>{e.denunciations.length !== 0 ?
                                        (<div>
                                            <p> mensajes:</p>
                                            <hr></hr>
                                            {
                                                e.denunciations.map((k: Denunciation, index: Number) => {
                                                    return (<div><p>{k.message}</p>{index !== e.denunciations.length - 1 ?
                                                        <hr></hr> :
                                                        <div></div>
                                                    }
                                                    </div>)
                                                })
                                            }</div>
                                        ) :
                                        <div></div>
                                    }
                                </div>
                            </div>

                        </div>)
                    })
                }
            </Box>

        </Box >
    )
}

export default UsuariosAdmPage
