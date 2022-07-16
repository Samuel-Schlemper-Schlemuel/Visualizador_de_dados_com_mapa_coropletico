const height = 600
const width = 950

const svg = d3.select(document.getElementById('grafico'))
                .append('svg')
                .attr('height', height)
                .attr('width', width)

const g = svg.append('g')

d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json').then(educacao => {
    d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json').then(pais => {

        const EUA = topojson.feature(pais, pais.objects.counties)

        g.selectAll('path')
            .data(EUA.features)
            .enter()
            .append('path')
            .attr('class', 'county')
            .attr('d', d3.geoPath())
            
    })
})