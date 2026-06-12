# Responsive Checklist

## Breakpoints Usados

- Base: moviles pequenos desde 320px.
- `sm`: moviles grandes desde 640px.
- `md`: tablets desde 768px.
- `lg`: laptop desde 1024px.
- `xl`: desktop desde 1280px.

La app mantiene un enfoque mobile-first: las clases sin prefijo son la experiencia movil y las variantes `sm:`, `md:`, `lg:` y `xl:` amplian la composicion en pantallas mayores.

## Componentes Ajustados

- `Header`: logo/nombres con truncado, menu movil tactil y links de altura comoda.
- `Hero`: altura minima mas contenida en celulares, texto con corte seguro y botones en columna en movil.
- `EventDetails`: cards apiladas, padding movil reducido, direcciones con `break-words` y boton de mapa ancho en movil.
- `Countdown`: grid de 2 columnas en movil, numeros mas contenidos y padding responsive.
- `Couple`: imagenes proporcionales, titulos y textos con cortes seguros.
- `StoryTimeline`: timeline vertical mas compacto en 320px y cards con `min-w-0`.
- `Gallery`: una columna en moviles pequenos, 2 columnas desde `sm`, modal con scroll seguro y boton cerrar tactil.
- `Testimonials`: cards con padding movil y textos largos sin desborde.
- `RSVPForm`: inputs de 16px, altura tactil, errores legibles, textarea mas comodo y boton ancho en movil.
- `FAQ`: preguntas con altura tactil y contenido con `break-words`.
- `Footer`: una columna centrada en movil, links tactiles y datos largos sin desborde.
- `/mensajes`: formulario optimizado para celular con textarea, boton ancho y campos de 16px.
- `/pantalla-mensajes`: mantiene desktop de proyector, pero la vista movil ya no fuerza alto fijo ni overflow horizontal.

## Checklist DevTools

Probar anchos:

- 320px
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1440px

En cada ancho revisar:

- No hay scroll horizontal.
- Header fijo no tapa contenido al navegar.
- Menu movil abre, cierra y cierra al tocar un link.
- Hero se ve completo y los nombres no se cortan de forma incomoda.
- Botones principales tienen al menos 44px de alto.
- Cards de ceremonia y recepcion se apilan en movil.
- Countdown no desborda y mantiene 2 columnas en movil.
- RSVP se puede llenar sin zoom automatico en iPhone.
- Mensajes de error y exito del RSVP son visibles.
- Galeria abre/cierra el modal sin salirse del viewport.
- Timeline se lee verticalmente en movil.
- FAQ abre/cierra con targets comodos.
- Footer no comprime columnas en movil.
- `/mensajes` permite escribir nombre, mensaje, subir foto y enviar comodamente.
- `/pantalla-mensajes` no se rompe si se abre desde un celular.

## Recomendaciones Para Invitados

- Compartir el enlace publico principal y el enlace `/mensajes` por QR.
- Probar el QR desde iPhone y Android antes del evento.
- Evitar pedir datos extensos en formularios durante la celebracion.
- Mantener el formulario de mensajes corto: nombre, mensaje y foto opcional.

## Formularios Moviles

- Los inputs usan texto de 16px para evitar zoom automatico en iOS.
- Los botones principales ocupan todo el ancho en movil.
- Los campos tienen altura tactil comoda.
- Los textos largos usan `break-words` para no provocar overflow.

## Pantalla De Proyector

- El layout desktop de `/pantalla-mensajes` se mantiene para proyeccion.
- En movil la pantalla usa pila vertical y evita alto fijo con `h-screen`.
- Para uso real con invitados desde celulares distintos, los mensajes en vivo requieren backend realtime como Supabase o Firebase; `localStorage` solo sincroniza dentro del mismo navegador/dispositivo.

## Referencias

- Tailwind CSS recomienda un sistema responsive mobile-first con utilidades base y variantes por breakpoint.
- MDN documenta el uso de `meta viewport` para controlar el ancho del viewport en moviles.
- WCAG 2.5.5 recomienda targets de 44 x 44 CSS px para interacciones tactiles comodas.
