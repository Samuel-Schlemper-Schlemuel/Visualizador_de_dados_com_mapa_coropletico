const p_height = 600
const p_width = 950
const tela_height = window.innerHeight - 150
const tela_width = window.innerWidth - 50
const pro_height = (tela_height / p_height)
const pro_width = (tela_width / p_width)
var height, width, scale

if(pro_height < pro_width){
    height = Math.max(tela_height, (p_height / 2))
    width = Math.max((p_width * pro_height), (p_width / 2))
    scale = Math.max(pro_height, 0.5)
} else {
    height = Math.max((p_height * pro_width), (p_height / 2))
    width = Math.max(tela_width, (p_width / 2))
    scale = Math.max(pro_width, 0.5)
}

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
            .attr('transform', `scale(${scale})`)
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