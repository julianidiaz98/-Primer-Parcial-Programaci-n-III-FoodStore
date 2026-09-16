import { logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart, updateCartBadge } from "../../../utils/cart";
import type { ICategoria } from "../../../types/categoria";
import type { IProduct } from "../../../types/product";

// import para usar

// filtros para la busqueda, 
// inicializo en vacio
let searchFilter: string = "";
// numero del ID del filtro o nulo.
let categoryFilter: number | null = null;

// busco los documents HTML y los defino en const para usarlos.
const productsCatalog = document.getElementById("products-catalog") as HTMLDivElement;
const categoriesList = document.getElementById("categories-list") as HTMLUListElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const toast = document.getElementById("toast-notification") as HTMLDivElement;


// el boton de logout del TP pasado.
const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

// funcion para mostrar notificaciones
function showToastNotification(message: string): void {
  // defino el mensaje y muestro
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("visible");

  // luego de un tiempo, lo oculto.
  setTimeout(() => {
    toast.classList.remove("visible");
    toast.classList.add("hidden");
  }, 2500);
}

// funcion para renderizar las categorias.
function renderCategories(): void {
  // sino existe la lista de categorias, no tiene sentido ejecutar la funcion.
  if (!categoriesList) return;

  // obtengo las categorias.
  const categories: ICategoria[] = getCategories();
  // inicializo vacio.
  categoriesList.innerHTML = "";

  // creo el elemento con todos los "li", le defino texto y clase.
  const allLi = document.createElement("li");
  allLi.textContent = "Todos los productos";
  allLi.className = categoryFilter === null ? "active" : "";
  // si el usuario hace click, se quita el filtro y se actualiza
  allLi.addEventListener("click", () => {
    categoryFilter = null;
    updateView();
  });
  
  // agrego todos los Li a la lista de categorias.
  categoriesList.appendChild(allLi);

  // recorro categorias y agrego cada categoria a la lista.
  categories.forEach(category => {
    const li = document.createElement("li");
    li.textContent = category.nombre;
    li.className = categoryFilter === category.id ? "active" : "";
    li.addEventListener("click", () => {
      categoryFilter = category.id;
      updateView();
    });

    categoriesList.appendChild(li);
  });
}

// funcion para renderizar los productos.
function renderProducts(): void {
  // inicializo como vacio el catalogo de productos.
  productsCatalog.innerHTML = "";

  // obtengo los productos filtrados por
  const filteredProducts: IProduct[] = PRODUCTS.filter(product => {
    // busqueda manual
    const matchesSearch = product.nombre.toLowerCase().includes(searchFilter.toLowerCase());
    // por categoria
    const matchesCategory = categoryFilter === null ||
                            product.categorias.some(cat => cat.id === categoryFilter);
                            
    // devuelvo si cumple.
    return matchesSearch && matchesCategory && !product.eliminado;
  });

  // si los productos filtrados son 0
  if (filteredProducts.length === 0) {
    productsCatalog.innerHTML = `
      <div class="no-results">
        <h3>No se encontraron delicias gastronómicas</h3>
        <p>Prueba con otra palabra clave o selecciona otra categoría.</p>
      </div>
    `;
    return;
  }

  // recorro los productos filtrados
  filteredProducts.forEach(product => {
    // creo un elemento div (card de los productos)
    const card = document.createElement("div");
    // le asigno un classname
    card.className = "product-card";

    // inicializo si hay stock y si esta disponible
    const hasStock = product.stock > 0;
    const isAvailable = product.disponible && hasStock;

    // defino el nombre de la categoria, para mostrar.
    const categoryName = product.categorias && product.categorias.length > 0
      ? product.categorias[0].nombre
      : "";

    
    const imagePath = product.imagen.startsWith("http") ? product.imagen : `/${product.imagen}`;

    // codigo html que va dentro del card del product.
    card.innerHTML = `
      <div class="card-image-box">
        <img src="${imagePath}" alt="${product.nombre}" class="product-img ${!isAvailable ? 'out-of-stock-img' : ''}" />
        </div>
        <div class="product-info-box">
          <span class="product-category">${categoryName.toLocaleUpperCase()}</span>
          <h4>${product.nombre}</h4>
          <p class="product-description">${product.descripcion}</p>
          <div class="product-card-footer">
            <span class="product-price">$${product.precio.toLocaleString('es-AR')}</span>
            <button class="add-to-cart-btn" data-id="${product.id}" ${!isAvailable ? 'disabled' : ''}>
              ${isAvailable ? '+ Agregar' : 'Sin Stock'}
            </button>
          </div>
        </div>
      `;

    // si esta disponible
    if (isAvailable) {
      // creo el boton para agregar el producto al carrito.
      const addBtn = card.querySelector(".add-to-cart-btn") as HTMLButtonElement;
      addBtn.addEventListener("click", () => {
        addToCart(product);
        updateCartBadge();
        showToastNotification(`¡${product.nombre} agregado al carrito con éxito!`);
      });
    }

    // agrego el card del producto al catalogo.
    productsCatalog.appendChild(card);
  });
}

// funcion para actualizar vista con los 2 render
function updateView(): void {
  renderCategories();
  renderProducts();
}



// el listener para el input del filtro.
searchInput.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  searchFilter = target.value;
  renderProducts();
});

// para arrancar la pagina.
updateCartBadge();
updateView();
