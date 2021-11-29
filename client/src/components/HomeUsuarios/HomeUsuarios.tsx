import * as React from 'react'
import { Avatar, Box } from '@material-ui/core'
import "./HomeUsuarios.css"
import { Badge, Card, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'
import CardPublicacion from '../HomePage/publicaciones/cardPublicaciones/cardPublicaciones'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'


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
    const user = useSelector((state: RootState) => state.userSignin.userInfo)
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
            await axios.get(`http://localhost:3001/auth/${user?._id}`).then(({ data }) => setInput({ ...input, ...data }))
        }
        getOneUser()
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    function handleClickEdit(e: React.SyntheticEvent) {
        e.preventDefault()
        console.log(input)
    }
    return (
        <Box>
            <Box component="form" className="form-home-usuario">

                <label>Mis Datos</label>
                <Avatar alt={input?.photo ? input.photo : input?.name.firstName[0]} className="avatar-usuario">{input.name.firstName[0]} </Avatar>

                <legend>Datos de la Cuenta</legend>
                <div className="div-field">
                    <TextField
                        disabled
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
                        disabled
                        label="Nombre:"
                        value={input.name.firstName}
                        onChange={handleChange}
                    />

                    <TextField
                        disabled={true}
                        label="Apellido:"
                        value={input.name.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-field">
                    <TextField
                        disabled
                        label="DNI:"
                        value={input.dni}
                        onChange={handleChange}
                    />
                </div>

                <legend>Domicilio</legend>
                <div className="div-field">
                    <TextField
                        disabled
                        label="Calle:"
                        value={input.calle}
                        onChange={handleChange}
                    />

                    <TextField
                        disabled
                        label="Número:"
                        value={input.numero}
                        onChange={handleChange}
                    />
                </div>
                <div className="div-field">
                    <TextField
                        disabled
                        label="Ciudad:"
                        value={input.ciudad}
                        onChange={handleChange}
                    />

                    <TextField
                        disabled
                        label="Código postal:"
                        value={input.cp}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button onClick={handleClickEdit}>guardar</button>
                    <button onClick={handleClickEdit}>editar</button>
                </div>
            </Box>
            <div>
                <h3>Publicaciones</h3>
                {input.publications.length > 0 ?
                    input.publications.map((e) => { return (<CardPublicacion id={e._id} name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} />) }) :
                    <h4>No se han realizado publicaciones</h4>}
            </div>
            <div>
                <h3>Compras</h3>
                {input.shopping.length > 0 ?
                    input.shopping.map((e) => { return (<CardPublicacion id={e._id} name={e.name} author={e.author} images={e.images} mark={e.mark} stock={e.stock} price={e.price} categorie={e.categorie} detail={e.detail} gender={e.gender} key={e._id} />) }) :
                    <h4>No se han realizado Compras</h4>}
            </div>
        </Box>)
}
