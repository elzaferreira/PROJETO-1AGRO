// Banco de Dados de Países (Array de Objetos de Alta Fidelidade)
const paisesData = [
    {
        nome: "Brasil",
        bandeira: "🇧🇷",
        capital: "Brasília",
        populacao: "213,5 Milhões",
        moeda: "Real (BRL)",
        lingua: "Português",
        pontoTuristico: "Cristo Redentor (Rio de Janeiro)"
    },
    {
        nome: "Japão",
        bandeira: "🇯🇵",
        capital: "Tóquio",
        populacao: "122,4 Milhões",
        moeda: "Iene (JPY)",
        lingua: "Japonês",
        pontoTuristico: "Monte Fuji"
    },
    {
        nome: "França",
        bandeira: "🇫🇷",
        capital: "Paris",
        populacao: "66,7 Milhões",
        moeda: "Euro (EUR)",
        lingua: "Francês",
        pontoTuristico: "Torre Eiffel"
    },
    {
        nome: "Austrália",
        bandeira: "🇦🇺",
        capital: "Camberra",
        populacao: "27,2 Milhões",
        moeda: "Dólar Australiano (AUD)",
        lingua: "Inglês",
        pontoTuristico: "Ópera de Sydney"
    },
    {
        nome: "Egito",
        bandeira: "🇪🇬",
        capital: "Cairo",
        populacao: "120,1 Milhões",
        moeda: "Libra Egípcia (EGP)",
        lingua: "Árabe",
        pontoTuristico: "Pirâmides de Gizé"
    }
];

// Banco de Dados de Curiosidades (Acordeão)
const curiosidadesData = [
    {
        titulo: "Qual é o país com a maior população em 2026?",
        conteudo: "A Índia lidera o ranking global de população em 2026, com aproximadamente 1,47 bilhão de habitantes, superando a China que se encontra em uma tendência de leve declínio demográfico."
    },
    {
        titulo: "Qual país possui a maior quantidade de fusos horários?",
        conteudo: "A França detém o recorde mundial de maior número de fusos horários, totalizando 12 zonas diferentes. Isso ocorre devido aos seus diversos territórios ultramarinos espalhados pelos oceanos globais."
    },
    {
        titulo: "Existe algum país sem rios oficiais em seu território?",
        conteudo: "Sim, a Arábia Saudita é o maior país do mundo sem nenhum rio permanente. O abastecimento de água do país depende majoritariamente de aquíferos subterrâneos e de avançadas usinas de dessalinização da água do mar."
    }
];

// Inicialização dos Componentes
document.addEventListener("DOMContentLoaded", () => {
    renderCarousel();
    renderAccordion();
    initAccessibility();
    initCarouselNavigation();
});

// Renderizador do Carrossel
function renderCarousel() {
    const track = document.getElementById("carousel-track");
    if (!track) return;

    track.innerHTML = paisesData.map(pais => `
        <div class="country-card">
            <div class="card-header">
                <span class="flag-emoji" role="img" aria-label="Bandeira de ${pais.nome}">${pais.bandeira}</span>
                <div>
                    <h3 class="country-name">${pais.nome}</h3>
                    <p class="capital-name">Capital: ${pais.capital}</p>
                </div>
            </div>
            <div class="card-body">
                <div class="info-row">
                    <span class="info-label">População (2026):</span>
                    <span class="info-value">${pais.populacao}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Moeda Oficial:</span>
                    <span class="info-value">${pais.moeda}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Idioma Principal:</span>
                    <span class="info-value">${pais.lingua}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Ponto de Destaque:</span>
                    <span class="info-value">${pais.pontoTuristico}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Navegação do Carrossel
function initCarouselNavigation() {
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (!track || !prevBtn || !nextBtn) return;

    nextBtn.addEventListener("click", () => {
        const cardWidth = track.querySelector(".country-card").offsetWidth + 24;
        track.scrollLeft += cardWidth;
    });

    prevBtn.addEventListener("click", () => {
        const cardWidth = track.querySelector(".country-card").offsetWidth + 24;
        track.scrollLeft -= cardWidth;
    });
}

// Renderizador do Acordeão
function renderAccordion() {
    const group = document.getElementById("accordion-group");
    if (!group) return;

    group.innerHTML = curiosidadesData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="accordion-content-${index}">
                <span>${item.titulo}</span>
                <span class="accordion-icon" aria-hidden="true">+</span>
            </button>
            <div id="accordion-content-${index}" class="accordion-content" role="region">
                <p>${item.conteudo}</p>
            </div>
        </div>
    `).join('');

    // Eventos do Acordeão
    const headers = group.querySelectorAll(".accordion-header");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains("active");
            
            // Fecha todos os itens
            group.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("active"));
            group.querySelectorAll(".accordion-header").forEach(h => h.setAttribute("aria-expanded", "false"));

            if (!isOpen) {
                item.classList.add("active");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });
}

// Controle de Estado de Acessibilidade
function initAccessibility() {
    const btnContrast = document.getElementById("btn-contrast");
    const btnDecrease = document.getElementById("btn-font-decrease");
    const btnIncrease = document.getElementById("btn-font-increase");
    
    let currentFontSize = 16;

    // Alternador de Contraste
    if (btnContrast) {
        btnContrast.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
        });
    }

    // Gerenciador de Tamanho de Fonte com limites estritos (12px a 24px)
    if (btnIncrease) {
        btnIncrease.addEventListener("click", () => {
            if (currentFontSize < 24) {
                currentFontSize += 2;
                document.documentElement.style.setProperty("--base-font-size", `${currentFontSize}px`);
            }
        });
    }

    if (btnDecrease) {
        btnDecrease.addEventListener("click", () => {
            if (currentFontSize > 12) {
                currentFontSize -= 2;
                document.documentElement.style.setProperty("--base-font-size", `${currentFontSize}px`);
            }
        });
    }
}