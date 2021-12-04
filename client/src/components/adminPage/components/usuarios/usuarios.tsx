import { Box } from "@mui/material"
import { Avatar, Table, TableBody } from "material-ui"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { bannUser, getUsers, setEmployee } from "../../../../redux/actions/userActions"
import { User } from "../../../../redux/reducer/stateTypes"
import { DefaultRootState } from "../../../../redux/types"
import NavBar from "../../navBar"
import "./usuario.css"

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
                        </div>)
                    })
                }
            </Box>

        </Box >
    )
}

export default UsuariosAdmPage
{/* <table>
    <tbody>
        <thead>
            <th>Nombre</th>
            <th>Email</th>
            <th>Activado</th>
            <th>Es empleado</th>
        </thead>
        {
            users?.map((e: User) => {
                let flag = e.active
                let flagEmploye = (e.type === "employee")
                return (
                    <tr><td>{e.name.firstName} {e.name.lastName}</td>
                        <td>{e.email}</td>
                        {e.type !== "admin" ?
                            <td><input type={"checkbox"} defaultChecked={e.active} onChange={(k: React.ChangeEvent) => { dispatch(bannUser(e._id, !flag)); flag = !flag }} /></td> :
                            <td></td>
                        }
                        {e.type !== "admin" ?
                            <td><input type={"checkbox"} defaultChecked={e.type === "employee"} onChange={(k: React.ChangeEvent) => { dispatch(bannUser(e._id, !flagEmploye)); flagEmploye = !flagEmploye }} /></td> :
                            <td></td>
                        }
                    </tr>
                )
            })
        }
    </tbody>
</table> */}