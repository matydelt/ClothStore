import React, { createContext, useState, useEffect } from "react";
import { Context, ContextType } from "hoist-non-react-statics/node_modules/@types/react";
import { useSelector } from "react-redux";
import {DefaultRootState, Publication, Publications} from "../redux/types";


export const DataContext = createContext(null);

export const DataProvider = (props: any) => {
	const [productos, setProductos] = useState <Publications> ([]);
	const [menu, setMenu] = useState(false)
	const [carrito, setCarrito] =useState <Publications> ([]);
	const [total, setTotal] = useState(0)
    const {publications} = useSelector((state: DefaultRootState) => state)

	console.log(carrito)

  useEffect(() => {
		if(publications){
			setProductos(publications)
		}
	}, []);

	const addCarrito = (id: string) =>{
		const check = carrito?.every((item: Publication) =>{
			return item._id !== id
			
		})
		if(check){
			const data: Publications = productos?.filter((producto: Publication) =>{
				return producto._id === id
			})
			setCarrito([...carrito, ...data])
		}else{
			alert("El producto se ha añadido al carrito")
		}
	}
	useEffect(() =>{
		const dataCarrito: any = JSON.parse <any> (localStorage.getItem("dataCarrito"))
		if(dataCarrito){
			setCarrito(dataCarrito)
		}
	},[])

	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])

	useEffect(() =>{
		const getTotal = () =>{
			const res = carrito.reduce((prev, item) =>{
				return prev + (item.price * item.cantidad)
			},0)
			setTotal(res)
		}
		getTotal()
	},[carrito])
	
	const value = {
		productos : [productos],
		menu: [menu, setMenu],
		carrito: [carrito, setCarrito],
		addCarrito: addCarrito,
		total: [total, setTotal]
	}
	return (
		<DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
	)
};