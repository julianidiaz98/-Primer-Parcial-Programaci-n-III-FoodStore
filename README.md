# Food Store - Evaluación 1 (Programación 3)

## Link al video: https://youtu.be/Z2mFNa-1qJo

## Descripción del Proyecto

**Food Store** es una aplicación web frontend interactiva desarrollada para la **Evaluación 1 de Programación 3** de la Tecnicatura Universitaria en Programación a Distancia (UTN).

La aplicación permite a los usuarios navegar por un catálogo dinámico de productos gastronómicos, filtrar platos por categoría, realizar búsquedas en tiempo real por nombre y gestionar un carrito de compras interactivo con persistencia de datos en `localStorage`.

El desarrollo se realizó utilizando **HTML5, CSS3 y Vanilla TypeScript**, estructurado y compilado mediante **Vite**.

---

## Funcionalidades Principales

1. **Catálogo Dinámico y Búsqueda por Nombre (HU-P1-01)**
   - Campo de búsqueda en tiempo real que filtra productos según su nombre.
   - Feedback visual en pantalla cuando no existen coincidencias.

2. **Filtrado por Categoría (HU-P1-02)**
   - Menú lateral dinámico generado a partir de las categorías definidas en la aplicación.
   - Permite filtrar los productos pertenecientes a una categoría específica o regresar a la lista completa.

3. **Carrito de Compras con Persistencia (HU-P1-03 y HU-P1-04)**
   - Agregar productos al carrito directamente desde la tarjeta de producto.
   - Indicador visual tipo *Toast* confirmando la acción realizada.
   - Persistencia de los productos e información de cantidades en `localStorage` bajo la clave `"cart"`.
   - Modificación de cantidades (sumar/restar) y eliminación individual de productos.
   - Contador dinámico (*badge*) en la barra de navegación que muestra la cantidad total de artículos agregados.

4. **Cálculo de Totales (HU-P1-05)**
   - Vista dedicada para revisar el detalle de la compra.
   - Cálculo automático de subtotales por producto y del total general a pagar.

---

## Estructura del Proyecto

El proyecto respeta la arquitectura de carpetas y convenciones solicitadas por la cátedra:

```text
src/
├── pages/
│   ├── auth/                     ← Registro y Login
│   ├── admin/                    ← Vistas de administración
│   └── client/                   ← Vistas del cliente
│       ├── home/
│       │   ├── home.html         ← Marcado del catálogo
│       │   └── home.ts           ← Lógica de render, búsqueda y filtros
│       └── cart/
│           ├── cart.html         ← Marcado del carrito
│           └── cart.ts           ← Render del carrito y total
├── types/
│   ├── product.ts                ← Interfaces IProduct e ICartItem
│   └── categoria.ts              ← Interface ICategoria
├── data/
│   └── data.ts                   ← Datos centralizados (PRODUCTS y getCategories())
└── utils/
    └── cart.ts                   ← Lógica reusable del carrito (localStorage)
vite.config.ts                    ← Configuración de Vite y registro de páginas para build
README.md                         ← Documentación del proyecto
```

---

## Requisitos Previos

- **Node.js** (versión 18 o superior).
- **pnpm** (Gestor de paquetes recomendado).

---

## Instrucciones de Instalación y Ejecución

1. **Habilitar pnpm** (incluido en Node.js mediante Corepack):
   ```bash
   corepack enable pnpm
   ```

2. **Instalar dependencias del proyecto**:
   ```bash
   pnpm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```
   Abre tu navegador e ingresa a `http://localhost:5173`.

4. **Compilar para producción**:
   ```bash
   pnpm build
   ```

5. **Previsualizar el build compilado**:
   ```bash
   pnpm preview
   ```

---

## Tecnologías Utilizadas

- **HTML5** & **CSS3** (Variables CSS, Flexbox, Grid, diseño responsive).
- **TypeScript** (Interfaces, tipos estrictos y manipulación del DOM).
- **Vite** (Servidor de desarrollo y empaquetador Rollup).
- **Web Storage API** (`localStorage`).
