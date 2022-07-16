const height = 600
const width = 950
const colors = ['rgb(255, 230, 230)', 'rgb(255, 200, 200)', 'rgb(255, 150, 150)', 'rgb(255, 100, 100)', 'rgb(255, 100, 100)', 'rgb(255, 50, 50)', 'rgb(255, 0, 0)']

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
            .style('fill', (d, i) => { 
                for(object in educacao){
                    object = educacao[object]
                    if(d.id == object.fips){
                        return object.bachelorsOrHigher < 12 ? colors[0] : object.bachelorsOrHigher < 21 ? colors[1] :  object.bachelorsOrHigher < 30 ? colors[2] : object.bachelorsOrHigher < 39 ? colors[3] : object.bachelorsOrHigher < 48 ? colors[4] : object.bachelorsOrHigher < 57 ? colors[5] : colors[6]
                    }
                }
            })   
    })
})