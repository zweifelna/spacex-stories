import {
  axisLeft,
  select,
  scaleLinear,
  max,
} from 'd3'

const DATA = [
  { nom: 'Lausanne', population: 138905 },
  { nom: 'Yverdon-les-Bains', population: 30143 },
  { nom: 'Montreux', population: 26574 },
  { nom: 'Renens', population: 21036 },
  { nom: 'Nyon', population: 20533 },
  { nom: 'Vevey', population: 19827 },
]

const img = {
  viewBox: '0 0 92.08 61.99',
  d: 'M68.5.5H23.58L.5 35.38v26.11h91.08V35.38L68.5.5z',
}

const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5
const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50
const MARGIN_TOP = 50
const BAR_HEIGHT = HEIGHT - MARGIN_TOP - MARGIN_BOTTOM
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length

const svg = select('#fusees')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const yScale = scaleLinear()
  .domain([0, max(DATA, d => d.population)])
  .range([BAR_HEIGHT, 0])


const g = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, ${MARGIN_TOP})`)

g.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.population))
  .attr('height', d => BAR_HEIGHT - yScale(d.population))
  .attr('fill', 'steelblue')

g.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.nom)
  .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', BAR_HEIGHT + MARGIN_BOTTOM / 2)
  .attr('text-anchor', 'middle')

const axisY = axisLeft().scale(yScale)
  .tickFormat(d => `${d / 1000}k`)
  .ticks(5)

svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT - 3}, ${MARGIN_TOP})`)
  .call(axisY)

const imagesG = g.append('g')
  .attr('transform', `translate(${-BAR_WIDTH / 2}, -15)`)

imagesG.selectAll('svg')
  .data(DATA)
  .enter()
  .append('svg')
  .attr('viewBox', img.viewBox)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', d => yScale(d.population) - HEIGHT / 2)
  .append('path')
    .attr('d', img.d)
    .attr('fill', 'steelblue')


/******************************************/

const test = select('#fusees2')
    .append("circle")
    .attr("cx",150)
    .attr("cy",50)
    .attr("r",30)
    .attr("fill", "red");
    
    test.transition()
    .duration(2000)
    .attr("fill", "blue");

