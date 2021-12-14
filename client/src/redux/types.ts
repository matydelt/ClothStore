
export type DefaultRootState = {
    users: any,
    loading: boolean,
    userInfo: any,
    error: any,
    publications: Publications
}

export type Publication = {
    name: string;
    images: any[];
    stock: number;
    mark: string;
    detail: string;
    price: number;
    categorie: string;
    author: string;
    gender: string;
    _id: string;
    cantidad: number;
    state: boolean;
    isRejected: boolean;
    message: string;
    discount: any;
}

export type Publications = Publication[];


