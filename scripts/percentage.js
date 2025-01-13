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

// In questo array verranno messi, in ordine di categoria, i valori percentuali
let percentageData = [];

/**
 * Funzione per calcolare i valori percentuali
 */
function pLoadPercentages() {
    // Iterazione per ogni regione
    for (let i = 0; i < regions.length; i++) {
        let region = regions[i];
        let regionData = [];
        let regionTotal = regionDataLastYear[regions.indexOf(selectedRegion) - 1].data[i].amount;

        console.log(region + " - " + regionTotal);

        console.log(regionDataLastYear);
    }

    console.log(percentageData);
}


