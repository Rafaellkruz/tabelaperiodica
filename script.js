document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const modal = document.getElementById('element-modal');
    const closeModalButton = document.querySelector('.close-button');

    // Elementos do Modal
    const elementName = document.getElementById('element-name');
    const elementSymbol = document.getElementById('element-symbol');
    const elementNumber = document.getElementById('element-number');
    const elementMass = document.getElementById('element-mass');
    const elementGroup = document.getElementById('element-group');
    const elementPeriod = document.getElementById('element-period');
    const elementCategory = document.getElementById('element-category');
    const elementSummary = document.getElementById('element-summary');


    // Carrega os dados dos elementos
    fetch('data/elements.json')
        .then(response => response.json())
        .then(data => {
            createPeriodicTable(data);
            addEventListeners(data);
            searchInput.addEventListener('input', () => filterElements(data));
            categoryFilter.addEventListener('change', () => filterElements(data));
        })
        .catch(error => console.error('Erro ao carregar dados dos elementos:', error));

    function createPeriodicTable(data) {
        const gridPositions = getGridPositions();
        data.forEach(element => {
            const elementDiv = document.createElement('div');
            const categoryClass = `category-${element.category.replace(/\s+/g, '-')}`; // Substitui espaços por hífens

            elementDiv.classList.add('element', categoryClass);
            elementDiv.style.gridColumn = gridPositions[element.number].column;
            elementDiv.style.gridRow = gridPositions[element.number].row;
            elementDiv.setAttribute('data-number', element.number);

            elementDiv.innerHTML = `
                <strong>${element.symbol}</strong>
                <small>${element.number}</small>
            `;
            periodicTable.appendChild(elementDiv);
        });
    }

    function getGridPositions() {
        // Define a posição de cada elemento na grade
        const positions = {
            1: { column: 1, row: 1 },    // Hidrogênio
            2: { column: 18, row: 1 },   // Hélio
            3: { column: 1, row: 2 },    // Lítio
            4: { column: 2, row: 2 },    // Berílio
            5: { column: 13, row: 2 },    // Boro
            6: { column: 14, row: 2 },   // Carbono
            7: { column: 15, row: 2 },   // Nitrogênio
            8: { column: 16, row: 2 },   // Oxigênio
            9: { column: 17, row: 2 },   // Flúor
            10: { column: 18, row: 2 },  // Neônio
            11: { column: 1, row: 3 },   // Sódio
            12: { column: 2, row: 3 },   // Magnésio
            13: { column: 13, row: 3 },  // Alumínio
            14: { column: 14, row: 3 },  // Silício
            15: { column: 15, row: 3 },  // Fósforo
            16: { column: 16, row: 3 },  // Enxofre
            17: { column: 17, row: 3 },  // Cloro
            18: { column: 18, row: 3 },  // Argônio
            19: { column: 1, row: 4 },   // Potássio
            20: { column: 2, row: 4 },   // Cálcio
            21: { column: 3, row: 4 },   // Escândio
            22: { column: 4, row: 4 },   // Titânio
            23: { column: 5, row: 4 },   // Vanádio
            24: { column: 6, row: 4 },   // Cromo
            25: { column: 7, row: 4 },   // Manganês
            26: { column: 8, row: 4 },   // Ferro
            27: { column: 9, row: 4 },   // Cobalto
            28: { column: 10, row: 4 },  // Níquel
            29: { column: 11, row: 4 },  // Cobre
            30: { column: 12, row: 4 },  // Zinco
            31: { column: 13, row: 4 },  // Gálio
            32: { column: 14, row: 4 },  // Germânio
            33: { column: 15, row: 4 },  // Arsênio
            34: { column: 16, row: 4 },  // Selênio
            35: { column: 17, row: 4 },  // Bromo
            36: { column: 18, row: 4 },  // Criptônio
            37: { column: 1, row: 5 },   // Rubídio
            38: { column: 2, row: 5 },   // Estrôncio
            39: { column: 3, row: 5 },   // Ítrio
            40: { column: 4, row: 5 },   // Zircônio
            41: { column: 5, row: 5 },   // Nióbio
            42: { column: 6, row: 5 },   // Molibdênio
            43: { column: 7, row: 5 },   // Tecnécio
            44: { column: 8, row: 5 },   // Rutênio
            45: { column: 9, row: 5 },   // Ródio
            46: { column: 10, row: 5 },  // Paládio
            47: { column: 11, row: 5 },  // Prata
            48: { column: 12, row: 5 },  // Cádmio
            49: { column: 13, row: 5 },  // Índio
            50: { column: 14, row: 5 },  // Estanho
            51: { column: 15, row: 5 },  // Antimônio
            52: { column: 16, row: 5 },  // Telúrio
            53: { column: 17, row: 5 },  // Iodo
            54: { column: 18, row: 5 },  // Xenônio
            55: { column: 1, row: 6 },   // Césio
            56: { column: 2, row: 6 },   // Bário
            57: { column: 3, row: 8 },   // Lantânio
            58: { column: 4, row: 8 },   // Cério
            59: { column: 5, row: 8 },   // Praseodímio
            60: { column: 6, row: 8 },   // Neodímio
            61: { column: 7, row: 8 },   // Promécio
            62: { column: 8, row: 8 },   // Samário
            63: { column: 9, row: 8 },   // Európio
            64: { column: 10, row: 8 },  // Gadolínio
            65: { column: 11, row: 8 },  // Térbio
            66: { column: 12, row: 8 },  // Disprósio
            67: { column: 13, row: 8 },  // Hólmio
            68: { column: 14, row: 8 },  // Érbio
            69: { column: 15, row: 8 },  // Túlio
            70: { column: 16, row: 8 },  // Itérbio
            71: { column: 17, row: 8 },  // Lutécio
            72: { column: 4, row: 6 },   // Háfnio
            73: { column: 5, row: 6 },   // Tântalo
            74: { column: 6, row: 6 },   // Tungstênio
            75: { column: 7, row: 6 },   // Rênio
            76: { column: 8, row: 6 },   // Ósmio
            77: { column: 9, row: 6 },   // Irídio
            78: { column: 10, row: 6 },  // Platina
            79: { column: 11, row: 6 },  // Ouro
            80: { column: 12, row: 6 },  // Mercúrio
            81: { column: 13, row: 6 },  // Tálio
            82: { column: 14, row: 6 },  // Chumbo
            83: { column: 15, row: 6 },  // Bismuto
            84: { column: 16, row: 6 },  // Polônio
            85: { column: 17, row: 6 },  // Astato
            86: { column: 18, row: 6 },  // Radônio
            87: { column: 1, row: 7 },   // Frâncio
            88: { column: 2, row: 7 },   // Rádio
            89: { column: 3, row: 9 },   // Actínio
            90: { column: 4, row: 9 },   // Tório
            91: { column: 5, row: 9 },   // Protactínio
            92: { column: 6, row: 9 },   // Urânio
            93: { column: 7, row: 9 },   // Netúnio
            94: { column: 8, row: 9 },   // Plutônio
            95: { column: 9, row: 9 },   // Amerício
            96: { column: 10, row: 9 },  // Cúrio
            97: { column: 11, row: 9 },  // Berquélio
            98: { column: 12, row: 9 },  // Califórnio
            99: { column: 13, row: 9 },  // Einstênio
            100: { column: 14, row: 9 }, // Férmio
            101: { column: 15, row: 9 }, // Mendelévio
            102: { column: 16, row: 9 }, // Nobélio
            103: { column: 17, row: 9 }, // Laurêncio
            104: { column: 4, row: 7 },  // Rutherfordium
            105: { column: 5, row: 7 },  // Dúbnio
            106: { column: 6, row: 7 },  // Seabórgio
            107: { column: 7, row: 7 },  // Bóhrio
            108: { column: 8, row: 7 },  // Hássio
            109: { column: 9, row: 7 },  // Meitnério
            110: { column: 10, row: 7 }, // Darmstádio
            111: { column: 11, row: 7 }, // Roentgênio
            112: { column: 12, row: 7 }, // Copernício
            113: { column: 13, row: 7 }, // Nihônio
            114: { column: 14, row: 7 }, // Fleróvio
            115: { column: 15, row: 7 }, // Moscóvio
            116: { column: 16, row: 7 }, // Livermório
            117: { column: 17, row: 7 }, // Tenessino
            118: { column: 18, row: 7 },  // Oganessônio
        };
        return positions;
    }

    function addEventListeners(data) {
        const elementDivs = document.querySelectorAll('.element');
        elementDivs.forEach(div => {
            div.addEventListener('click', () => {
                const elementNumber = div.getAttribute('data-number');
                const elementData = data.find(el => el.number == elementNumber);
                showModal(elementData);
            });
        });
    }

    function showModal(element) {
        elementName.textContent = element.name;
        elementSymbol.textContent = element.symbol;
        elementNumber.textContent = element.number;
        elementMass.textContent = element.atomic_mass;
        elementGroup.textContent = element.group;
        elementPeriod.textContent = element.period;
        elementCategory.textContent = element.category;
        elementSummary.textContent = element.summary;
        modal.style.display = 'flex';
    }

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    function filterElements(data) {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const elementDivs = document.querySelectorAll('.element');

        elementDivs.forEach(div => {
            const elementNumber = div.getAttribute('data-number');
            const elementData = data.find(el => el.number == elementNumber);

            const matchesSearch = elementData.name.toLowerCase().includes(searchTerm) || elementData.symbol.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || elementData.category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });

    }
});


