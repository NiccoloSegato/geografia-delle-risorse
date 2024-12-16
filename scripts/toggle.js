const descriptions = [
    "100.000.000€",
    "0,0087%"
];

let activeOption = 0;

function toggleView() {
    const toggleButton = document.getElementById("toggle-button");
    const toggleSwitch = document.getElementById("toggle-switch");
    const descriptionText = document.querySelector(".description .text");


    activeOption = 1 - activeOption; // Alterna entre 0 e 1
    toggleButton.classList.toggle("active", activeOption === 1);
    descriptionText.textContent = descriptions[activeOption];
}