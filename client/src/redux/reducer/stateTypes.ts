export interface Publication {
  _id: string;
  name: string;
  images?: string[];
  stock: number;
  mark: string;
  detail?: string;
  price: number;
  category: string;
  author: string;
  gender: "Hombre" | "Mujer" | "Niños";
  isRejected: boolean;
  message: string;
  __v: number;
}

export interface User {
  name: { firstName: string; lastName: string };
  _id: string;
  email: string;
  password: string;
  publications?: Publication[];
  shopping: any[];
  __v: number;
  active: boolean;
  type: string;
  photo: string;
  denunciations: any[];
}

export interface Carrito {
  title: string;
  amount: number;
  price: number;
  id: string;
  image: string;
}
