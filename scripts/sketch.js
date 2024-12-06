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

let selectedRegion = "Tutte le regioni";

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
  let canvas = createCanvas(windowWidth * 0.9, windowHeight - 250);
  canvas.parent("sketch-container");

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
}

function draw() {
  background('black');

  fill(textColor);
  textFont('forma-djr-text');

  // Stampo la regione selezionata
  text(selectedRegion, 50, 230);
}