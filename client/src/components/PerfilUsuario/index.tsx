import axios from "axios";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import SidebarUser from "./SideBarUser/SidebarUser";
import { Route, Routes } from "react-router";
import ManagementUserProfile from "./Profile";
import ListProducts from "./ListProducts/ListProducts";
import ListSales from "./ListSales/ListSales";
import ListShopping from "./ListShopping/ListShopping";
import Footer from "../Footer";
import { Box } from "@material-ui/core";

interface PropsUser {
    userName: string | undefined;
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
    type: string
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
    const [user, setUser] = React.useState<PropsUser>({
        userName: "",
        type: "",
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
    const userName: string | undefined = user.userName
    const phone: string | undefined = user.phone
    const email: string | undefined = user?.email
    const dni: string | undefined = user.dni
    const calle: string | undefined = user.domicilio[0]?.street
    const numero: string | undefined = user.domicilio[0]?.suite
    const ciudad: string | undefined = user.domicilio[0]?.city
    const country: string | undefined = user.domicilio[0]?.country
    const cp: string | undefined = user.domicilio[0]?.cp
    const type: string | undefined = user.type

    return (
        <>
            <SidebarUser
                type={type}
            />
            <Routes>
                <Route index element={<ManagementUserProfile
                    id={GetUser?._id}
                    firstName={firstName}
                    lastName={lastName}
                    userName={userName}
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
            <Box display='flex' flexDirection='column' height='100%'>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Footer />
            </Box>
        </>
    )
}
