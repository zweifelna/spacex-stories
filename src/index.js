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

/* SET DES JEUX DE DONNEES */

const data_launches = _data_launches.map(d =>({
  rocket_id: d.rocket_id,
  date: d.date,
  success: d.success,
}))

/*** COLLECTION PAR ID DE FUSEES POUR LE PIE CHART***/
/* Falcon 1 */
const falcon1 = _data_launches.filter(d => d.rocket_id ==="5e9d0d95eda69955f709d1eb");
const falcon1_filter = falcon1.map(d =>({
  rocket: d.rocket_id,
  success: d.success,
}))

/* Falcon 9 */
const falcon9 = _data_launches.filter(d => d.rocket_id ==="5e9d0d95eda69973a809d1ec");
const falcon9_filter = falcon9.map(d =>({
  rocket: d.rocket_id,
  success: d.success,
}))

/* Falcon Heavy */
const falconHeavy = _data_launches.filter(d => d.rocket_id ==="5e9d0d95eda69974db09d1ed");
const falconHeavy_filter = falconHeavy.map(d =>({
  rocket: d.rocket_id,
  success: d.success,
}))

console.log(falcon9_filter)

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
    { status: 'Success', number: falcon1.filter(d => d.success == 1).length },
    { status: 'Unsuccess', number: falcon1.filter(d => d.success == 0).length },
  ]

  const LAUNCHES2 = [
    { status: 'Success', number: falcon1.filter(d => d.success == 1).length },
    { status: 'Unsuccess', number: falcon1.filter(d => d.success == 0).length },
  ]

  let test = falcon1.filter(d => d.success == 0).length;

  console.log(LAUNCHES);
    



  let getPieData = pie().value(d => d.population);
  let pieData = getPieData(LAUNCHES);
  
  
  const PIEWIDTH = WIDTH / 10
  const PIEHEIGHT = HEIGHT / 10
  
  const svgPie = select('#pie1')
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

 