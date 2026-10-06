/* =========================================================
   SKINCARE COREANO - JAVASCRIPT
   Funcionalidades:
   - Loader
   - Menú móvil
   - Header al hacer scroll
   - Buscador
   - Filtros de productos
   - Favoritos
   - Carrito / contador
   - Modal de productos
   - Modal QR
   - Generación de QR
   - Descargar QR
   - Preguntas frecuentes
   - Chatbot
   - WhatsApp
   - Scroll hacia arriba
   - Año automático
   - Animaciones
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       VARIABLES GENERALES
    ===================================================== */

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);


    /* =====================================================
       LOADER
    ===================================================== */

    const loader = $("#loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("oculto");
            }

        }, 800);

    });


    /* =====================================================
       AÑO AUTOMÁTICO
    ===================================================== */

    const anio = $("#anio");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }


    /* =====================================================
       HEADER / MENÚ MÓVIL
    ===================================================== */

    const menuBtn = $("#menuBtn");
    const menuPrincipal = $("#menuPrincipal");

    if (menuBtn && menuPrincipal) {

        menuBtn.addEventListener("click", () => {

            const abierto = menuPrincipal.classList.toggle("activo");

            menuBtn.classList.toggle("activo", abierto);

            menuBtn.setAttribute(
                "aria-expanded",
                abierto ? "true" : "false"
            );

        });


        // Cerrar menú al seleccionar una opción

        $$("#menuPrincipal a").forEach((enlace) => {

            enlace.addEventListener("click", () => {

                menuPrincipal.classList.remove("activo");
                menuBtn.classList.remove("activo");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       HEADER AL HACER SCROLL
    ===================================================== */

    const header = $("#header");

    function actualizarHeader() {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", actualizarHeader);

    actualizarHeader();


    /* =====================================================
       BUSCADOR
    ===================================================== */

    const searchBtn = $("#searchBtn");
    const buscadorOverlay = $("#buscadorOverlay");
    const cerrarBuscador = $("#cerrarBuscador");
    const buscarProducto = $("#buscarProducto");
    const resultadosBusqueda = $("#resultadosBusqueda");


    function abrirBuscador() {

        if (!buscadorOverlay) return;

        buscadorOverlay.classList.add("activo");

        document.body.classList.add("sin-scroll");

        setTimeout(() => {

            if (buscarProducto) {
                buscarProducto.focus();
            }

        }, 200);

    }


    function cerrarBuscadorFuncion() {

        if (!buscadorOverlay) return;

        buscadorOverlay.classList.remove("activo");

        document.body.classList.remove("sin-scroll");

        if (buscarProducto) {
            buscarProducto.value = "";
        }

        if (resultadosBusqueda) {
            resultadosBusqueda.innerHTML = "";
        }

    }


    if (searchBtn) {
        searchBtn.addEventListener("click", abrirBuscador);
    }


    if (cerrarBuscador) {
        cerrarBuscador.addEventListener(
            "click",
            cerrarBuscadorFuncion
        );
    }


    if (buscadorOverlay) {

        buscadorOverlay.addEventListener("click", (e) => {

            if (e.target === buscadorOverlay) {
                cerrarBuscadorFuncion();
            }

        });

    }


    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            cerrarBuscadorFuncion();
            cerrarModal();
            cerrarQRModal();
            cerrarChat();

        }

    });


    /* =====================================================
       DATOS DE PRODUCTOS
    ===================================================== */

    const productos = [

        {
            nombre: "Mascarilla de avena",
            categoria: "mascarillas hidratacion",
            precio: 35,
            imagen: "fotos/imagen1.jpg",
            descripcion:
                "Una opción ideal para complementar una rutina enfocada en hidratación y suavidad."
        },

        {
            nombre: "Sérum de aloe vera",
            categoria: "serum hidratacion",
            precio: 42,
            imagen: "fotos/imagen2.jpg",
            descripcion:
                "Sérum ligero para complementar una rutina diaria de cuidado facial."
        },

        {
            nombre: "Crema hidratante",
            categoria: "hidratacion",
            precio: 55,
            imagen: "fotos/imagen3.jpg",
            descripcion:
                "Crema pensada para ayudar a mantener una rutina enfocada en hidratación."
        },

        {
            nombre: "Heliocare 360 Gel",
            categoria: "solar",
            precio: 69,
            imagen: "fotos/imagen4.jpg",
            descripcion:
                "Producto pensado para complementar tu rutina diaria de protección solar."
        }

    ];


    /* =====================================================
       BUSCADOR DE PRODUCTOS
    ===================================================== */

    function buscarProductos(texto) {

        if (!resultadosBusqueda) return;

        const termino = texto
            .toLowerCase()
            .trim();


        if (!termino) {

            resultadosBusqueda.innerHTML = `
                <div class="busqueda-vacia">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>Escribe el nombre de un producto.</p>
                </div>
            `;

            return;
        }


        const resultados = productos.filter((producto) => {

            return (
                producto.nombre
                    .toLowerCase()
                    .includes(termino) ||

                producto.categoria
                    .toLowerCase()
                    .includes(termino)
            );

        });


        if (resultados.length === 0) {

            resultadosBusqueda.innerHTML = `
                <div class="busqueda-vacia">
                    <i class="fa-regular fa-face-frown"></i>
                    <p>No encontramos productos para "${texto}".</p>
                </div>
            `;

            return;

        }


        resultadosBusqueda.innerHTML = resultados.map((producto) => `

            <div class="resultado-producto">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <div>

                    <span>
                        ${producto.categoria.split(" ")[0].toUpperCase()}
                    </span>

                    <h3>${producto.nombre}</h3>

                    <strong>
                        S/ ${producto.precio.toFixed(2)}
                    </strong>

                </div>

                <button
                    class="resultado-agregar"
                    data-producto="${producto.nombre}"
                >
                    <i class="fa-solid fa-plus"></i>
                </button>

            </div>

        `).join("");


        // Botones de agregar de los resultados

        $$(".resultado-agregar").forEach((boton) => {

            boton.addEventListener("click", () => {

                const nombre = boton.dataset.producto;

                agregarProducto(nombre);

                mostrarToast(
                    `${nombre} fue agregado a tu pedido.`
                );

            });

        });

    }


    if (buscarProducto) {

        buscarProducto.addEventListener("input", () => {

            buscarProductos(buscarProducto.value);

        });

    }


    /* =====================================================
       FILTROS DE PRODUCTOS
    ===================================================== */

    const filtros = $$(".filtro");
    const tipos = $$(".tipo-card");
    const tarjetasProductos = $$(".producto-card");


    function filtrarProductos(categoria) {

        tarjetasProductos.forEach((producto) => {

            const categorias =
                producto.dataset.categoria || "";

            if (
                categoria === "todos" ||
                categorias.includes(categoria)
            ) {

                producto.style.display = "";

                setTimeout(() => {
                    producto.classList.add("mostrar");
                }, 20);

            } else {

                producto.classList.remove("mostrar");
                producto.style.display = "none";

            }

        });


        filtros.forEach((filtro) => {

            filtro.classList.toggle(
                "activo",
                filtro.dataset.categoria === categoria
            );

        });

    }


    filtros.forEach((filtro) => {

        filtro.addEventListener("click", () => {

            const categoria =
                filtro.dataset.categoria;

            filtrarProductos(categoria);

        });

    });


    tipos.forEach((tipo) => {

        tipo.addEventListener("click", () => {

            const categoria =
                tipo.dataset.categoria;

            filtrarProductos(categoria);


            const productosSection =
                $("#productos");

            if (productosSection) {

                productosSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       FAVORITOS
    ===================================================== */

    let favoritos =
        JSON.parse(
            localStorage.getItem("skincareFavoritos")
        ) || [];


    function guardarFavoritos() {

        localStorage.setItem(
            "skincareFavoritos",
            JSON.stringify(favoritos)
        );

    }


    function actualizarFavoritosVisualmente() {

        $$(".producto-card").forEach((card) => {

            const nombre =
                card.dataset.nombre;

            const boton =
                card.querySelector(".producto-favorito");

            const icono =
                boton?.querySelector("i");

            if (!boton || !icono) return;


            if (favoritos.includes(nombre)) {

                boton.classList.add("favorito-activo");

                icono.classList.remove(
                    "fa-regular"
                );

                icono.classList.add(
                    "fa-solid"
                );

            } else {

                boton.classList.remove(
                    "favorito-activo"
                );

                icono.classList.remove(
                    "fa-solid"
                );

                icono.classList.add(
                    "fa-regular"
                );

            }

        });

    }


    $$(".producto-favorito").forEach((boton) => {

        boton.addEventListener("click", () => {

            const card =
                boton.closest(".producto-card");

            if (!card) return;

            const nombre =
                card.dataset.nombre;


            if (favoritos.includes(nombre)) {

                favoritos =
                    favoritos.filter(
                        item => item !== nombre
                    );

                mostrarToast(
                    "Producto eliminado de favoritos."
                );

            } else {

                favoritos.push(nombre);

                mostrarToast(
                    "Producto agregado a favoritos. ♥"
                );

            }


            guardarFavoritos();

            actualizarFavoritosVisualmente();

        });

    });


    actualizarFavoritosVisualmente();


    /* =====================================================
       CARRITO / PEDIDO
    ===================================================== */

    let carrito =
        JSON.parse(
            localStorage.getItem("skincareCarrito")
        ) || [];


    const contadorCarrito =
        $("#contadorCarrito");

    const abrirCarritoBtn = $("#abrirCarrito");
    const cerrarCarritoBtn = $("#cerrarCarrito");
    const carritoPanel = $("#carritoPanel");
    const carritoItems = $("#carritoItems");
    const carritoTotal = $("#carritoTotal");
    const cotizarCarritoBtn = $("#cotizarCarrito");
    const vaciarCarritoBtn = $("#vaciarCarrito");


    function renderizarCarrito() {

        if (!carritoItems || !carritoTotal) return;

        carritoItems.replaceChildren();

        const productosEnCarrito = carrito.reduce((grupos, item) => {
            const producto = grupos.get(item.nombre) || {
                nombre: item.nombre,
                cantidad: 0,
                precio: productos.find(
                    (disponible) => disponible.nombre === item.nombre
                )?.precio || 0
            };

            producto.cantidad += 1;
            grupos.set(item.nombre, producto);
            return grupos;
        }, new Map());

        let total = 0;

        if (productosEnCarrito.size === 0) {
            const vacio = document.createElement("p");
            vacio.className = "carrito-vacio";
            vacio.textContent = "Tu carrito está vacío.";
            carritoItems.appendChild(vacio);
        }

        productosEnCarrito.forEach((producto) => {
            total += producto.precio * producto.cantidad;

            const fila = document.createElement("article");
            fila.className = "carrito-item";

            const detalle = document.createElement("div");
            detalle.className = "carrito-item-detalle";

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;

            const precio = document.createElement("p");
            precio.textContent = `S/ ${producto.precio.toFixed(2)} c/u`;
            detalle.append(nombre, precio);

            const controles = document.createElement("div");
            controles.className = "carrito-cantidad";

            const disminuir = document.createElement("button");
            disminuir.type = "button";
            disminuir.dataset.accionCarrito = "disminuir";
            disminuir.dataset.producto = producto.nombre;
            disminuir.setAttribute("aria-label", `Quitar una unidad de ${producto.nombre}`);
            disminuir.textContent = "−";

            const cantidad = document.createElement("span");
            cantidad.textContent = producto.cantidad;
            cantidad.setAttribute("aria-label", `Cantidad: ${producto.cantidad}`);

            const aumentar = document.createElement("button");
            aumentar.type = "button";
            aumentar.dataset.accionCarrito = "aumentar";
            aumentar.dataset.producto = producto.nombre;
            aumentar.setAttribute("aria-label", `Agregar una unidad de ${producto.nombre}`);
            aumentar.textContent = "+";

            controles.append(disminuir, cantidad, aumentar);
            fila.append(detalle, controles);
            carritoItems.appendChild(fila);
        });

        carritoTotal.textContent = `S/ ${total.toFixed(2)}`;
        if (cotizarCarritoBtn) {
            cotizarCarritoBtn.disabled = carrito.length === 0;
        }

    }


    function abrirCarrito() {

        if (!carritoPanel) return;

        renderizarCarrito();
        carritoPanel.classList.add("activo");
        carritoPanel.setAttribute("aria-hidden", "false");
        abrirCarritoBtn?.setAttribute("aria-expanded", "true");

    }


    function cerrarCarrito() {

        if (!carritoPanel) return;

        carritoPanel.classList.remove("activo");
        carritoPanel.setAttribute("aria-hidden", "true");
        abrirCarritoBtn?.setAttribute("aria-expanded", "false");

    }


    abrirCarritoBtn?.addEventListener("click", abrirCarrito);
    cerrarCarritoBtn?.addEventListener("click", cerrarCarrito);

    carritoItems?.addEventListener("click", (evento) => {
        const boton = evento.target.closest("button[data-accion-carrito]");
        if (!boton) return;

        if (boton.dataset.accionCarrito === "aumentar") {
            agregarProducto(boton.dataset.producto);
            return;
        }

        const indice = carrito.findIndex(
            (item) => item.nombre === boton.dataset.producto
        );
        if (indice === -1) return;

        carrito.splice(indice, 1);
        guardarCarrito();
        actualizarContador();
        renderizarCarrito();
    });

    vaciarCarritoBtn?.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        actualizarContador();
        renderizarCarrito();
    });

    cotizarCarritoBtn?.addEventListener("click", () => {
        if (carrito.length === 0) return;

        const cantidades = new Map();
        carrito.forEach(({ nombre }) => {
            cantidades.set(nombre, (cantidades.get(nombre) || 0) + 1);
        });

        const detalle = Array.from(cantidades, ([nombre, cantidad]) =>
            `${nombre} (x${cantidad})`
        ).join(", ");
        const mensaje =
            `Hola, quisiera solicitar una cotización para estos productos: ${detalle}. ` +
            `Total referencial: ${carritoTotal?.textContent || "por confirmar"}.`;
        const url =
            `https://wa.me/51999999999?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank", "noopener,noreferrer");
    });

    carritoPanel?.addEventListener("click", (evento) => {
        if (evento.target === carritoPanel) cerrarCarrito();
    });


    function actualizarContador() {

        if (!contadorCarrito) return;

        contadorCarrito.textContent =
            carrito.length;

        contadorCarrito.classList.add("actualizado");

        setTimeout(() => {

            contadorCarrito.classList.remove(
                "actualizado"
            );

        }, 400);

    }


    function guardarCarrito() {

        localStorage.setItem(
            "skincareCarrito",
            JSON.stringify(carrito)
        );

    }


    function agregarProducto(nombre) {

        carrito.push({
            nombre: nombre,
            fecha: new Date().toISOString()
        });


        guardarCarrito();
        actualizarContador();
        renderizarCarrito();

    }


    actualizarContador();


    /* =====================================================
       MODAL PRODUCTO
    ===================================================== */

    const productoModal =
        $("#productoModal");

    const cerrarModalBtn =
        $("#cerrarModal");

    const modalProducto =
        $("#modalProducto");

    const modalAgregar =
        $("#modalAgregar");


    let productoSeleccionado = "";


    function abrirModal(nombre) {

        productoSeleccionado = nombre;

        if (modalProducto) {
            modalProducto.textContent = nombre;
        }

        if (productoModal) {

            productoModal.classList.add(
                "activo"
            );

            document.body.classList.add(
                "sin-scroll"
            );

        }

    }


    function cerrarModal() {

        if (!productoModal) return;

        productoModal.classList.remove(
            "activo"
        );

        document.body.classList.remove(
            "sin-scroll"
        );

    }


    $$(".btn-ver").forEach((boton) => {

        boton.addEventListener("click", () => {

            abrirModal(
                boton.dataset.producto
            );

        });

    });


    if (cerrarModalBtn) {

        cerrarModalBtn.addEventListener(
            "click",
            cerrarModal
        );

    }


    if (productoModal) {

        productoModal.addEventListener(
            "click",
            (e) => {

                if (
                    e.target === productoModal
                ) {

                    cerrarModal();

                }

            }
        );

    }


    if (modalAgregar) {

        modalAgregar.addEventListener(
            "click",
            () => {

                if (!productoSeleccionado)
                    return;


                agregarProducto(
                    productoSeleccionado
                );


                mostrarToast(
                    `${productoSeleccionado} fue agregado a tu pedido.`
                );


                cerrarModal();

            }
        );

    }


    /* =====================================================
       BOTONES + DE PRODUCTOS
    ===================================================== */

    $$(".btn-producto").forEach((boton) => {

        boton.addEventListener("click", () => {

            const nombre =
                boton.dataset.producto;

            agregarProducto(nombre);

            mostrarToast(
                `${nombre} fue agregado a tu pedido.`
            );

        });

    });


    /* =====================================================
       BOTONES DE PEDIDOS
    ===================================================== */

    $$(".pedido-btn").forEach((boton) => {

        boton.addEventListener("click", () => {

            const tipo =
                boton.dataset.tipo;

            const numero =
                "51999999999";

            const mensaje =
                `Hola, quisiera información sobre ${tipo} en Skincare Coreano.`;

            const url =
                `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });


    /* =====================================================
       TOAST
    ===================================================== */

    const toast =
        $("#toast");

    const toastMensaje =
        $("#toastMensaje");


    let toastTimeout;


    function mostrarToast(mensaje) {

        if (!toast) return;

        if (toastMensaje) {
            toastMensaje.textContent =
                mensaje;
        }


        toast.classList.add(
            "activo"
        );


        clearTimeout(toastTimeout);


        toastTimeout =
            setTimeout(() => {

                toast.classList.remove(
                    "activo"
                );

            }, 3000);

    }


    /* =====================================================
       MODAL QR
    ===================================================== */

    const qrBtn =
        $("#qrBtn");

    const qrModal =
        $("#qrModal");

    const cerrarQR =
        $("#cerrarQR");


    function crearQR(elemento) {

        if (!elemento) return;

        elemento.innerHTML = "";


        if (typeof QRCode === "undefined") {

            elemento.innerHTML = `
                <p>No se pudo cargar el generador QR.</p>
            `;

            return;

        }


        new QRCode(elemento, {

            text: window.location.href,

            width: 180,

            height: 180,

            colorDark: "#49343a",

            colorLight: "#ffffff",

            correctLevel:
                QRCode.CorrectLevel.H

        });

    }


    function abrirQRModal() {

        if (!qrModal) return;

        crearQR(
            $("#codigoQRModal")
        );

        qrModal.classList.add(
            "activo"
        );

        document.body.classList.add(
            "sin-scroll"
        );

    }


    function cerrarQRModal() {

        if (!qrModal) return;

        qrModal.classList.remove(
            "activo"
        );

        document.body.classList.remove(
            "sin-scroll"
        );

    }


    if (qrBtn) {

        qrBtn.addEventListener(
            "click",
            abrirQRModal
        );

    }


    if (cerrarQR) {

        cerrarQR.addEventListener(
            "click",
            cerrarQRModal
        );

    }


    if (qrModal) {

        qrModal.addEventListener(
            "click",
            (e) => {

                if (e.target === qrModal) {
                    cerrarQRModal();
                }

            }
        );

    }


    /* =====================================================
       QR PRINCIPAL
    ===================================================== */

    const codigoQR =
        $("#codigoQR");


    crearQR(codigoQR);


    /* =====================================================
       DESCARGAR QR
    ===================================================== */

    const descargarQR =
        $("#descargarQR");


    if (descargarQR) {

        descargarQR.addEventListener(
            "click",
            () => {

                const canvas =
                    codigoQR?.querySelector(
                        "canvas"
                    );

                const imagen =
                    codigoQR?.querySelector(
                        "img"
                    );


                let url = "";


                if (canvas) {

                    url =
                        canvas.toDataURL(
                            "image/png"
                        );

                } else if (imagen) {

                    url =
                        imagen.src;

                }


                if (!url) {

                    mostrarToast(
                        "No se pudo generar el QR."
                    );

                    return;

                }


                const enlace =
                    document.createElement("a");

                enlace.href = url;

                enlace.download =
                    "skincare-coreano-qr.png";

                document.body.appendChild(
                    enlace
                );

                enlace.click();

                enlace.remove();


                mostrarToast(
                    "Código QR descargado correctamente."
                );

            }
        );

    }


    /* =====================================================
       PREGUNTAS FRECUENTES
    ===================================================== */

    const preguntasGrid =
        $("#preguntasGrid");


    const preguntas = [

        {
            pregunta:
                "¿Realizan envíos a todo el Perú?",

            respuesta:
                "Sí. Podemos coordinar envíos a diferentes ciudades del Perú. El tiempo y costo dependen de la ubicación."
        },

        {
            pregunta:
                "¿Puedo comprar productos por mayor?",

            respuesta:
                "Sí. Contamos con opciones para negocios, tiendas y emprendimientos. Escríbenos para solicitar información."
        },

        {
            pregunta:
                "¿Puedo comprar por menor?",

            respuesta:
                "Sí. Puedes seleccionar tus productos favoritos y realizar un pedido para uso personal."
        },

        {
            pregunta:
                "¿Cómo puedo realizar un pedido?",

            respuesta:
                "Puedes agregar productos a tu pedido y luego comunicarte con nosotros por WhatsApp para coordinar la compra."
        },

        {
            pregunta:
                "¿Dónde están ubicados?",

            respuesta:
                "Tenemos presencia en Lima, Abancay, Piura, Cajamarca y Tarapoto."
        },

        {
            pregunta:
                "¿Cómo puedo recibir recomendaciones?",

            respuesta:
                "Puedes utilizar nuestro asistente virtual o escribirnos directamente por WhatsApp para recibir orientación."
        }

    ];


    if (preguntasGrid) {

        preguntasGrid.innerHTML =
            preguntas.map(
                (item, index) => `

                <div class="pregunta">

                    <button
                        class="pregunta-boton"
                        aria-expanded="false"
                    >

                        <span>
                            ${item.pregunta}
                        </span>

                        <i class="fa-solid fa-plus"></i>

                    </button>

                    <div class="pregunta-respuesta">

                        <p>
                            ${item.respuesta}
                        </p>

                    </div>

                </div>

            `
            ).join("");


        $$(".pregunta-boton").forEach(
            (boton) => {

                boton.addEventListener(
                    "click",
                    () => {

                        const pregunta =
                            boton.closest(
                                ".pregunta"
                            );

                        const abierta =
                            pregunta.classList.contains(
                                "activa"
                            );


                        // Cerrar todas

                        $$(".pregunta").forEach(
                            (item) => {

                                item.classList.remove(
                                    "activa"
                                );

                                const button =
                                    item.querySelector(
                                        ".pregunta-boton"
                                    );

                                if (button) {

                                    button.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                }

                            }
                        );


                        // Abrir seleccionada

                        if (!abierta) {

                            pregunta.classList.add(
                                "activa"
                            );

                            boton.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       CHATBOT
    ===================================================== */

    const chatbotBoton =
        $("#chatbotBoton");

    const chatbot =
        $("#chatbot");

    const cerrarChatbot =
        $("#cerrarChatbot");

    const chatbotForm =
        $("#chatbotForm");

    const chatbotInput =
        $("#chatbotInput");

    const chatbotMensajes =
        $("#chatbotMensajes");

    const chatbotPreguntas =
        $("#chatbotPreguntas");


    const respuestasBot = [

        {
            palabras: [
                "hola",
                "buenas",
                "hey"
            ],
            respuesta:
                "¡Hola! 💗 Bienvenido/a a Skincare Coreano. ¿En qué puedo ayudarte?"
        },

        {
            palabras: [
                "producto",
                "productos",
                "catalogo",
                "catálogo"
            ],
            respuesta:
                "Tenemos mascarillas, sérums, hidratantes y productos de protección solar. Puedes revisar nuestro catálogo en la sección Productos. ✨"
        },

        {
            palabras: [
                "precio",
                "precios",
                "cuanto",
                "cuánto"
            ],
            respuesta:
                "Nuestros productos tienen diferentes precios. Puedes revisar cada producto directamente en nuestro catálogo. 💕"
        },

        {
            palabras: [
                "envio",
                "envíos",
                "envío",
                "delivery"
            ],
            respuesta:
                "Realizamos envíos y podemos coordinar la entrega según tu ubicación. 🚚"
        },

        {
            palabras: [
                "mayor",
                "mayoreo",
                "negocio"
            ],
            respuesta:
                "Sí 💼. Tenemos opciones para compras por mayor. Puedes seleccionar 'Pedidos por mayor' y escribirnos."
        },

        {
            palabras: [
                "menor",
                "personal",
                "comprar"
            ],
            respuesta:
                "Claro 💗. Puedes comprar productos para uso personal desde nuestro catálogo."
        },

        {
            palabras: [
                "lima"
            ],
            respuesta:
                "Tenemos atención en Lima. Puedes consultar nuestra sección de Sucursales para obtener más información."
        },

        {
            palabras: [
                "abancay"
            ],
            respuesta:
                "Contamos con atención y distribución en Abancay. 📍"
        },

        {
            palabras: [
                "piura"
            ],
            respuesta:
                "Contamos con atención y distribución en Piura. 📍"
        },

        {
            palabras: [
                "cajamarca"
            ],
            respuesta:
                "Contamos con atención y distribución en Cajamarca. 📍"
        },

        {
            palabras: [
                "tarapoto"
            ],
            respuesta:
                "Contamos con atención y distribución en Tarapoto. 📍"
        },

        {
            palabras: [
                "whatsapp",
                "contacto"
            ],
            respuesta:
                "Puedes contactarnos directamente mediante el botón de WhatsApp de nuestra página. 💬"
        },

        {
            palabras: [
                "gracias"
            ],
            respuesta:
                "¡Con mucho gusto! 💗 Estamos aquí para ayudarte."
        }

    ];


    const preguntasChat = [

        "¿Qué productos tienen?",

        "¿Hacen envíos?",

        "¿Tienen venta por mayor?",

        "¿Dónde están ubicados?"

    ];


    if (chatbotPreguntas) {

        chatbotPreguntas.innerHTML =
            preguntasChat.map(
                pregunta => `
                    <button
                        class="chat-pregunta"
                        type="button"
                    >
                        ${pregunta}
                    </button>
                `
            ).join("");


        $$(".chat-pregunta").forEach(
            (boton) => {

                boton.addEventListener(
                    "click",
                    () => {

                        const texto =
                            boton.textContent.trim();

                        procesarMensaje(texto);

                    }
                );

            }
        );

    }


    function abrirChatbot() {

        if (!chatbot) return;

        chatbot.classList.add(
            "activo"
        );
        chatbot.setAttribute("aria-hidden", "false");

        if (chatbotBoton) {

            chatbotBoton.classList.add(
                "activo"
            );
            chatbotBoton.setAttribute("aria-expanded", "true");

        }

        setTimeout(() => {

            chatbotInput?.focus();

        }, 300);

    }


    function cerrarChat() {

        if (!chatbot) return;

        chatbot.classList.remove(
            "activo"
        );
        chatbot.setAttribute("aria-hidden", "true");

        chatbotBoton?.classList.remove(
            "activo"
        );
        chatbotBoton?.setAttribute("aria-expanded", "false");

    }


    if (chatbotBoton) {

        chatbotBoton.addEventListener(
            "click",
            () => {

                if (!chatbot) return;

                if (
                    chatbot.classList.contains(
                        "activo"
                    )
                ) {

                    cerrarChat();

                } else {

                    abrirChatbot();

                }

            }
        );

    }


    if (cerrarChatbot) {

        cerrarChatbot.addEventListener(
            "click",
            cerrarChat
        );

    }


    function agregarMensajeUsuario(texto) {

        if (!chatbotMensajes) return;

        const mensaje =
            document.createElement("div");

        mensaje.className =
            "mensaje usuario";


        mensaje.innerHTML = `

            <div class="mensaje-contenido">

                <p>
                    ${escapeHTML(texto)}
                </p>

            </div>

        `;


        chatbotMensajes.appendChild(
            mensaje
        );

        desplazarChat();

    }


    function agregarMensajeBot(texto) {

        if (!chatbotMensajes) return;

        const mensaje =
            document.createElement("div");

        mensaje.className =
            "mensaje bot";


        mensaje.innerHTML = `

            <div class="mensaje-avatar">
                ✿
            </div>

            <div class="mensaje-contenido">

                <p>
                    ${texto}
                </p>

            </div>

        `;


        chatbotMensajes.appendChild(
            mensaje
        );

        desplazarChat();

    }


    function desplazarChat() {

        if (!chatbotMensajes) return;

        chatbotMensajes.scrollTop =
            chatbotMensajes.scrollHeight;

    }


    function obtenerRespuesta(texto) {

        const mensaje =
            texto.toLowerCase();


        for (
            const item
            of respuestasBot
        ) {

            const encontrado =
                item.palabras.some(
                    palabra =>
                        mensaje.includes(
                            palabra
                        )
                );


            if (encontrado) {

                return item.respuesta;

            }

        }


        return `
            Gracias por tu pregunta 💗.
            No tengo una respuesta específica para eso todavía,
            pero puedes escribirnos por WhatsApp y nuestro equipo
            podrá ayudarte personalmente.
        `;

    }


    function procesarMensaje(texto) {

        if (!texto.trim()) return;

        agregarMensajeUsuario(texto);


        if (chatbotInput) {
            chatbotInput.value = "";
        }


        setTimeout(() => {

            const respuesta =
                obtenerRespuesta(texto);

            agregarMensajeBot(
                respuesta
            );

        }, 600);

    }


    if (chatbotForm) {

        chatbotForm.addEventListener(
            "submit",
            (e) => {

                e.preventDefault();

                procesarMensaje(
                    chatbotInput.value
                );

            }
        );

    }


    /* =====================================================
       CONTACTO WHATSAPP
    ===================================================== */

    const contactoBtn =
        $("#contactoBtn");


    if (contactoBtn) {

        contactoBtn.addEventListener(
            "click",
            () => {

                const numero =
                    "51999999999";

                const mensaje =
                    "Hola, quisiera recibir ayuda para elegir productos de skincare.";

                const url =
                    `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;


                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       10 REDES SOCIALES
    ===================================================== */

    const redes = {

        facebook:
            "https://www.facebook.com/",

        instagram:
            "https://www.instagram.com/",

        tiktok:
            "https://www.tiktok.com/",

        whatsapp:
            "https://wa.me/51999999999",

        youtube:
            "https://www.youtube.com/",

        pinterest:
            "https://www.pinterest.com/",

        telegram:
            "https://t.me/",

        x:
            "https://x.com/",

        linkedin:
            "https://www.linkedin.com/",

        snapchat:
            "https://www.snapchat.com/"

    };


    /*
       IMPORTANTE:
       Cambia estos enlaces por las cuentas reales
       de tu negocio.
    */


    const enlacesSociales =
        $$(".red-social");


    enlacesSociales.forEach(
        (enlace) => {

            const aria =
                enlace.getAttribute(
                    "aria-label"
                );


            if (!aria) return;


            let clave =
                aria.toLowerCase();


            if (clave === "x") {
                clave = "x";
            }


            if (
                redes[clave]
            ) {

                enlace.href =
                    redes[clave];

                enlace.target =
                    "_blank";

                enlace.rel =
                    "noopener noreferrer";

            }

        }
    );


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    $$('a[href^="#"]').forEach(
        (enlace) => {

            enlace.addEventListener(
                "click",
                (e) => {

                    const destino =
                        enlace.getAttribute(
                            "href"
                        );


                    if (
                        !destino ||
                        destino === "#"
                    ) {

                        e.preventDefault();

                        return;

                    }


                    const elemento =
                        document.querySelector(
                            destino
                        );


                    if (elemento) {

                        e.preventDefault();

                        elemento.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


    /* =====================================================
       BOTÓN VOLVER ARRIBA
    ===================================================== */

    const volverArriba =
        $("#volverArriba");


    function actualizarBotonArriba() {

        if (!volverArriba) return;


        if (window.scrollY > 500) {

            volverArriba.classList.add(
                "visible"
            );

        } else {

            volverArriba.classList.remove(
                "visible"
            );

        }

    }


    window.addEventListener(
        "scroll",
        actualizarBotonArriba
    );


    if (volverArriba) {

        volverArriba.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       ANIMACIONES AL APARECER
    ===================================================== */

    const elementosAnimados =
        $$(
            ".producto-card, " +
            ".tipo-card, " +
            ".beneficio, " +
            ".sucursal, " +
            ".pedido-card, " +
            ".pregunta"
        );


    if (elementosAnimados.length) {

        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(
                    (entradas) => {

                        entradas.forEach(
                            (entrada) => {

                                if (
                                    entrada.isIntersecting
                                ) {

                                    entrada.target.classList.add(
                                        "visible"
                                    );

                                    observer.unobserve(
                                        entrada.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            elementosAnimados.forEach(
                (elemento) => {

                    observer.observe(
                        elemento
                    );

                }
            );

        } else {

            elementosAnimados.forEach(
                (elemento) => {

                    elemento.classList.add(
                        "visible"
                    );

                }
            );

        }

    }


    /* =====================================================
       EVITAR HTML INYECTADO EN CHAT
    ===================================================== */

    function escapeHTML(texto) {

        const div =
            document.createElement("div");

        div.textContent =
            texto;

        return div.innerHTML;

    }


    /* =====================================================
       CERRAR MODALES CON CLICK EXTERIOR
    ===================================================== */

    window.addEventListener(
        "click",
        (e) => {

            if (
                productoModal &&
                e.target === productoModal
            ) {

                cerrarModal();

            }

            if (
                qrModal &&
                e.target === qrModal
            ) {

                cerrarQRModal();

            }

        }
    );


    /* =====================================================
       MENSAJE DE BIENVENIDA
    ===================================================== */

    console.log(
        "%c✿ Skincare Coreano ✿",
        "color:#c98595;font-size:20px;font-weight:bold;"
    );

    console.log(
        "Sitio web cargado correctamente."
    );

});