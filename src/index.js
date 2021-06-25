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
  extent,
  event
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

/* Falcon 9 */
const falcon9 = _data_launches.filter(d => d.rocket_id ==="5e9d0d95eda69973a809d1ec");

/* Falcon Heavy */
const falconHeavy = _data_launches.filter(d => d.rocket_id ==="5e9d0d95eda69974db09d1ed");

const data_rockets = _data_rockets.map(d =>({
  name: d.name,
  height: d.height_mt,
  diameter: d.diameter_mt,
}))


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
  /**** PIE 1*****/
  
  const LAUNCHES_FALCON1 = [
    { status: 'Success', number: falcon1.filter(d => d.success ===true).length },
    { status: 'Unsuccess', number: falcon1.filter(d => d.success ===false).length },
  ]

  let getPie1Data = pie().value(d => d.number);
  let pie1Data= getPie1Data(LAUNCHES_FALCON1);
  
  const PIE1WIDTH = WIDTH / 10
  const PIE1HEIGHT = HEIGHT / 5
  
  const svgPie = select('#pie1')
    .append('svg')
    .attr('viewBox', `0 0 ${PIE1WIDTH} ${PIE1HEIGHT}`)
  
    const arcCreator = arc()
    .innerRadius(0)
    .outerRadius(PIE1HEIGHT / 2 - 10) // pour que tout le camembert soit visible
  
  const color = ({ data }) => {
    switch (data.status) {
      case 'Success': return 'white'
      case 'Unsuccess': return '#2a507d'
      default: return 'black'
    }
  }
  
  const group1 = svgPie.append('g')
    .attr('transform', `translate(${PIE1HEIGHT / 2}, ${PIE1HEIGHT / 2})`)
  
    group1.selectAll('path')
    .data(pie1Data)
    .enter()
    .append('path')
    .attr('d', arcCreator)
    .attr('fill', color)
  


   /***************************************************/
  /**** PIE 2 *****/
  
  const LAUNCHES_FALCON9 = [
    { status: 'Success', number: falcon9.filter(d => d.success ===true).length },
    { status: 'Unsuccess', number: falcon9.filter(d => d.success ===false).length },
  ]

  let getPie2Data = pie().value(d => d.number);
  let pie2Data = getPie2Data(LAUNCHES_FALCON9);
  
  const PIE2WIDTH = WIDTH / 10
  const PIE2HEIGHT = HEIGHT / 5
  
  const svgPie2 = select('#pie2')
    .append('svg')
    .attr('viewBox', `0 0 ${PIE2WIDTH} ${PIE2HEIGHT}`)
  
    const arcCreator2 = arc()
    .innerRadius(0)
    .outerRadius(PIE2HEIGHT / 2 - 10) // pour que tout le camembert soit visible
  
  const color2 = ({ data }) => {
    switch (data.status) {
      case 'Success': return 'white'
      case 'Unsuccess': return '#2a507d'
      default: return 'black'
    }
  }
  
  const group2 = svgPie2.append('g')
    .attr('transform', `translate(${PIE2HEIGHT / 2}, ${PIE2HEIGHT / 2})`)
  
  group2.selectAll('path')
    .data(pie2Data)
    .enter()
    .append('path')
    .attr('d', arcCreator2)
    .attr('fill', color2)
  

 /***************************************************/
  /**** PIE 3 *****/
  
  const LAUNCHES_FALCONHEAVY = [
    { status: 'Success', number: falconHeavy.filter(d => d.success ===true).length },
    { status: 'Unsuccess', number: falconHeavy.filter(d => d.success ===false).length },
  ]

  let getPie3Data = pie().value(d => d.number);
  let pie3Data = getPie3Data(LAUNCHES_FALCONHEAVY);
  
  const PIE3WIDTH = WIDTH / 10
  const PIE3HEIGHT = HEIGHT / 5
  
  const svgPie3 = select('#pie3')
    .append('svg')
    .attr('viewBox', `0 0 ${PIE3WIDTH} ${PIE3HEIGHT}`)
  
    const arcCreator3 = arc()
    .innerRadius(0)
    .outerRadius(PIE3HEIGHT / 2 - 10) // pour que tout le camembert soit visible
  
  const color3 = ({ data }) => {
    switch (data.status) {
      case 'Success': return 'white'
      case 'Unsuccess': return '#2a507d'
      default: return 'black'
    }
  }
  
  var div = select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);
  
  const group3 = svgPie3.append('g')
    .attr('transform', `translate(${PIE3HEIGHT / 2}, ${PIE3HEIGHT / 2})`)
  
  group3.selectAll('path')
    .data(pie3Data)
    .enter()
    .append('path')
    .attr('d', arcCreator3)
    .attr('fill', color3)
  

  