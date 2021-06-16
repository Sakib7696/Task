import React, { PureComponent } from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class Page1 extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            data:{},
            loading:false,
            call:1
        }
    }
handleClickArg = () => {
    this.state.call = 0
}
componentDidMount (){
    this.setState({loading:true})
    setTimeout(
        () => {
           if(this.state.call===1){
                axios.get(`https://dummyapi.io/data/api/user`,
                { headers: { 'app-id': '60c9448aa9b59526b9010cfc'} })
                .then(({ data }) =>{
                    console.log(data)
                this.setState({
                    data:data.data,
                    loading:false
                })
                })
                .catch(console.error)
            }
    },5000);
}

    render() {
        return (
            <div className='main-div'>
               <div className='card'>
                    <div className='prime-btn'>
                        <Link to={'/page2'} onClick = {this.handleClickArg}><button>Go to Page2 &rarr;</button></Link>
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
                    <div class="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                              {Object.keys(this.state.data).map((val)=>{
                                  return(
                                      <tr>
                                          <td className='tab-img'><img src={this.state.data[val].picture} alt=""/></td>
                                          <td>{this.state.data[val].title}</td>
                                          <td>{this.state.data[val].firstName}</td>
                                          <td>{this.state.data[val].lastName}</td>
                                          <td>{this.state.data[val].email}</td>
                                      </tr>
                                  )
                                })}
                            </tbody>
                        </table>
                    </div>)}
               </div>
            </div>
        )
    }
}
