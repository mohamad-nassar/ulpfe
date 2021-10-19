import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import edt from '../images/edit.png';
import dlt from '../images/trash.png';
import rslt from '../images/choice.png';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import jQuery from 'jquery';

class accepted extends Component{

    state={
        'pen':[]
    }
    componentDidMount= async()=>{
        const res=await axios.get('https://ulprojet.000webhostapp.com/api/getpen');
        if(res.data.status===200){
            if(res.data.pen=='') window.location.href="/welcome";
            this.setState({
                'pen':res.data.pen
            })
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
    
    deletetsk=async(e, id)=>{
        const row=e.currentTarget;
        const res=await axios.delete(`https://ulprojet.000webhostapp.com/api/delete/${id}`);
        if(res.data.status===200){
            row.closest("tr").remove();
        }
        
    }
    
    render(){
        const res=this.state.pen.map( (item)=>{
        return(
            <tr id={item.id}>
            <td align="center">{item.serial}</td>
            <td align="center">{item.NAME}</td>
            <td style={{ maxWidth:'200px' }}><textarea cols="30" readOnly style={{ resize:'none',border:'none',backgroundColor:'transparent',outline:'none' }}>{item.type}</textarea></td>
            <td align="center">{item.namee}</td>
            <td align="center"><Link className="btn btn-link" to={`last/${item.id}`}>View</Link></td>
            <td><div style={{ float:'left' }}><Link to={`edit/${item.id}`} className="btn btn-outline-warning"><img src={edt} height="25px" width="25px"/></Link></div><div style={{ float:'right' }}><button onClick={(e)=>this.deletetsk(e, item.id)} className="btn btn-outline-danger"><img src={dlt} height="25px" width="25px"/></button></div></td>
            <td align="center"><Link to={`result/${item.id}`} className="btn btn-outline-info" ><img src={rslt} height="25px" width="25px" /></Link></td>
            </tr>
            
        )
        })
        return(
            <div>
            <nav class="navbar bg-warning navbar-dark">
            <div style={{ textAlign:'center',width:'100%' }}><h1 style={{ color:'white' }}>All pending test</h1></div></nav><br />
            <table className="table table-bordered table-warning">
            <tr><th>Serial Number</th><th>Patient</th><th>Test name</th><th>Medical center name</th><th>Last same test</th><th>Action</th><th>Result</th></tr>
            {res}
            </table>
            </div>
        )
    }
}

export default accepted;