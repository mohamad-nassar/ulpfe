import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
class accepted extends Component{

    state={
        'rej':[]
    }
    componentDidMount= async()=>{
        const res=await axios.get('https://ulprojet.000webhostapp.com/api/getrej');
        if(res.data.status===200){
            this.setState({
                'rej':res.data.rej
            })
        }
        console.log(this.state.rej);
    }

    render(){
        const res=this.state.rej.map( (item)=>{
        return(
            <tr>
            <td>{item.serial}</td>
            <td>{item.NAME}</td>
            <td>{item.name}</td>
            <td>{item.namee}</td>
            <td>{item.date}</td>
            </tr>
        )
        })
        return(
            <div>
            <nav class="navbar bg-danger navbar-dark">
            <div style={{ textAlign:'center',width:'100%' }}><h1 style={{ color:'white' }}>All Rjected test</h1></div></nav><br />
            <table className="table table-bordered table-danger">
           <tr><th>Serial number</th>
            <th>Patient</th>
            <th>Task</th>
            <th>Medical center</th>
            <th>Date</th></tr>
            {res}
            </table>
            </div>
        )
    }
}

export default accepted;