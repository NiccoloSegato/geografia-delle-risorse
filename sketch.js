let data;
let expenses;

let expensesLength;

let regions = ["Tutte le regioni"];
let categories = [];

/**
 * Colors
 */
let backgroundColor = "#252129";
let textColor = "#ffffff";

function preload() {
  data = loadTable('assets/dataset/uscite.csv', 'ssv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  expenses = data.getObject();
  expensesLength = Object.keys(expenses).length;

  // Carico i nomi delle regioni
  for (let i = 0; i < expensesLength; i++) {
    let region = expenses[i]['Regione per Dettaglio'];
    if (!regions.includes(region)) {
      regions.push(region);
    }
  }

  // Carico le categorie di spesa
  for (let i = 0; i < expensesLength; i++) {
    let category = expenses[i]['Settore'];
    if (!categories.includes(category)) {
      categories.push(category);
    }
  }
}

function draw() {
  background(backgroundColor);

  fill(textColor);
  textSize(50);
  textFont('Georgia');
  textStyle(BOLD);
  text("La geografia delle risorse", 50, 80);
  textSize(20);
  textFont('forma-djr-text');
  textStyle(NORMAL);
  text("Differenze regionali nelle spese pubbliche", 50, 120);
  textFont('Ortica');
  textSize(18);
  text("Testo descrittivo con delle informazioni sul progetto\nDa modificare e definire", 50, 160);
  textFont('forma-djr-text');

  let y = 230;

  let labelDistance = (windowHeight - y - 50)/20;
  
  // Stampo "Tutte le regioni"
  let allRegionsLabel = createP(regions[0]);
  allRegionsLabel.id('selected-label');
  allRegionsLabel.addClass('region-label');
  allRegionsLabel.position(50, y);

  y += labelDistance;

  // Stampo i nomi delle regioni
  for (let i = 1; i < regions.length; i++) {
    let regionLabel = createP(regions[i]);
    regionLabel.addClass('region-label');
    regionLabel.position(50, y);

    y += labelDistance
  }
}
