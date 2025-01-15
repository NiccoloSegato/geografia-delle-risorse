/** 
 * GEOGRAFIA DELLE REGIONI
 * Politecnico di Milano - AA 2024/25
 * Design della Comunicazione - Laboratorio di Computer Grafica per l'Information Design
 * 
 * Authors: Bano, Chinni, Lages, Magalhaes, Menoni, Piganzoli, Segato
 * 
 * Questo script calcola i valori da rappresentare per la visualizzazione in percentuale
 * 
 * FUNZIONAMENTO DEL CALCOLO
 * Ogni regione ha un numero di pallini che rappresenta il 100% delle spese.
 * Viene quindi calcolata la percentuale per ogni categoria per ogni regione e il numero di pallini da rappresentare.
 */

// In questo array vengono salvate i valori percentuali per categoria della regione selezionata
let selectedPercentageData = [];

// In questo array vengono salvati i valori percentuali per categoria della regione di confronto

/**
 * Funzione per calcolare i valori percentuali
 */
function pLoadPercentages() {
    // Trovo gli indici delle regioni selezionate nell'array delle regioni
    let pSelRegionIndex = regions.indexOf(selectedRegion);
    let pCompRegionIndex = regions.indexOf(selectedComparison);

    // Calcolo il totale per le regioni selezionate
    let totalSelected = 0;
    let totalComparison = 0;
    for(let i = 0; i < regionDataLastYear[pSelRegionIndex].data.length; i++) {
        totalSelected += regionDataLastYear[pSelRegionIndex].data[i];
        totalComparison += regionDataLastYear[pCompRegionIndex].data[i];
    }

    // Calcolo i valori percentuali per la regione selezionata
    for(let i = 0; i < regionDataLastYear.length; i++) {
        let percentage = regionDataLastYear[pSelRegionIndex].data[i] / totalSelected * 100;
        selectedPercentageData.push(percentage);
    }

}


