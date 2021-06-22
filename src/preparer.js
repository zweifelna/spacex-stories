/* Librairie permettant de convertir un CSV en JSON */

let csvToJson = require('convert-csv-to-json');
let fileInputName = 'spacex/rockets.csv'; 
let fileOutputName = 'spacex/json/rockets.json';

csvToJson.formatValueByType().fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);
