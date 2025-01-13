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
}