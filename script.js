document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Efeito de Digitação (Typing Effect)
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

    // Inicia a digitação após um pequeno delay
    setTimeout(() => {
        typeEffect("text-dev", "Dev Back-End & Data Analyst", 100);
    }, 300);

    // 2. Ano no Footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 3. Sistema de Tooltip para as Skills
    const tooltip = document.getElementById("skillTooltip");
    const tipTitle = document.getElementById("skillTooltipTitle");
    const tipLevel = document.getElementById("skillTooltipLevel");
    const tipSummary = document.getElementById("skillTooltipSummary");
    const skills = document.querySelectorAll(".skill");

    function showTip(e, el) {
        tipTitle.textContent = el.querySelector('img').alt;
        tipLevel.textContent = el.dataset.level ? `Nível: ${el.dataset.level}` : "";
        tipSummary.textContent = el.dataset.summary || "";
        tooltip.hidden = false;

        // Posicionamento dinâmico baseado no mouse
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY + 15}px`;
    }

    skills.forEach(el => {
        el.addEventListener("mousemove", (e) => showTip(e, el));
        el.addEventListener("mouseleave", () => tooltip.hidden = true);
    });
});