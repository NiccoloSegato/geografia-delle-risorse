/** 
 * GEOGRAFIA DELLE REGIONI
 * Politecnico di Milano - AA 2024/25
 * Design della Comunicazione - Laboratorio di Computer Grafica per l'Information Design
 * 
 * Authors: Bano, Chinni, Lages, Magalhaes, Menoni, Piganzoli, Segato
 * 
 * Questo script si occupa di gestire il funzionamento del toggle per la visualizzazione in percentuale
 */


const descriptions = [
    "100.000.000€",
    "0,0087%"
];

let activeOption = 0;

function tToggleView() {
    const toggleButton = document.getElementById("toggle-button");
    const descriptionText = document.querySelector(".description .text");

    activeOption = 1 - activeOption; // Alterna tra 0 e 1
    toggleButton.classList.toggle("active", activeOption === 1);
    descriptionText.textContent = descriptions[activeOption];

    if(activeOption === 1 && percentageData.length === 0) {
        pLoadPercentages();
    }
}