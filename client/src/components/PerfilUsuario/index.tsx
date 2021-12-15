import axios from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import SidebarUser from './SideBarUser/SidebarUser'
import { Route, Routes } from "react-router";
import ManagementUserProfile from './Profile'
import ListProducts from './ListProducts/ListProducts'
import ListSales from './ListSales/ListSales'
import ListShopping from './ListShopping/ListShopping'

interface PropsUser {
    photo: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    name: {
        firstName: string | undefined;
        lastName: string | undefined;
    }
    dni: string | undefined;
    domicilio: [{
        street: string | undefined;
        suite: string | undefined;
        city: string | undefined;
        country: string | undefined;
        cp: string | undefined;
    }]
    publications: Publication[];
    shopping: any[] | undefined;
}
interface Publication {
    name: string;
    images: any[];
    stock: number;
    mark: string;
    detail: string;
    price: number;
    categorie: string;
    author: string;
    gender: string;
    key: string;
    id: string;
}
export default function PefilUsuario() {
    const GetUser = useSelector((state: RootState) => state.userSignin.userInfo)
    console.log(GetUser, "getuser")
    const [user, setUser] = React.useState<PropsUser>({
        photo: "",
        phone: "",
        email: "",
        name: {
            firstName: "",
            lastName: "",
        },
        dni: "",
        domicilio: [{
            street: "",
            suite: "",
            city: "",
            cp: "",
            country: "",
        }],
        publications: [{
            name: "",
            images: [],
            stock: 0,
            mark: "",
            detail: "",
            price: 0,
            categorie: "",
            author: "",
            gender: "",
            key: "",
            id: "",
        }],
        shopping: []
    });
    React.useEffect(() => {
        async function getOneUser() {
            await axios.get(`/auth/${GetUser?._id}`).then(({ data }) => {
                setUser({ ...user, ...data })
            })
        }
        getOneUser()
    }, [])

    const firstName: string | undefined = user.name.firstName;
    const lastName: string | undefined = user.name.lastName;
    const photo: string | undefined = user.photo
    const phone: string | undefined = user.phone
    const email: string | undefined = user?.email
    const dni: string | undefined = user.dni
    const calle: string | undefined = user.domicilio[0]?.street
    const numero: string | undefined = user.domicilio[0]?.suite
    const ciudad: string | undefined = user.domicilio[0]?.city
    const country: string | undefined = user.domicilio[0]?.country
    const cp: string | undefined = user.domicilio[0]?.cp
    console.log(calle, numero, ciudad)

    return (
        <>
            <SidebarUser
                firstName={firstName}
                lastName={lastName}
                photo={photo}
                phone={phone}
                email={email}
                dni={dni}
                calle={calle}
                numero={numero}
                ciudad={ciudad}
                country={country}
                cp={cp}
            />
            <Routes>
                <Route path="detalles" element={<ManagementUserProfile firstName={firstName}
                    lastName={lastName}
                    photo={photo}
                    phone={phone}
                    email={email}
                    dni={dni}
                    calle={calle}
                    numero={numero}
                    ciudad={ciudad}
                    country={country}
                    cp={cp}
                />} />
                <Route path="productos" element={<ListProducts id={GetUser?._id} />}></Route>
                <Route path="ventas" element={<ListSales id={GetUser?._id} />}></Route>
                <Route path="compras" element={<ListShopping id={GetUser?._id} />}></Route>

            </Routes>
        </>
    )
}


