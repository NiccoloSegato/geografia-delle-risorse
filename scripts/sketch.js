/** 
 * GEOGRAFIA DELLE REGIONI
 * Politecnico di Milano - AA 2024/25
 * Design della Comunicazione - Laboratorio di Computer Grafica per l'Information Design
 * 
 * Authors: Bano Katring, Chinni, Lages, Magalhaes, Menoni, Piganzoli, Segato
 * 
 * Questo script carica la rappresentazione grafica usando il framework p5.js
 */

let data;
let expenses;
let circles = [];
let color = "white";
let center;

let selectedRegion = "Tutte le regioni";
let selectedComparison = "Piemonte";
let isComparison = false;

let expensesLength;

let regions = ["Tutte le regioni"];
let categories = [];
let expensesPerCategory = [];
let totalExpenses = 0;

// Create a data struct to store the region name, and for each the category and the amount
let regionDataLastYear = [];

/**
 * Colors
 */
let backgroundColor = "#252129";
let textColor = "#ffffff";
let categoriesColors = ["#F87A01", "#C2858C", "#016647", "#FF467B", "#0001B1", "#7469B5", "#B22F75", "#FFAFD7", "FF040F", "#84B5BC", "#DABC36", "#A69FF2", "#28D3E9", "#6D8C6B",
                        "#F28C9C", "#2FA398", "#F7B429", "#527BFF", "#CFAD7C", "#BDD2FF", "#DFF304", "#EFBE9E", "#FFD459", "#02C3BD", "#B8FFFA", "#A1153E", "#E34516", "#B19B2C", "#FFFFFF"];

function preload() {
  data = loadTable('assets/dataset/uscite.csv', 'ssv', 'header');
}

function setup() {
  let canvas = createCanvas(windowWidth * 0.9, windowHeight - 230);
  canvas.parent("sketch-container");
  center = createVector(width / 2, height / 2);

  // Creazione dei cerchi
  for (let i = 0; i < 29; i++) {
    let r = windowWidth/100;
    let x = random(r, width - r); // Garantisce che il cerchio inizi entro i confini
    let y = random(r, height - r);
    circles.push({ x, y, r, velocity: createVector(0, 0) });
  }

  frameRate(60);

  expenses = data.getObject();
  expensesLength = Object.keys(expenses).length;

  // Carico i nomi delle regioni
  for (let i = 0; i < expensesLength; i++) {
    let region = expenses[i]['Regione per Dettaglio'];
    if (!regions.includes(region)) {
      regions.push(region);
    }
  }
  pDrawLabels();

  // Carico le categorie di spesa
  for (let i = 0; i < expensesLength; i++) {
    let category = expenses[i]['Settore'];
    if (!categories.includes(category)) {
      categories.push(category);
    }
  }

  // Eseguo il calcolo dei pallini per ogi categoria di spesa
  for(let i = 0; i < categories.length; i++) {
    let sum = 0;
    for(let j = 0; j < expensesLength; j++) {
      if(expenses[j]['Settore'] == categories[i] && expenses[j]['Anno'] == '2021') {
        try {
          sum += parseInt(expenses[j]['S - Consolidato SPA']);
        }
        catch {
          sum += 0;
        }
      }
    }
    expensesPerCategory.push(sum);
  }

  // Calcolo il totale delle spese
  for(let i = 0; i < expensesPerCategory.length; i++) {
    totalExpenses += expensesPerCategory[i];
  }

  // Ordino i dati dentro all'array dell'ultimo anno
  for(let i = 1; i < regions.length; i++) {
    let region = {
      region: regions[i],
      data: []
    };
    for(let j = 0; j < categories.length; j++) {
      let sum = 0;
      for(let k = 0; k < expensesLength; k++) {
        if(expenses[k]['Regione per Dettaglio'] == regions[i] && expenses[k]['Settore'] == categories[j] && expenses[k]['Anno'] == '2021') {
          try {
            sum += parseInt(expenses[k]['S - Consolidato SPA']);
          }
          catch {
            sum += 0;
          }
        }
      }
      region.data.push({
        category: categories[j],
        amount: sum
      });
    }
    regionDataLastYear.push(region);
  }

  console.log(regionDataLastYear);
}

function draw() {
  background(0);

  if (isComparison) {
    drawComparisonView();
  } else {
    drawMainView();
  }
}

/**
 * Funzione per disegnare la visualizzazione di confronto
 */
function drawComparisonView() {
  let area = windowWidth * 0.40 * (windowHeight - 230);
  let circleArea = area / ((totalExpenses / 100000000) * 1.8);
  let radius = Math.sqrt(circleArea / Math.PI);

  let positionX = radius;
  let positionY = radius;

  for(let i = 0; i < expensesPerCategory.length; i++) {
    for(let j = 0; j < expensesPerCategory[i]; j+= 100000000) {
      if(selectedRegion == "Tutte le regioni") {
        fill(categoriesColors[i]);
      }
      else {
        if(j < regionDataLastYear[regions.indexOf(selectedRegion) - 1].data[i].amount) {
          fill(categoriesColors[i]);
        }
        else {
          fill('gray');
        }
      }
      circle(positionX, positionY, radius * 2);
      positionX += radius * 2;
      if(positionX > windowWidth * 0.40) {
        positionX = radius;
        positionY += radius * 2;
      }
    }
  }

  positionX = radius + windowWidth * 0.50;
  positionY = radius;

  for(let i = 0; i < expensesPerCategory.length; i++) {
    for(let j = 0; j < expensesPerCategory[i]; j+= 100000000) {
      if(j < regionDataLastYear[regions.indexOf(selectedComparison) - 1].data[i].amount) {
        fill(categoriesColors[i]);
      }
      else {
        fill('gray');
      }
      circle(positionX, positionY, radius * 2);
      positionX += radius * 2;
      if(positionX > windowWidth * 0.9) {
        positionX = radius + windowWidth * 0.50;
        positionY += radius * 2;
      }
    }
  }
}

/**
 * Funzione per disegnare i cerchi della visualizzazione principale
 */
function drawMainView() {
  // Applica forze di attrazione e risoluzione delle collisioni
  for (let circle of circles) {
    let force = p5.Vector.sub(center, createVector(circle.x, circle.y));
    force.setMag(0.5); // Forza attrattiva verso il centro
    circle.velocity.add(force);
    circle.velocity.limit(100); // Limita la velocità massima

    circle.x += circle.velocity.x;
    circle.y += circle.velocity.y;

    // Controlla i confini
    if (circle.x - circle.r < 0) circle.x = circle.r;
    if (circle.x + circle.r > width) circle.x = width - circle.r;
    if (circle.y - circle.r < 0) circle.y = circle.r;
    if (circle.y + circle.r > height) circle.y = height - circle.r;

    // Risolvi le collisioni
    for (let other of circles) {
      if (circle !== other) {
        let d = dist(circle.x, circle.y, other.x, other.y);
        let minDist = circle.r + other.r;
        if (d < minDist) {
          let overlap = minDist - d;
          let direction = p5.Vector.sub(
            createVector(circle.x, circle.y),
            createVector(other.x, other.y)
          );
          direction.setMag(overlap / 2);
          circle.x += direction.x;
          circle.y += direction.y;
          other.x -= direction.x;
          other.y -= direction.y;
        }
      }
    }
  }

  // Disegna i cerchi
  noStroke();
  for (let circle of circles) {
    fill(color);
    ellipse(circle.x, circle.y, circle.r * 2);
  }
  fill('white');

  let area = windowWidth * 0.9 * (windowHeight - 230);
  let circleArea = area / ((totalExpenses / 100000000) * 1.8);
  let radius = Math.sqrt(circleArea / Math.PI);

  let positionX = radius;
  let positionY = radius;

  let counter = 0;
  for(let i = 0; i < expensesPerCategory.length; i++) {
    for(let j = 0; j < expensesPerCategory[i]; j+= 100000000) {
      if(selectedRegion == "Tutte le regioni") {
        fill(categoriesColors[i]);
      }
      else {
        if(j < regionDataLastYear[regions.indexOf(selectedRegion) - 1].data[i].amount) {
          fill(categoriesColors[i]);
        }
        else {
          fill('gray');
        }
      }
      circle(positionX, positionY, radius * 2);
      counter++;
      positionX += radius * 2;
      if(positionX > windowWidth * 0.9) {
        positionX = radius;
        positionY += radius * 2;
      }
    }
  }
}

function windowResized() {
  
}


