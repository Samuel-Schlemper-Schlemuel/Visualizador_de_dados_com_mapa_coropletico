const p_height = 600
const p_width = 950
const tela_height = window.innerHeight - 190
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

const colors = ['rgb(255, 230, 230)', 'rgb(255, 200, 200)', 'rgb(255, 160, 160)', 'rgb(255, 120, 120)', 'rgb(255, 80, 80)', 'rgb(255, 40, 40)', 'rgb(255, 0, 0)']
const index = ['3%', '12%', '21%', '30%', '39%', '48%', '57%', '66%']
const grafico = d3.select(document.getElementById('grafico'))

const legend = grafico.append('svg')
                      .attr('id', 'legend')
                      .attr('height', 40)
                      .attr('width', 370)

grafico.append('br')

const svg = grafico.append('svg')
                .attr('height', height)
                .attr('width', width)

const g = svg.append('g')
const x = d3.scaleLinear().range([10, 360]).domain([0, 7])
const xlegend = d3.axisBottom(x).tickValues([0, 1, 2, 3, 4, 5, 6, 7]).tickFormat((d, i) => index[i])

d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json').then(educacao => {
    d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json').then(pais => {

        const EUA = topojson.feature(pais, pais.objects.counties)
        let id = -1

        g.selectAll('path')
            .data(EUA.features)
            .enter()
            .append('path')
            .attr('class', 'county')
            .attr('id', () =>  {
                id += 1
                return id
            })
            .attr('d', d3.geoPath())
            .attr('transform', `scale(${scale})`)
            .attr('data-fips', (d, i) => d.id)
            .attr('data-education', function(d, i){
                for(indece in educacao){
                    object = educacao[indece]
                    if(d.id === object.fips){
                        return object.bachelorsOrHigher
                    }
                }
            })
            .style('fill', (d, i) => { 
                for(indece in educacao){
                    object = educacao[indece]
                    if(d.id == object.fips){
                        return object.bachelorsOrHigher < 12 ? colors[0] : object.bachelorsOrHigher < 21 ? colors[1] :  object.bachelorsOrHigher < 30 ? colors[2] : object.bachelorsOrHigher < 39 ? colors[3] : object.bachelorsOrHigher < 48 ? colors[4] : object.bachelorsOrHigher < 57 ? colors[5] : colors[6]
                    }
                }
            })
            .on('mouseover', function(d, i){
                d3.select(this)
                  .style('fill', 'black')
                
                d3.select(document.getElementById('grafico'))
                  .append('div')
                  .attr('id', 'tooltip')
                  .attr('data-education', function(){
                    for(indece in educacao){
                        object = educacao[indece]
                        if(d.id === object.fips){
                            return object.bachelorsOrHigher
                        }
                    }
                })
                  .html(function(){
                    for(indece in educacao){
                        object = educacao[indece]
                        if(d.id === object.fips){
                            return `${object.area_name}, ${object.state}: ${object.bachelorsOrHigher}%`
                        }
                    }
                  })
                  .style('top', $(`#${this.id}`).offset().top - 20 + 'px')
                  .style('left', $(`#${this.id}`).offset().left + 20 + 'px')
            })
            .on('mouseout', function(d, i){
                d3.select(this)
                  .style('fill', (d, i) => { 
                      for(indece in educacao){
                          object = educacao[indece]
                          if(d.id == object.fips){
                              return object.bachelorsOrHigher < 12 ? colors[0] : object.bachelorsOrHigher < 21 ? colors[1] :  object.bachelorsOrHigher < 30 ? colors[2] : object.bachelorsOrHigher < 39 ? colors[3] : object.bachelorsOrHigher < 48 ? colors[4] : object.bachelorsOrHigher < 57 ? colors[5] : colors[6]
                          }
                      }
                  })

                const div = document.getElementById('tooltip')
                div.parentNode.removeChild(div)
            })   

        legend.selectAll('rect')
              .data(colors)
              .enter()
              .append('rect')
              .attr('height', 20)
              .attr('width', 50)
              .attr('x', (d, i) => i*50 + 10)
              .style('fill', (d, i) => d)

        legend.append('g')
              .attr('transform', 'translate(0, 20)')  
              .call(xlegend)  
    })
})