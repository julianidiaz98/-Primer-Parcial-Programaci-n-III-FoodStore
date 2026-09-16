import type { ICartItem, IProduct } from "../types/product";

// defino la clave para localStorage 
const LOCAL_STORAGE_KEY = 'cart';

// obtengo los items del carrito
export function getCartItems(): ICartItem[] {
    // busco el item en el localStorage
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    // lo parseo o devuelve un cart vacio
    return data ? JSON.parse(data) : [];
}

// funcion para guardar los items del carrito
export function saveCartItems(items: ICartItem[]): void {
    // guarda los items dentro del localStorage.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

// funcion para agregar un producto al carrito.
export function addToCart(product: IProduct): void {
    const currentCart = getCartItems();
    const existingItem = currentCart.find(item => item.id === product.id);

    // si existe el item, le sumo 1.
    if (existingItem) {
        existingItem.cantidad += 1;
    } 
    // sino, pusheo un item nuevo.
    else {
        currentCart.push({
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1,
            imagen: product.imagen
        });
    }

    // guardo los cambios en el carrito actual.
    saveCartItems(currentCart);
}


// funcion para actualizar la cantidad de items en el carrito
export function updateCartItemQuantity(productId: number, quantity: number): void {
    // inicializo el carrito actual
    let currentCart = getCartItems();

    // si la cantidad es menor o igual a 0
    if (quantity <= 0) {
        // lo elimina del carrito
        currentCart = currentCart.filter(item => item.id !== productId);
    } 
    // sino, busco el producto y actualizo su cantidad
    else {
        const item = currentCart.find(item => item.id === productId);
        if (item) {
            item.cantidad = quantity;
        }
    }

    // guardo los cambios
    saveCartItems(currentCart);
}

// funcion para eliminar un producto del carrito mediante id
export function removeFromCart(productId: number): void {
    const currentCart = getCartItems();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    saveCartItems(updatedCart);
}

// funcion para calcular el total del carrito.
export function calculateCartTotal(): number {
    const currentCart = getCartItems();
    return currentCart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

// actualizo el contador de carrito
 export function updateCartBadge(): void {
  const badge = document.getElementById("cart-badge");
  // calculo y muestro el contador del carrito
  if (badge) {
    const items = getCartItems();
    const totalCount = items.reduce((acc, item) => acc + item.cantidad, 0);
    badge.textContent = totalCount.toString();
  }
}
