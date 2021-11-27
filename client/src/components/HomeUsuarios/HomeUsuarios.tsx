import * as React from 'react'
import { Avatar,Box} from '@material-ui/core'
import "./HomeUsuarios.css"
import { FormControl, FormHelperText, InputLabel, Input, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react'

interface FormUserInterface {
    userName: string;
    email: string;
    nombre: string;
    apellido: string;
    dni: string;
    calle: string;
    numero: string;
    ciudad: string;
    cp: string;
    
  }

export default function HomeUsuarios() {
    
    const [input, setInput] = React.useState<FormUserInterface>({
        userName: "",
        email: "",
        nombre: "",
        apellido: "",
        dni: "",
        calle:"",
        numero:"",
        ciudad:"",
        cp:""
        });



const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
function handleClickEdit(e:React.SyntheticEvent){
    e.preventDefault()
    
}

    return (
        <Box component="form" className="form-home-usuario">

        <label>Mis Datos</label>

            <Avatar alt="❓" className="avatar-usuario">❓</Avatar>

        <legend>Datos de la Cuenta</legend>
            <TextField
            
            label="Nombre de usuario:"
            value={input.userName}
            onChange={handleChange}
            />
        <div className="div-field">
            <TextField
            
            label="E-mail:"
            value={input.email}
            onChange={handleChange}
            />
        </div>
        

        <legend>Datos personales</legend>
        <div className="div-field">
            <TextField
            
            label="Nombre:"
            value={input.nombre}
            onChange={handleChange}
            />
        </div>
        <div className="div-field">
            <TextField
            
            label="Apellido:"
            value={input.apellido}
            onChange={handleChange}
            />
        </div>
        <div className="div-field">
            <TextField
            
            label="DNI:"
            value={input.dni}
            onChange={handleChange}
            />
        </div>

        <legend>Domicilio</legend>
        <div className="div-field">
            <TextField
            
            label="Calle:"
            value={input.calle}
            onChange={handleChange}
            />
        </div>
        <div className="div-field">
            <TextField
            
            label="Número:"
            value={input.numero}
            onChange={handleChange}
            />
        </div>
        <div className="div-field">
            <TextField
            
            label="Ciudad:"
            value={input.ciudad}
            onChange={handleChange}
            />
        </div>
        <div className="div-field">
            <TextField
            
            label="Código postal:"
            value={input.cp}
            onChange={handleChange}
            />
        </div>
        <div>
           <button >guardar</button>
           <button onClick={handleClickEdit}>editar</button>
        </div>
    </Box>)
}
