import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';

class last extends Component{

    state={
        'lst':[]
    }

    componentDidMount=async()=>{
    const id=this.props.match.params.id;
    const res=await axios.get(`https://ulprojet.000webhostapp.com/api/getlast/${id}`);
    if(res.data.status===200){
        this.setState({
            'lst':res.data.test
        });
    }
    console.log(res.data.test)
}

    render(){
        var lst=this.state.lst.map( (item)=>{
            if(item.status==="Rejected")
            return(
            <tr className="table-danger">
            <td>{item.namee}</td>
            <td>{item.name}</td>
            <td>{item.NAME}</td>
            <td>{item.date}</td>
            </tr>
        )
        if(item.status==="Accepted")
        return(
        <tr className="table-success">
            <td>{item.namee}</td>
            <td>{item.name}</td>
            <td>{item.NAME}</td>
            <td>{item.date}</td>
        </tr>
    )
        })
        return (
            <div>
            <nav class="navbar bg-warning navbar-dark">
            <div style={{ textAlign:'center',width:'100%' }}><h1 style={{ color:'white' }}>Tests</h1></div></nav><br />
            <table className="table table-bordered table-warning">
            <tr><th>Medical center</th><th>Test name</th><th>Patient</th><th>Date</th></tr>  
            {lst}          
            </table>
            </div>
        )
    }

}

export default last;