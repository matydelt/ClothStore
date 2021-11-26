import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {DefaultRootState, Publication, Publications} from "../redux/types";

type Value={
	productos:Publications,
	carrito:any[],
	addCarrito:any,
	precioFinal:any[]
}
let value:Value = {
	productos :[],
	carrito: [],
	addCarrito: undefined,
	precioFinal: []
}

export const DataContext = createContext(value);


export const DataProvider = (props: any):any => {
	const [productos, setProductos] = useState <Publications> ([]);
	const [carrito, setCarrito] =useState <Publications> ([]);
	const [total, setTotal] = useState(0)
    const {publications} = useSelector((state: DefaultRootState) => state)

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
			
			console.log(productos , id)
			const data: Publications = productos.filter((producto: Publication) =>{
				return producto._id === id
			})
			console.log(data)
			setCarrito([...carrito, ...data])
		}else{
			alert("El producto se ha añadido al carrito")
		}
	}

	useEffect(() =>{
		const dataCarrito: Publications = JSON.parse(JSON.stringify(localStorage.getItem("dataCarrito")))
		if(dataCarrito && typeof dataCarrito !== "string"){
			setCarrito(dataCarrito)
		}
	},[])

	useEffect(() =>{
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	},[carrito])

	useEffect(() =>{
		const getTotal = () =>{
			// console.log(typeof carrito)
			const res = carrito?.reduce((prev, item:Publication) =>{
				return prev + (item.price * item.cantidad)
			},0)
			setTotal(res)
		}
		getTotal()
	},[carrito])
	
	//  value = {
	// 	productos : productos,
	// 	carrito: [carrito, setCarrito],
	// 	addCarrito: addCarrito,
	// 	precioFinal: [total, setTotal]
	// }
	value.productos=productos
	value.carrito.push(carrito)
	value.carrito.push(setCarrito)
	value.addCarrito=addCarrito
	value.precioFinal.push(total)
	value.precioFinal.push(setTotal)

	return (
		<DataContext.Provider value={value} >
			{props.children}
		</DataContext.Provider>
	)
};

