import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {DefaultRootState, Publication, Publications} from "../redux/types";


export const DataContext = createContext(null);

export const DataProvider = (props: any):any => {
	const [productos, setProductos] = useState <Publications> ([]);
	const [carrito, setCarrito] =useState <Publications> ([]);
	const [total, setTotal] = useState(0)
    const {publications} = useSelector((state: DefaultRootState) => state)

	console.log(carrito)

  useEffect(() => {
		if(publications){
			setProductos(publications)
		}
	}, [publications]);

	const addCarrito = (id: string) =>{
		const check = carrito?.every((item: Publication) =>{
			return item._id !== id
			
		})
		if(check){
			const data: Publications = productos.filter((producto: Publication) =>{
				return producto._id === id
			})
			setCarrito([...carrito, ...data])
		}else{
			alert("El producto se ha añadido al carrito")
		}
	}

	useEffect(() =>{
		const dataCarrito: any = JSON.parse(JSON.stringify(localStorage.getItem("dataCarrito")))
		if(dataCarrito){
			setCarrito(dataCarrito)
		}
	},[])

	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])

	useEffect(() =>{
		const getTotal = () =>{
			const res = carrito.reduce((prev, item:Publication) =>{
				return prev + (item.price * item.cantidad)
			},0)
			setTotal(res)
		}
		getTotal()
	},[carrito])
	
	const value:any = {
		productos : productos,
		carrito: {carrito, setCarrito},
		addCarrito: addCarrito,
		precioFinal: {total, setTotal}
	}
	return (
		<DataContext.Provider value={value}>
			{props.children}
		</DataContext.Provider>
	)
};