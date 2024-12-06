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
}

/**
 * Funzione che viene chiamata quando un label di regione viene cliccato
 * @param {MouseEvent} e Evento del click
 */
function pRegionClicked(e) {
    selectedRegion = e.target.innerHTML;
}