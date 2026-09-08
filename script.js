const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const track = document.getElementById("project-track");
if (track) {
    const slides = [...track.querySelectorAll(".project-slide")];
    const previous = document.getElementById("project-prev");
    const next = document.getElementById("project-next");
    const dots = [...document.querySelectorAll("[data-slide]")];
    const status = document.getElementById("carousel-status");
    let current = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function update() {
        const left = track.getBoundingClientRect().left;
        current = slides.reduce((best, slide, index) =>
            Math.abs(slide.getBoundingClientRect().left - left) <
            Math.abs(slides[best].getBoundingClientRect().left - left) ? index : best, 0);
        previous.disabled = current === 0;
        next.disabled = current === slides.length - 1;
        status.textContent = `Projeto ${current + 1} de ${slides.length}`;
        dots.forEach((dot, index) => {
            if (index === current) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
        });
        slides.forEach((slide, index) => {
            slide.querySelector(".project-open").tabIndex = index === current ? 0 : -1;
        });
    }

    function goTo(index) {
        const target = Math.max(0, Math.min(index, slides.length - 1));
        track.scrollTo({
            left: slides[target].offsetLeft - slides[0].offsetLeft,
            behavior: reducedMotion.matches ? "instant" : "smooth"
        });
    }
    previous.addEventListener("click", () => goTo(current - 1));
    next.addEventListener("click", () => goTo(current + 1));
    dots.forEach((dot, index) => dot.addEventListener("click", () => goTo(index)));
    track.addEventListener("keydown", event => {
        if (event.target !== track) return;
        const targets = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
        if (event.key in targets) {
            event.preventDefault();
            goTo(targets[event.key]);
        }
    });
    let scrollFrame;
    track.addEventListener("scroll", () => {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener("resize", () => {
        track.scrollTo({ left: slides[current].offsetLeft - slides[0].offsetLeft, behavior: "instant" });
        update();
    });
    update();
}
document.querySelectorAll(".project-open").forEach(button => {
    const dialog = document.getElementById(`dialog-${button.dataset.project}`);
    button.addEventListener("click", () => {
        dialog.showModal();
        document.body.classList.add("dialog-open");
    });
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
        const box = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right ||
            event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => {
        document.body.classList.remove("dialog-open");
        button.focus({ preventScroll: true });
    });
});

const dataIntro = document.getElementById("data-intro");
if (dataIntro) {
    const points = [...dataIntro.querySelectorAll(".data-point")];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pending = false;
    function paintIntro() {
        pending = false;
        const distance = Math.max(1, dataIntro.offsetHeight - window.innerHeight);
        const progress = motion.matches ? 0 : Math.min(1, Math.max(0, -dataIntro.getBoundingClientRect().top / distance));
        dataIntro.style.setProperty("--intro-progress", progress.toFixed(3));
        const ease = progress * progress * (3 - 2 * progress);
        points.forEach(point => {
            const { x, y, tx, ty } = point.dataset;
            point.setAttribute("cx", Number(x) + (Number(tx) - Number(x)) * ease);
            point.setAttribute("cy", Number(y) + (Number(ty) - Number(y)) * ease);
        });
    }
    function scheduleIntro() {
        if (!pending) {
            pending = true;
            requestAnimationFrame(paintIntro);
        }
    }
    window.addEventListener("scroll", scheduleIntro, { passive: true });
    window.addEventListener("resize", scheduleIntro);
    motion.addEventListener("change", scheduleIntro);
    document.querySelectorAll(".intro-enter").forEach(link => link.addEventListener("click", event => {
        event.preventDefault();
        const target = document.getElementById("top");
        target.scrollIntoView({ behavior: motion.matches ? "instant" : "smooth" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        history.replaceState(null, "", "#top");
    }));
    paintIntro();
}
