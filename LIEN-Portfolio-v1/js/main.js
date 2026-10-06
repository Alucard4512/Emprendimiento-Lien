/* ==========================================
   LIEN
   Creative & Digital Studio
========================================== */


/* ==========================================
   AÑO AUTOMÁTICO
========================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ==========================================
   HEADER AL HACER SCROLL
========================================== */

const header = document.querySelector(".header");

if (header) {

    const updateHeader = () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateHeader);

    updateHeader();
}


/* ==========================================
   MENÚ MÓVIL
========================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

    });


    /* CERRAR MENÚ AL PRESIONAR UN LINK */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

        });

    });

}


/* ==========================================
   ANIMACIONES AL HACER SCROLL
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");

if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* ==========================================
   MINI CARRUSELES DE SERVICIOS
========================================== */

const miniCarousels =
    document.querySelectorAll(".mini-carousel");


miniCarousels.forEach(carousel => {

    /* --------------------------------------
       ELEMENTOS DEL CARRUSEL
    -------------------------------------- */

    const track =
        carousel.querySelector(".carousel-track");

    const slides =
        Array.from(
            carousel.querySelectorAll(".carousel-slide")
        );

    const prevButton =
        carousel.querySelector(".carousel-prev");

    const nextButton =
        carousel.querySelector(".carousel-next");

    const dots =
        Array.from(
            carousel.querySelectorAll(".carousel-dot")
        );


    /* Si el carrusel está incompleto,
       no ejecutamos el resto */

    if (!track || slides.length === 0) {
        return;
    }


    /* --------------------------------------
       POSICIÓN ACTUAL
    -------------------------------------- */

    let currentSlide = 0;


    /* --------------------------------------
       ACTUALIZAR CARRUSEL
    -------------------------------------- */

    function updateMiniCarousel() {

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        /* ACTUALIZAR PUNTOS */

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    /* --------------------------------------
       SIGUIENTE
    -------------------------------------- */

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        updateMiniCarousel();

    }


    /* --------------------------------------
       ANTERIOR
    -------------------------------------- */

    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                slides.length - 1;

        }

        updateMiniCarousel();

    }


    /* --------------------------------------
       BOTÓN SIGUIENTE
    -------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            nextSlide
        );

    }


    /* --------------------------------------
       BOTÓN ANTERIOR
    -------------------------------------- */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            previousSlide
        );

    }


    /* --------------------------------------
       CLICK EN LOS PUNTOS
    -------------------------------------- */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (index < slides.length) {

                currentSlide = index;

                updateMiniCarousel();

            }

        });

    });


    /* ======================================
       SOPORTE TÁCTIL
       Deslizar con el dedo
    ====================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    track.addEventListener(

        "touchstart",

        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },

        {
            passive: true
        }

    );


    track.addEventListener(

        "touchend",

        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },

        {
            passive: true
        }

    );


    function handleSwipe() {

        const swipeDistance =
            touchStartX - touchEndX;

        const minimumSwipe = 50;


        /* DESLIZAR HACIA LA IZQUIERDA */

        if (swipeDistance > minimumSwipe) {

            nextSlide();

        }


        /* DESLIZAR HACIA LA DERECHA */

        if (swipeDistance < -minimumSwipe) {

            previousSlide();

        }

    }


    /* --------------------------------------
       INICIALIZAR
    -------------------------------------- */

    updateMiniCarousel();

});


/* ==========================================
   FIN
========================================== */