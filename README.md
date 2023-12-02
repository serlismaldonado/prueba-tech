This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Instrucciones de la prueba

## Desarrollo de Aplicación Web

## Login de pantalla:

        Utilizar LocalStorage para almacenar manualmente el usuario y la contraseña, validándolos desde la pantalla de login.
        Al realizar el login, generar un token aleatorio que se almacenará en el LocalStorage.
        Restringir el acceso a la pantalla principal validando la existencia del token en el LocalStorage.

## Menú con las siguientes opciones:

        CRUD de productos con campos: Código, Nombre, Existencias, Precio (Guardar en LocalStorage).
        CRUD de clientes con campos: Código, Nombre, RTN, Dirección.
        Facturar productos con campos específicos y cálculos automáticos (Guardar en LocalStorage).
        Listar productos y facturas almacenadas en el LocalStorage.
        Gráfica de facturación comparando ventas al contado y a crédito (Utilizar librería de gráficos).

## Finalizar Sesión:

        Eliminar la sesión eliminando el token del LocalStorage.
        No eliminar el resto de la información almacenada.

## Utilizar una API Pública:

        Realizar al menos una petición GET, PUT, POST y DELETE con una API pública.
        Manipular y mostrar la respuesta en la aplicación.
        Manejar errores y excepciones de manera adecuada.

## Consideraciones y Evaluación:

    Utilizar LocalStorage para no depender de un backend o base de datos.
    Diseñar la aplicación teniendo en cuenta su uso en pantallas táctiles.
    Aplicar limitaciones en los campos de los formularios (no vacíos, solo números, etc.).
    Evaluar diseño, código, tiempo de desarrollo, iniciativa y facilidad de uso.
    Implementar un diseño responsivo utilizando Angular Material, Bootstrap, Tailwind CSS u otro framework CSS.

## Entrega y Evaluación:

    Generar el build para producción y publicarlo en un hosting accesible desde la web.
    En caso de no contar con un hosting, proporcionar el código para ejecución local y validación de la aplicación.
    Enviar el código fuente y el build para su análisis.
    Se programará una reunión virtual para explicar la lógica de desarrollo y realizar una evaluación conjunta.
