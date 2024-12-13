let totalExpenses=0;
let circlePositions = []; // Array per memorizzare le posizioni calcolate

function setup() {
  let canvas = createCanvas(windowWidth * 0.9, windowHeight - 230);
  canvas.parent("sketch-container");

  frameRate(0.5);

  // Resto del codice di setup...

  // Calcolo delle posizioni dei cerchi una sola volta
  precomputeCirclePositions();
}

function precomputeCirclePositions() {
  circlePositions = []; // Resetta le posizioni
  let area = windowWidth * 0.9 * (windowHeight - 230);
  let circleArea = area / ((totalExpenses / 100000000) * 1.8);
  let radius = Math.sqrt(circleArea / Math.PI);

  let baseX = radius * 3; // Spostamento iniziale di ogni agglomerato
  let baseY = radius * 3;
  let padding = radius * 4; // Distanza tra i gruppi

  for (let i = 0; i < expensesPerCategory.length; i++) {
    let currentAmount = selectedRegion === "Tutte le regioni"
                        ? expensesPerCategory[i]
                        : regionDataLastYear[regions.indexOf(selectedRegion) - 1].data[i].amount;
    let positionX = baseX;
    let positionY = baseY;

    for (let j = 0; j < currentAmount; j += 100000000) {
      circlePositions.push({
        x: positionX,
        y: positionY,
        color: categoriesColors[i]
      });
      positionX += radius * 2;

      // Se si esce dall'area dedicata al gruppo, vai a capo
      if (positionX > baseX + 8 * radius * 2) { // Limite orizzontale del gruppo
        positionX = baseX;
        positionY += radius * 2;
      }
    }

    // Sposta la base per il prossimo gruppo
    baseX += 10 * radius * 2; // Sposta l'agglomerato successivo
    if (baseX > width - 10 * radius) { // Nuova riga se non c'è spazio
      baseX = radius * 3;
      baseY += 10 * radius * 2;
    }
  }
}

function draw() {
  background(backgroundColor);
  noStroke();

  // Disegna i cerchi in base alle posizioni pre-computate
  for (let position of circlePositions) {
    fill(position.color);
    circle(position.x, position.y, radius * 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.9, windowHeight - 230);
  precomputeCirclePositions(); // Ricalcola le posizioni
}
