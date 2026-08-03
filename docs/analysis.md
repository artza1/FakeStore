# Análisis de diseño y experiencia de usuario

## Decisiones de interfaz

- Se optó por una distribución de dos columnas en pantallas grandes: el catálogo a la izquierda y el carrito a la derecha. Esto permite que la experiencia de compra sea rápida y visualmente clara.
- En pantallas pequeñas, la distribución se adapta a una sola columna para priorizar la lectura y evitar el desplazamiento excesivo.
- Los filtros se colocaron en una barra superior para que el usuario pueda encontrar productos sin interrumpir el flujo de navegación.

## Estructura de datos

- Los productos se obtienen de la API pública y se almacenan en un arreglo principal llamado products.
- El carrito se representa como un objeto cuya clave es el id del producto y cuyo valor contiene el producto y la cantidad seleccionada.
- Este modelo facilita la actualización del carrito, la persistencia en localStorage y la renderización rápida del resumen.

## Justificación de filtros y ordenamientos

- La búsqueda por texto permite encontrar productos con rapidez cuando el catálogo crece.
- El filtro por categoría ayuda a reducir la carga cognitiva del usuario al concentrar la selección.
- Los ordenamientos por precio y nombre apoyan decisiones de compra más rápidas y alineadas con el comportamiento esperado en tiendas digitales.

## Persistencia

- El carrito se guarda en localStorage con cada cambio para que el usuario retome su selección aunque recargue la página o cierre la pestaña.
