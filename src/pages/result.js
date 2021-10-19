import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import tru from '../images/check.png';
import fal from '../images/reject.png';
import prt from '../images/printing.png';

class result extends Component{

state={
    'rlt':[],
    'acc':'',
    'rej':'',
    'tst':[],
    'serial':'',
    'pat':'',
    'test':'',
    'date':'',
    'labmed':'',
    'tests':''
}

handleInput =(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
 }

async componentDidMount(){
   const id=this.props.match.params.id;
   const res=await axios.get(`https://ulprojet.000webhostapp.com/api/result/${id}`);
         if(res.data.status===200)
         {
            this.setState({
             rlt:res.data.rlt,
             tst:res.data.tst
         })
         var serial="";
    var pat="";
    var date="";
    var labmed="";
    var test="";
    
    this.state.rlt.map( (item)=>{
        serial=item.serial
        pat=item.NAME
        labmed=item.namee
        date=item.date
    })


    this.setState({
    'serial':serial,
    'pat':pat,
    'labmed':labmed,
    'test':test,
    'date':date,
    'tests':[],
    })
}
}

acc=()=>{
    var a = document.getElementById("tst");
    if(a.value!="")
    {
    document.getElementById("acc").innerHTML="* "+a.value+"\n"+document.getElementById("acc").value;
    a.remove(a.selectedIndex);
    this.setState({
        'acc':document.getElementById("acc").value
    })
}
}

rej=()=>{
   
    var a = document.getElementById("tst");
    if(a.value!="")
    {
    document.getElementById("rej").innerHTML="* "+a.value+"\n"+document.getElementById("rej").value;
    this.setState({
        'rej':document.getElementById("rej").value
    })
    a.remove(a.selectedIndex);
}
}

ver=async()=>{
    const id=this.props.match.params.id;
    var dtask=new Date().toISOString().slice(0, 10);
    var a = document.getElementById("tst").options.length;
    if(a>0) document.getElementById("btnerr").click();
    else{
        const id=this.props.match.params.id;
        var b=this.state.acc
        var c=this.state.rej
        var arrb=b.split('* ');
        var arrc=c.split('* ');
            for(var i=1;i<arrb.length;i++){
                arrb[i]=arrb[i].replace(/(\r\n|\n|\r)/gm,"")
                const req={serial:this.state.serial,patient:this.state.pat,medical:this.state.labmed,date:this.state.date,tst:arrb[i],dtask:dtask,status:'Accepted'}
                const res=await axios.post(`https://ulprojet.000webhostapp.com/api/setres/${id}`,req,{
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
                    }
                })
            }
            for(var i=1;i<arrc.length;i++){
                arrc[i]=arrc[i].replace(/(\r\n|\n|\r)/gm,"")
                const req={serial:this.state.serial,patient:this.state.pat,medical:this.state.labmed,date:this.state.date,tst:arrc[i],dtask:dtask,status:'Rejected'}
                const res=await axios.post(`https://ulprojet.000webhostapp.com/api/setres/${id}`,req,{
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
                    }
                })
            }
            window.location.href="/pending";
        
    }
}

render(){
   var test=this.state.tst.map( (item)=>{
       if(item!="")
        return <option value={item}>{item}</option>
 } )
    return(
        <div>
             <nav className="navbar navbar-expand-sm bg-warning navbar-dark">
          <div style={{ textAlign:'center',alignContent:'center',width:'100%' }}><h1 style={{ color:'white' }}>Select accepted and rejected test</h1></div></nav>
            <br /><table className="table-warning" align="center" cellPadding="10px">
            <tr>
                <th>Serial Number:</th>
                <td><input type="text" className="form-control" value={this.state.serial} style={{ width:'300px',backgroundColor:'white' }} readOnly /></td>
                <th>Patient:</th>
                <td><input type="text" value={this.state.pat} className="form-control" style={{ width:'300px',backgroundColor:'white' }} readOnly /></td>
            </tr>
            <tr>
            <th>Date:</th>
                <td><input type="date" value={this.state.date} className="form-control" style={{ width:'300px',backgroundColor:'white' }} readOnly /></td>
           
            </tr>
            <tr>
                <th>Tests:</th>
                <td>
                    <select className="form-control" id="tst" style={{ width:'300px',backgroundColor:'white' }}>
                    {test}
                    </select>
                </td>
                <th>Medical center:</th>
                <td><input type="text" className="form-control" value={this.state.labmed} style={{ width:'300px',backgroundColor:'white' }} readOnly /></td>
            </tr>
            <tr><td></td>
                <td align="center"><button className="btn btn-success" onClick={this.acc}><img src={tru} height="20px" width="20px"></img></button>&nbsp;<button className="btn btn-danger" onClick={this.rej}><img src={fal} height="20px" width="20px"></img></button></td>
            </tr>
            <tr>
                <th style={{ color:'green' }}>Accepted tests:</th>
                <td><textarea cols="40" rows="7" className="form-control" name="acc" id="acc" style={{ resize:'none',backgroundColor:'white' }} readOnly></textarea></td>
                <th style={{ color:'red' }}>Rejected tests:</th>
                <td><textarea cols="40" rows="7" name="rej" id="rej" className="form-control" style={{ resize:'none',backgroundColor:'white' }} readOnly></textarea></td>
            </tr>
            <tr>
            <td colSpan="4" align="center"><button className="btn btn-outline-primary" onClick={this.ver}>Verify</button>&nbsp;<button className="btn btn-outline-info"><img src={prt} height="20px" width="20px"></img></button></td>
            </tr>
            </table>
            
            <button type="button" id="btnerr" style={{ visibility:'hidden' }} class="btn btn-primary" data-toggle="modal" data-target="#errmodal">
  Open modal
</button>
            <div class="modal fade" id="errmodal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h3 class="modal-title" style={{ color:'red' }}>Alert!</h3>
      </div>

      <div class="modal-body">
      <strong>Please give a result of all tests before verify.</strong>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>

        </div>
    )
}
}

export default result;