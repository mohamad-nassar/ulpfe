import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import prt from '../images/printing.png'
class accepted extends Component{

    state={
        'acc':[]
    }
    componentDidMount= async()=>{
        const res=await axios.get('https://ulprojet.000webhostapp.com/api/getacc');
        if(res.data.status===200){
            this.setState({
                'acc':res.data.acc
            })
        }
        console.log(this.state.acc);
    }

    render(){
        const res=this.state.acc.map( (item)=>{
        return(
            <tr>
            <td>{item.serial}</td>
            <td>{item.NAME}</td>
            <td>{item.name}</td>
            <td>{item.namee}</td>
            <td>{item.date}</td>
            <th><Link className="btn btn-basic" to={`print/acc/${item.id}`}><img src={prt} height="20px" width="20px" /></Link></th>
            </tr>
        )
        })
        return(
            <div>
            <nav class="navbar bg-success navbar-dark">
            <div style={{ textAlign:'center',width:'100%' }}><h1 style={{ color:'white' }}>All accepted test</h1></div></nav><br />
            <table className="table table-bordered table-success">
           <tr><th>Serial number</th>
            <th>Patient</th>
            <th>Task</th>
            <th>Medical center</th>
            <th>Date</th>
            <th>Action</th></tr>
            {res}
            </table>
            </div>
        )
    }
}

export default accepted;