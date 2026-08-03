# Análisis de Diseño, UI/UX y Estructura de Datos

## 1. Decisiones de Diseño UI/UX
- **Diseño Responsive:** Layout dinámico utilizando CSS Grid (`repeat(auto-fill, minmax(...))`) y Flexbox para adaptarse sin *breakpoints* rígidos a móviles, tablets y escritorio.
- **Carrito Accesible (Drawer):** Desplegable lateral que se superpone sin perder la vista del catálogo principal.
- **Usabilidad:** Alto contraste en botones primarios, imágenes con `object-fit: contain` para preservar proporciones y truncado de textos largos (`-webkit-line-clamp`) para mantener alineación.

## 2. Estructura de Datos
- **Carrito como Objeto Hash Map (`{ [id]: item }`):**
  Se eligió esta estructura frente a un *Array* para garantizar un acceso de $O(1)$ al agregar, buscar o actualizar la cantidad de un producto por su `id`, optimizando el rendimiento.
- **Persistencia en `localStorage`:**
  El estado del carrito se serializa como cadena JSON bajo la clave `fakestore_cart_data`. Al iniciar la app, se deserializa para restaurar el estado previo del usuario.

## 3. Justificación de Filtros y Ordenamiento
- **Barra de Búsqueda (`input`):** Permite localización rápida de productos mediante coincidencia en título y descripción.
- **Filtro por Categoría (`change`):** Reduce la sobrecarga cognitiva agrupando el catálogo.
- **Ordenamiento (`change`):** Ofrece flexibilidad para comparar precios (decisión económica) o nombres (orden alfabético).