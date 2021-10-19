import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import {$} from 'jquery';

class find extends Component{


   state={
       'lst':[],
       'pat':'',
       'all':'',
       'fdate':'',
       'tdate':''
   }


   handleInput =(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
 }

   async componentDidMount(){
        const res=await axios.get('https://ulprojet.000webhostapp.com/api/getall');
        if(res.data.status===200){
            this.setState({
                lst:res.data.lst
            })
        }
    }

    srh=async()=>{
        var a=document.getElementById("pat").value;
        var b=document.getElementById("al").value;
        var c=document.getElementById("fdate").value;
        var d=document.getElementById("tdate").value;
            const req={serial:a,all:b,fdate:c,tdate:d}
            const res=await axios.post('https://ulprojet.000webhostapp.com/api/getsrh',req)
            if(res.data.status===200){
                this.setState({
                    lst:res.data.lst
                })
            }
        if(a==="" && b==="" && c==="" && d==="") this.componentDidMount()
    }
    render(){
        var lst=this.state.lst.map( (item)=>{
            if(item.status==="Accepted")
            return(
                <tr className="table-success">
                    <td>{item.cust}</td>
                    <td>{item.NAME}</td>
                    <td>{item.name}</td>
                    <td>{item.namee}</td>
                    <td>{item.date}</td>
                </tr>
            )
            if(item.status==="Rejected")
            return(
                <tr className="table-danger">
                    <td>{item.cust}</td>
                    <td>{item.NAME}</td>
                    <td>{item.name}</td>
                    <td>{item.namee}</td>
                    <td>{item.date}</td>
                </tr>
            )
        } )
        return(
            <div>
                 <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <div style={{ textAlign:'center',alignContent:'center',width:'100%' }}><h1 style={{ color:'white' }}>Find all tests</h1></div></nav>
            <br />
            <table>
                <tr>
                <th>Patient Name:</th>
                <td><input type="text" id="pat" name="pat" onChange={this.handleInput} style={{ width:'260px' }} placeholder="patient name" className="form-control" onChange={this.chng} /></td>
                <th>All:</th>
                <td><input type="text" id="al" name="all" onChange={this.handleInput} style={{ width:'350px' }} placeholder="Medical center or test name" className="form-control" onChange={this.chng} /></td>
                <th>From date:</th>
                <td><input type="date" id="fdate" name="fdate" onChange={this.handleInput} style={{ width:'290px' }} placeholder="Medical center, patient name or test name" className="form-control" onChange={this.chng} /></td>
                <th>To date:</th>
                <td><input type="date" id="tdate" name="tdate" onChange={this.handleInput} style={{ width:'290px' }} placeholder="Medical center, patient name or test name" className="form-control" onChange={this.chng} /></td>
                </tr><br />
                <tr>
                    <td colSpan="8" align="center"><button className="btn btn-primary" onClick={this.srh}>Search</button></td>
                </tr>
            </table>
            <br />
            
            <table class="table table-bordered table-striped table-primary" id="tbl">
        <tr>
            <th>Serial</th>
            <th>Patient</th>
            <th>Task</th>
            <th>Medical center</th>
            <th>Date</th>
        </tr>
       {lst}
        </table>
            </div>
        )
    }
}

export default find;