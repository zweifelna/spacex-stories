import {
  axisLeft,
  select,
  scaleLinear,
  max,
  interpolateNumber,
  arc,
  pie,
  timeParse,
  scaleTime,
  line,
  extent
} from 'd3'

import _data_cores from './spacex/json/cores.json';
import _data_launches from './spacex/json/launches.json';
import _data_rockets from './spacex/json/rockets.json';

// const data_cores = _data_cores.map(d =>({
//   reuse: 
// }))


const data_launches = _data_launches.map(d =>({
  rocket_id: d.rocket_id,
  date: d.date,
  success: d.success,
}))

const data_rockets = _data_rockets.map(d =>({
  name: d.name,
  height: d.height_mt,
  diameter: d.diameter_mt,
}))

console.log(data_rockets)

const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5
const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50
const MARGIN_TOP = 50
const BAR_HEIGHT = HEIGHT - MARGIN_TOP - MARGIN_BOTTOM
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / data_rockets.length

const svg = select('#fusees')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const yScale = scaleLinear()
  .domain([0, max(data_rockets, d => d.height)])
  .range([BAR_HEIGHT, 0])

const g = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`)

g.selectAll('rect')
  .data(data_rockets)
  .enter()
  .append('rect')
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.height))
  .attr('height', d => BAR_HEIGHT - yScale(d.height))
  .attr('fill', 'steelblue')

g.selectAll('text')
  .data(data_rockets)
  .enter()
  .append('text')
  .text(d => d.name)
  .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', BAR_HEIGHT + MARGIN_BOTTOM / 2)
  .attr('text-anchor', 'middle')
  .attr("font-family", "Arial")

const axisY = axisLeft().scale(yScale)
  .tickFormat(d => `${d}m`)
  .ticks(5)

svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT - 3}, ${MARGIN_TOP})`)
  .call(axisY)

const imagesG = g.append('g')
  .attr('transform', `translate(${-BAR_WIDTH / 2}, -15)`)


/******************************************/


const creationDate = select("#numbers")
  .append("svg");
  
let date = creationDate.append("text")
  .attr("x", "50%")
  .attr("y", "30%")
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .attr("font-size", "4em")
  .attr("font-family", "Arial")
  .text(1);

  let name = creationDate.append("text")
  .attr("x", "50%")
  .attr("y", "70%")
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .attr("font-size", "2em")
  .attr("font-family", "Arial")
  .text("Création de SpaceX");
  
  date.transition()
  .tween("text", function() {
     let selection = select(this);    // selection of node being transitioned
     let start = 2002; // start value prior to transition
     let end = 2002;                     // specified end value
     let interpolator = interpolateNumber(start,end); // d3 interpolator

     return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
     
  })
  .duration(2500);

const rockets = select("#numbers")
  .append("svg");
  
let count = rockets.append("text")
  .attr("x", "50%")
  .attr("y", "30%")
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .attr("font-size", "4em")
  .attr("font-family", "Arial")
  .text(1);

let label = rockets.append("text")
  .attr("x", "50%")
  .attr("y", "70%")
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .attr("font-size", "2em")
  .attr("font-family", "Arial")
  .text("Modèles de fusées");
  
count.transition()
  .tween("text", function() {
     let selection = select(this);    // selection of node being transitioned
     let start = 0; // start value prior to transition
     let end = data_rockets.length;                     // specified end value
     let interpolator = interpolateNumber(start,end); // d3 interpolator

     return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
     
  })
  .duration(2500);


const launches = select("#numbers")
  .append("svg");
  
let total = launches.append("text")
  .attr("x", "50%")
  .attr("y", "30%")
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .attr("font-size", "4em")
  .attr("font-family", "Arial")
  .text(1);

  let description = launches.append("text")
  .attr("x", "50%")
  .attr("y", "70%")
  .attr("dominant-baseline", "middle")
  .attr("text-anchor", "middle")
  .attr("font-size", "2em")
  .attr("font-family", "Arial")
  .text("Décollages réussis");
  
  total.transition()
  .tween("text", function() {
     let selection = select(this);    // selection of node being transitioned
     let start = 0; // start value prior to transition
     let end = data_launches.length;                     // specified end value
     let interpolator = interpolateNumber(start,end); // d3 interpolator

     return function(t) { selection.text(Math.round(interpolator(t))); };  // return value
     
  })
  .duration(2500);


  /***************************************************/
  
  const LAUNCHES = [
    { nom: 'Lausanne', population: 138905 },
    { nom: 'Yverdon-les-Bains', population: 30143 },
    { nom: 'Montreux', population: 26574 },
    { nom: 'Renens', population: 21036 },
    { nom: 'Nyon', population: 20533 },
    { nom: 'Vevey', population: 19827 },
  ]

  let getPieData = pie().value(d => d.population);
  let pieData = getPieData(LAUNCHES);
  
  
  const PIEWIDTH = WIDTH / 10
  const PIEHEIGHT = HEIGHT / 10
  
  const svgPie = select('#pies')
    .append('svg')
    .attr('viewBox', `0 0 ${PIEWIDTH} ${PIEHEIGHT}`)
  
    const arcCreator = arc()
    .innerRadius(0)
    .outerRadius(PIEHEIGHT / 2 - 10) // pour que tout le camembert soit visible
  
  const color = ({ data }) => {
    switch (data.nom) {
      case 'Lausanne': return 'gold'
      case 'Yverdon-les-Bains': return 'limegreen'
      case 'Montreux': return 'violet'
      case 'Renens': return 'indianred'
      case 'Nyon': return 'pink'
      case 'Vevey': return 'indigo'
      default: return 'black'
    }
  }
  
  const group = svgPie.append('g')
    .attr('transform', `translate(${PIEHEIGHT / 2}, ${PIEHEIGHT / 2})`)
  
  group.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arcCreator)
    .attr('fill', color)
  
  // un texte pour chaque tranche
  // group.selectAll('text')
  //   .data(pieData)
  //   .enter()
  //   .append('text')
  //   // .centroid permet de trouver le centre de la tranche
  //   .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
  //   .attr('text-anchor', 'middle')
  //   .text(d => d.data.nom)
  
  // la légende
  const legend = svgPie.append('g')
    .attr('transform', `translate(${PIEHEIGHT-10})`)
  
  const RECT_WIDTH = 20


  /***********************************/

  const lineChart = select('#line')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
  
  // spécifier le format de date
  const formatDate = timeParse('%Y-%m-%d')
  const DATA = bitcoinPrices.map(d => ({ ...d, date: formatDate(d.date) })) // <===  DONNEES A MODIFIER AVEC LES BONNES !!
  
  // échelle de temps pour l'axe X
  const scaleX = scaleTime()
    .range([0, WIDTH])
    .domain(extent(DATA, d => d.date))
  
  // échelle linéaire pour le prix de cloture
  const scaleY = scaleLinear()
    .range([HEIGHT, 0])
    .domain(extent(DATA, d => d.close))

  // la fonction d3.line() pour créer l'attribut "d"
  const linePathCreator = line() 
    // quelle échelle, quelle donnée pour l'axe X
    .x(d => scaleX(d.date))
    // quelle échelle, quelle donnée pour l'axe Y
    .y(d => scaleY(d.close))

  // ajouter une courbe au SVG
  const courb = lineChart.append('path')
    // utiliser linePathCreator pour créer l'attribut "d"
    .attr('d', linePathCreator(DATA))
    .attr('fill', 'none')
    .attr('stroke', 'red')