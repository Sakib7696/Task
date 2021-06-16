import React, { Component } from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import ReactApexChart  from 'react-apexcharts'
import axios from 'axios';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const numberFormat = (value) =>
new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits:0
}).format(value);

export default class Page2 extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{},
            show:false,
            loading:false,
            call : 1,
            options: {
              chart: {
                type: 'donut',
              },
              colors: ['#148da0', '#5bafbd', '#a1d1d9', '#0e6370'],
              labels:['employee1','employee2','employee3','employee4'],
              tooltip: {
                y: {
                  formatter: function(value) {
                    return numberFormat(value);
                  }
                }
              },
              plotOptions: {
                pie: {
                  startAngle: 0,
                  endAngle: 360,
                  customScale: 0.7,
                  offsetY: -30,
                  donut: {
                    size:'42%',
                  }
                }
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              legend: {
                fontSize: '14px',
                fontWeight:600,
                offsetY: 50,
                formatter: function(val, opts) {
                  return val + " - " + numberFormat(opts.w.globals.series[opts.seriesIndex])
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 450
                  },
                  plotOptions: {
                    pie: {
                      startAngle: 0,
                      endAngle: 360,
                      customScale: 0.9,
                      offsetY: 0,
                    }
                  },
                  legend: {
                    position: 'bottom',
                    offsetY: 0,
                    formatter: function(val, opts) {
                        return val + " - " + numberFormat(opts.w.globals.series[opts.seriesIndex])
                      }
                  }
                }
              },
              {
                breakpoint: 900,
                options: {
                  chart: {
                    width: 500
                  },
                  plotOptions: {
                    pie: {
                      startAngle: 0,
                      endAngle: 360,
                      customScale: 0.9,
                      offsetY: 0,
                    }
                  },
                }
              },
              {
                breakpoint: 1200,
                options: {
                  chart: {
                    width: 600
                  },
                  plotOptions: {
                    pie: {
                      startAngle: 0,
                      endAngle: 360,
                      customScale: 0.9,
                      offsetY: 0,
                    }
                  },
                }
              }]
            },
        }
    }

    handleClickArg = () => {
        this.state.call = 0
    }

    async componentDidMount(){
        this.setState({loading:true})
            setTimeout(
                () => {
                    if(this.state.call===1){
                    axios.get(`https://mocki.io/v1/9bb4e253-36cc-4d9a-bda4-19bce367bc11`)
                    .then(({ data }) =>{
                        console.log(data)
                        this.setState({
                            data:data,
                            show:true,
                            loading:false
                        })
                    })
                    .catch(console.error)
                }
        },5000);
    }


    render() {
        let series = []
        Object.keys(this.state.data).map((val)=>{
            series.push(parseInt(this.state.data[val].salary))
        })
        return (
            <div className='main-div'>
                <div className='card'>
                    <div className='prime-btn'>
                        <Link to={'/'} onClick = {this.handleClickArg}><button>Go to Page1 &rarr;</button></Link>
                    </div>
                    {this.state.loading?(
                       <div style={{textAlign:'center',marginTop:100}}>
                            <Loader
                                type="ThreeDots"
                                color="#12A6FF"
                                height={100}
                                width={100}/>
                        </div>
                    ):(
                    <div>
                        {this.state.show?(
                            <div className='donut-div'>
                                <div className='donut-head'>Donut Chart</div>
                                <div className='donut'>
                                    <ReactApexChart options={this.state.options} series={series} type="donut" width={'60%'}/>
                                </div>
                            </div>
                        ):(<span></span>)}
                    </div>)}
                </div>
            </div>
        )
    }
}
