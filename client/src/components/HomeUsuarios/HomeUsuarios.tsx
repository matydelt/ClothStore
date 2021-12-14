import * as React from 'react'
import { Avatar, Box } from '@mui/material'
import "./HomeUsuarios.css"
import { TextField } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'
import CardPublicacion from '../HomePage/publicaciones/cardPublicaciones/cardPublicaciones'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store/store'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'
import NavBar from "../HomePage/Header/NavBar/NavBar"
import { logoutUser } from "../../redux/actions/userActions";
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth'

interface FormUserInterface {
    photo: string;
    phone: string;
    email: string;
    name: {
        firstName: string,
        lastName: string
    };
    dni: string;
    calle: string;
    numero: string;
    ciudad: string;
    cp: string;
    publications: any[];
    shopping: any[];
}
// interface Props {
//     name: string;
//     images: any[];
//     stock: number;
//     mark: string;
//     detail: string;
//     price: number;
//     categorie: string;
//     author: string;
//     gender: string;
//     key: string;
// }
export default function HomeUsuarios() {
    const [flag, setFlag] = React.useState(true)
    const user = useSelector((state: RootState) => state.userSignin.userInfo)
    const [name, setName] = React.useState<Name>({
        firstName: "",
        lastName: ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();

    type Name = { firstName: string, lastName: string }
    const [input, setInput] = React.useState<FormUserInterface>({
        photo: "",
        phone: "",
        email: "",
        name: {
            firstName: "",
            lastName: "",
        },
        dni: "",
        calle: "",
        numero: "",
        ciudad: "",
        cp: "",
        publications: [],
        shopping: []
    });
    useEffect(() => {
        async function getOneUser() {
            await axios.get(`/auth/${user?._id}`).then(({ data }) => {
                setInput({ ...input, ...data })
                setName(data.name)
            })
        }
        getOneUser()
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.name === "firstName") {

            setName({ ...name, [e.target.name]: e.target.value });
        } else if (e.target.name === "lastName") {
            setName({ ...name, lastName: e.target.value });
        } else {
            setInput({ ...input, [e.target.name]: e.target.value });
        }
    };
    function handleClickEdit(e: React.SyntheticEvent) {
        e.preventDefault()
        console.log(input)
    }
    function logout() {
        dispatch(logoutUser());
        auth.signout();
        navigate('/login')
    }
    return (
        <Box style={{ display: "flex", flexDirection: "column" }}>

            <Box>
                <NavBar></NavBar>
                <Box component="form" className="form-home-usuario">

                    <button onClick={logout}>Logout</button>

                    <label>Mis Datos</label>
                    <Avatar alt={input?.photo ? input.photo : input?.name.firstName[0]} className="avatar-usuario">{input.name.firstName[0]} </Avatar>

                    <legend>Datos de la Cuenta</legend>
                    <div className="div-field">
                        <TextField
                            name='phone'
                            disabled={flag}
                            label="Teléfono:"
                            value={input.phone}
                            onChange={handleChange}
                        />
                        <TextField
                            disabled
                            label="E-mail:"
                            value={input.email}
                            onChange={handleChange}
                        />
                    </div>


                    <legend>Datos personales</legend>
                    <div className="div-field">
                        <TextField
                            name='firstName'
                            disabled={flag}
                            label="Nombre:"
                            value={name.firstName}
                            onChange={handleChange}
                        />

                        <TextField
                            name='lastName'
                            disabled={flag}
                            label="Apellido:"
                            value={name.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="div-field">
                        <TextField
                            name='dni'
                            disabled={flag}
                            label="DNI:"
                            value={input.dni}
                            onChange={handleChange}
                        />
                    </div>

                    <legend>Domicilio</legend>
                    <div className="div-field">
                        <TextField
                            name='calle'
                            disabled={flag}
                            label="Calle:"
                            value={input.calle}
                            onChange={handleChange}
                        />

                        <TextField
                            name='numero'

                            disabled={flag}
                            label="Número:"
                            value={input.numero}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="div-field">
                        <TextField
                            name='ciudad'
                            disabled={flag}
                            label="Ciudad:"
                            value={input.ciudad}
                            onChange={handleChange}
                        />

                        <TextField
                            name='cp'
                            disabled={flag}
                            label="Código postal:"
                            value={input.cp}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button onClick={handleClickEdit}>guardar</button>
                        <button onClick={(e) => { e.preventDefault(); setFlag(!flag) }}>editar</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Link to="/nueva-publicacion">

                            <button>Publica!</button>
                        </Link>
                    </div>
                </Box>
                <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <h3>Publicaciones</h3>
                    </div>
                    {input.publications.length > 0 ?
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre de articulo</TableCell>
                                        <TableCell align="right">Marca</TableCell>
                                        <TableCell align="right">Categoria</TableCell>
                                        <TableCell align="right">Genero</TableCell>
                                        <TableCell align="right">Precio</TableCell>
                                        <TableCell align="right">#</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {input.publications.map((e) => (

                                        <TableRow
                                            key={e.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {e.name}
                                            </TableCell>
                                            <TableCell align="right">{e.mark}</TableCell>
                                            <TableCell align="right">{e.category}</TableCell>
                                            <TableCell align="right">{e.gender}</TableCell>
                                            <TableCell align="right">{e.price}</TableCell>
                                            <TableCell align="right"> <Link to={`/actualizar-publicacion/${e._id}`}><button>Actualizar</button></Link></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        :
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <h4>No se han realizado publicaciones</h4>
                        </div>
                    }
                </div>
                <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <h3>Compras</h3>
                    </div>
                    {input.shopping.length > 0 ?
                        input.shopping.map((e) => { return (<CardPublicacion id={e._id} name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} />) }) :
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <h4>No se han realizado Compras</h4>
                        </div>
                    }
                </div>
            </Box>
        </Box>)
}
