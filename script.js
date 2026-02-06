document.addEventListener("DOMContentLoaded", () => {
    
    function typeEffect(elementId, text, speed) {
        let i = 0;
        const element = document.getElementById(elementId);
        if(!element) return;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.append(text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    setTimeout(() => {
        typeEffect("text-dev", "Dev Back-End & Data Analyst", 100);
    }, 300);


    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    const tooltip = document.getElementById("skillTooltip");
    const tipTitle = document.getElementById("skillTooltipTitle");
    const tipLevel = document.getElementById("skillTooltipLevel");
    const tipSummary = document.getElementById("skillTooltipSummary");
    const skills = document.querySelectorAll(".skill");

    function showTip(e, el) {
        tipTitle.textContent = el.querySelector('img').alt;
        tipLevel.textContent = el.dataset.level ? `Level: ${el.dataset.level}` : "";
        tipSummary.textContent = el.dataset.summary || "";
        tooltip.hidden = false;

        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY + 15}px`;
    }

    skills.forEach(el => {
        el.addEventListener("mousemove", (e) => showTip(e, el));
        el.addEventListener("mouseleave", () => tooltip.hidden = true);
    });
});


const projectsData = {
    email: {
        title: "Automated Email Sending",
        description: "Project developed in Python to automate billing via email using SMTP, data reading, validations, and custom templates.",
        repo: "https://github.com/plamin/Envio-De-Emails/tree/main"
    },
    dashboard: {
        title: "Data Analysis Dashboard",
        description: "Interactive dashboard for analyzing large volumes of data with Python, data processing, visualization, and insights generation.",
        repo: "https://github.com/plamin/graficos-laliga"
    },
    backend: {
        title: "Recruitment page back-end",
        description: "Sistema back-end para cadastro e login de candidatos e recrutadores, desenvolvido com Python e guardando os dados em JSON.",
        repo: "https://github.com/GS-2025-2/hayah/blob/main/HAYAH/backend/app.py"
    }

};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalRepo = document.getElementById("modalRepo");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        const project = projectsData[card.dataset.project];
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalRepo.href = project.repo;
        modal.classList.add("active");
    });
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
});
