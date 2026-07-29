# StoreFlow

StoreFlow es una aplicación web moderna para explorar productos de una API pública, aplicar filtros y ordenar el catálogo, y gestionar un carrito de compras con persistencia local mediante localStorage.

## Características

- Consumo de datos desde la API pública de Fake Store.
- Renderizado dinámico del catálogo en tarjetas.
- Búsqueda por nombre, categoría o descripción.
- Filtros por categoría y ordenamientos por precio o nombre.
- Carrito funcional con suma de productos, eliminación y persistencia.
- Modal de checkout con formulario de compra y confirmación visual.
- Diseño responsive para escritorio, tablet y móvil.

## Estructura del proyecto

- index.html: estructura principal de la interfaz.
- styles.css: estilos visuales y responsive.
- app.js: lógica de carga de productos, filtros, carrito, persistencia y checkout.
- docs/analysis.md: decisiones de UX y estructura de datos.
- docs/wireframes/store-wireframe.svg: boceto de la interfaz.
- docs/screenshots/app-preview.svg: vista previa visual del proyecto.

## Capturas de pantalla

- Vista previa general: [docs/screenshots/app-preview.svg](docs/screenshots/app-preview.svg)
- Boceto de interfaz: [docs/wireframes/store-wireframe.svg](docs/wireframes/store-wireframe.svg)

## Instrucciones de ejecución

1. Abre la carpeta del proyecto en tu editor.
2. Ejecuta un servidor estático desde la raíz del proyecto. Por ejemplo:

   ```bash
   python -m http.server 8000
   ```

3. Abre la dirección http://127.0.0.1:8000 en tu navegador.

## Notas de diseño

La interfaz está pensada para ofrecer una experiencia rápida y clara: el catálogo ocupa el espacio principal, los filtros se mantienen accesibles, el carrito queda visible y el checkout se presenta como un paso breve y confiable para completar la compra.
