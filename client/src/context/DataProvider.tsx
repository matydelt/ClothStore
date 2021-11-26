import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DefaultRootState, Publication, Publications } from "../redux/types";

type Value = {
	productos: Publications,
	cart: any[],
	addCarrito: any,
	precioFinal: any[]
	cantidad: number;
}
let value: Value = {
	productos: [],
	cart: [],
	addCarrito: undefined,
	precioFinal: [],
	cantidad: 0
}

export const DataContext = createContext(value);


export const DataProvider = (props: any): any => {
	const [productos, setProductos] = useState<Publications>([]);
	const [carrito, setCarrito] = useState<Publications>([]);
	const [total, setTotal] = useState(0)
	const { publications } = useSelector((state: DefaultRootState) => state)

	useEffect(() => {
		if (publications) {
			setProductos(publications)
		}
	}, [publications]);


	const addCarrito = (id: string) => {
		const check = carrito?.every((item: Publication) => {
			return item._id !== id

		})
		if (check) {

			const data: Publications = productos.filter((producto: Publication) => {
				return producto._id === id
			})
			setCarrito([...carrito, ...data])
		} else {
			alert("El producto se ha añadido al carrito")
		}
	}

	useEffect(() => {
		const dataCarrito: any = JSON.parse(JSON.stringify(localStorage.getItem("dataCarrito")))
		if (dataCarrito) {
			setCarrito(JSON.parse(dataCarrito))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('dataCarrito', JSON.stringify(carrito))
	}, [carrito])

	useEffect(() => {
		const getTotal = () => {
			const res = carrito.reduce((prev, item: Publication) => {
				return prev + (item.price * item.cantidad)
			}, 0)
			setTotal(res)
		}
		getTotal()
	}, [carrito])

	//  value = {
	// 	productos : productos,
	// 	carrito: [carrito, setCarrito],
	// 	addCarrito: addCarrito,
	// 	precioFinal: [total, setTotal]
	// }
	value.productos = productos
	value.cart[0] = carrito
	value.cart[1] = setCarrito
	value.addCarrito = addCarrito
	value.precioFinal[0] = total
	value.precioFinal[1] = setTotal
	return (
		<DataContext.Provider value={value} >
			{props.children}
		</DataContext.Provider>
	)
};

