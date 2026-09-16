import type { ICategoria } from "./categoria";


// modulo para las interfaces de como tiene que ser un producto 
export interface IProduct {
    id: number;
    eliminado: boolean;
    createdAt: string;
    nombre: string;
    precio: number;
    descripcion: string;
    stock: number;
    imagen: string;
    disponible: boolean;
    categorias: ICategoria[];
}

export type Product = IProduct;

// y como tiene que ser un item del carrito.
export interface ICartItem {
    id: number; // id del producto tiene que ser
    nombre: string;
    precio: number;
    cantidad: number;
    imagen: string;
}