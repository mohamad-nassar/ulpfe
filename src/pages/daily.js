import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import prt from '../images/printing.png';
import $ from 'jquery';
import jQuery from 'jquery';
class daily extends Component{

state={
    'lst':[],
    'pen':[]
}

async componentDidMount(){
    var dtreq = new Date().toISOString().slice(0, 10)
    const req={dtask:dtreq}
const res=await axios.post('https://ulprojet.000webhostapp.com/api/getdaily',req,{
  headers: {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
  }
})
if(res.data.status===200){
    this.setState({
        'lst':res.data.lst,
        'pen':res.data.pen
    })
    console.log(this.state.pen)
}
jQuery.fn.extend({
    autoHeight: function () {
      function autoHeight_(element) {
        return jQuery(element)
          .css({ "height": "auto", "overflow-y": "hidden" })
          .height(element.scrollHeight);
      }
      return this.each(function() {
        autoHeight_(this).on("input", function() {
          autoHeight_(this);
        });
      });
    }
  });
  $("textarea").autoHeight()
}

render(){
 var lst=this.state.lst.map( (item)=>{
     if(item.status=="Rejected") return(
         <tr className="table-danger">
         <td>{item.serial}</td>
         <td>{item.NAME}</td>
         <td>{item.name}</td>
         <td>{item.namee}</td>
         <td>{item.date}</td>
         <td></td>
         </tr>
     )
     if(item.status=="Accepted") return(
        <tr className="table-success">
         <td>{item.serial}</td>
         <td>{item.NAME}</td>
         <td>{item.name}</td>
         <td>{item.namee}</td>
         <td>{item.date}</td>
         <td align="center"><Link className="btn btn-basic" to={`/print/acc/${item.id}`}><img src={prt} height="23px" width="23px" /></Link></td>
        </tr>
    )
 } )

var pen=this.state.pen.map( (item)=>{
    return(
        <tr>
        <td>{item.serial}</td>
         <td>{item.NAME}</td>
         <td><textarea cols="30" readOnly style={{ resize:'none',border:'none',backgroundColor:'transparent',outline:'none' }}>{item.type}</textarea></td>
         <td>{item.namee}</td>
         <td>{item.date}</td>
         <td align="center"><Link className="btn btn-basic" to={`/print/pen/${item.id}`}><img src={prt} height="23px" width="23px" /></Link></td>
         <td align="center"><Link to={`/result/${item.id}`}>Go to task</Link></td>
         </tr>
    )
} )

    var date=new Date();
    var fdate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
return(
    <div>
         <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
          <div style={{ textAlign:'center',alignContent:'center',width:'100%' }}><h1 style={{ color:'white' }}> <u>{fdate}</u> tasks</h1></div></nav>
          <br />
          <table className="table table-bordered table-striped">
          <tr className="table-primary">
            <th>Serial</th>
            <th>Patient</th>
            <th>Task</th>
            <th>Medical center</th>
            <th>Date</th>
            <th></th>
        </tr>
        {lst}
          </table>
          <br />
          <table className="table table-bordered table-striped table-warning">
          <tr>
            <th>Serial</th>
            <th>Patient</th>
            <th>Task</th>
            <th>Medical center</th>
            <th>Date</th>
            <th></th>
        </tr>
        {pen}
          </table>
    </div>

)
}
}

export default daily;