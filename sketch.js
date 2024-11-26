let data;
let expenses;

let expensesLength;

let regions = ["Tutte le regioni"];
let categories = [];

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

  console.log(categories);
}

function draw() {
  background(220);

  text(regions.length, 100, 50);

  let x = 100;
  let y = 100;

  fill("black");
  textSize(windowWidth/45);
  
  // Stampo i nomi delle regioni
  for (let i = 0; i < regions.length; i++) {
    text(regions[i], x, y);
    y += windowWidth/40;
  }

  // Stampo le categorie di spesa
  x = 300;
  y = 100;

  for (let i = 0; i < categories.length; i++) {
    text(categories[i], x, y);
    y += windowWidth/40;
  }
}
