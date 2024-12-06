/**
 * GEOGRAFIA DELLE REGIONI
 * Politecnico di Milano - AA 2024/25
 * Design della Comunicazione - Laboratorio di Computer Grafica per l'Information Design
 * 
 * Authors: Bano Katring, Chinni, Lages, Magalhaes, Menoni, Piganzoli, Segato
 * 
 * Questo script carica tutti gli elementi grafici della pagina, ad eccezione della rappresentazione grafica al centro
 */

/**
 * Funzione per rappresentare i label delle regioni dopo che sono state caricate dallo sketch
 */
function pDrawLabels() {
    // Salvo il div che conterrà i label delle regioni
    let pRegionsContainer = document.getElementById('regions-list');

    // Creo un label per ogni regione
    for (let i = 0; i < regions.length; i++) {
        let pRegionLabel = document.createElement('p');
        pRegionLabel.innerHTML = regions[i];
        pRegionLabel.classList.add('region-label');
        pRegionLabel.addEventListener('click', pRegionClicked);
        pRegionsContainer.appendChild(pRegionLabel);
    }

    // Imposto "Tutte le regioni" come regione selezionata
    let pAllRegionsLabel = document.getElementsByClassName('region-label')[0];
    pAllRegionsLabel.classList.add('selected-label');
}

/**
 * Funzione che viene chiamata quando un label di regione viene cliccato
 * @param {MouseEvent} e Evento del click
 */
function pRegionClicked(e) {
    // Rimuovo la classe selected-label da tutti i label delle regioni
    let regionLabels = document.getElementsByClassName('region-label');
    for (let i = 0; i < regionLabels.length; i++) {
        regionLabels[i].classList.remove('selected-label');
    }

    // Aggiungo la classe selected-label al label cliccato
    selectedRegion = e.target.innerHTML;
    e.target.classList.add('selected-label');

    console.log(e.target.innerHTML);
}