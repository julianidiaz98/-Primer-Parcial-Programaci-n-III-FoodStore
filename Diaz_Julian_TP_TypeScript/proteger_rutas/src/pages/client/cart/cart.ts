import {
    getCartItems,
    updateCartItemQuantity,
    removeFromCart,
    calculateCartTotal,
    updateCartBadge
} from "../../../utils/cart";

import type { ICartItem } from "../../../types/product";

// importo para trabajar


// busco los elementos HTML por id y los guardo en const para usarlos.

const cartTitle = document.getElementById("cart-title") as HTMLHeadingElement;
const cartList = document.getElementById("cart-list") as HTMLDivElement;
const cartSummary = document.getElementById("cart-summary") as HTMLDivElement;
const summarySubtotal = document.getElementById("summary-subtotal") as HTMLSpanElement;
const cartTotalValue = document.getElementById("cart-total-value") as HTMLSpanElement;

// funcion para renderizar el carrito
function renderCart(): void {
    // obtengo los items
    const items: ICartItem[] = getCartItems();
    // comienzo una cadena vacia para la lista del carrito.
    cartList.innerHTML = "";

    // si no hay items = el carrito esta vacio
    if (items.length === 0) {
        cartList.innerHTML = `
            <div class="empty-cart-msg">
                <h2>Tu carrito de compras está vacío</h2>
                <p>¿Qué te parece si agregas algo delicioso del menú?</p>
                <a href="../home/home.html" class="explore-btn">Explorar el Menú</a>
            </div>
        `;

        
        // oculto el titulo y el resumen del carrito.
        if (cartTitle) cartTitle.classList.add("hidden");
        if (cartSummary) cartSummary.classList.add("hidden");
        
        // actualizo el numero para persistencia.
        updateCartBadge();
        return;
    }

    // muestro el titulo y el resumen del carrito.
    if (cartTitle) cartTitle.classList.remove("hidden");
    if (cartSummary) cartSummary.classList.remove("hidden");
    

    // recorro items.
    items.forEach(item => {
        // creo un div y lo guardo para usar.
        const itemRow = document.createElement("div");
        // defino el classname del div.
        itemRow.className = "cart-item";

        // defino el imagepath, si empieza con http uso directamente item.imagen, sino agrego ruta /.
        const imagePath = item.imagen.startsWith("http") ? item.imagen : `/${item.imagen}`;
        
        // guardo el codigo dentro de itemRow, para luego renderizar los items.
        itemRow.innerHTML = `
            <div class="item-info">
                <img src="${imagePath}" alt="${item.nombre}" class="cart-item-img" />
                <div class="item-details">
                    <h4>${item.nombre}</h4>
                    <p class="item-price">Precio unitario: $${item.precio.toFixed(2)}</p>
                </div>
            </div>

            <div class="item-actions">
                <div class="quantity-controls">
                    <button class="btn-qty btn-minus" data-id="${item.id}">-</button>
                    <span class="qty-number">${item.cantidad}</span>
                    <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
                </div>
                <span class="item-subtotal">$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button class="delete-btn" data-id="${item.id}">Eliminar</button>
            </div>
        `;


        // defino el boton "-" y le doy su funcion 
        const btnMinus = itemRow.querySelector(".btn-minus") as HTMLButtonElement;
        btnMinus.addEventListener("click", () => {
            updateCartItemQuantity(item.id, item.cantidad - 1);
            renderCart();
        });

        // defino el boton "+" y le doy su funcion
        const btnPlus = itemRow.querySelector(".btn-plus") as HTMLButtonElement;
        btnPlus.addEventListener("click", () => {
            updateCartItemQuantity(item.id, item.cantidad + 1);
            renderCart();
        });

        // defino el boton "Eliminar" y le doy su funcion
        const btnDelete = itemRow.querySelector(".delete-btn") as HTMLButtonElement;
        btnDelete.addEventListener("click", () => {
            removeFromCart(item.id);
            renderCart();
        });

        // agrego los items a la lista del carro.
        cartList.appendChild(itemRow);
    });

    // calculo el total y lo muestro.
    const total = calculateCartTotal();
    summarySubtotal.textContent = `$${total.toFixed(2)}`;
    cartTotalValue.textContent = `$${total.toFixed(2)}`;

    updateCartBadge();
}   



// muestro al principio de la pagina
updateCartBadge();
renderCart();