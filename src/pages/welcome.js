  import '../App.css';
  import React from 'react';
  import {Component} from 'react';
  import Select from 'react-select';
  import axios from 'axios';
  import lout from '../images/exit.png';
  import info from '../images/info.png';
  import srh from '../images/search.png';
  import testt from '../images/add-file.png';
  import lb from '../images/tst.png';
  import sch from '../images/schedule.png';
import { Link } from 'react-router-dom';

  class welcome extends Component{
      
      state={
          'labmed':[],
          'test':[],
          'acc':'',
          'pen':'',
          'rej':'',
          'serial':'',
          'pat':[],
          'patient':'',
          'date':'',
          'medlab':'',
          'tst':''
      }

       handleInput=(e)=>{
         this.setState({
          [e.target.name]:e.target.value
         })
       }

       onchange = (value)=>{
        this.setState({ medlab: value.value })
       }

       changetest =(value)=>{
         document.getElementById("txttst").innerHTML="* "+value.label+"\n"+document.getElementById("txttst").value
         var a=document.getElementById("txttst").value
         this.setState({tst:a})
       }

      changepat =(value)=>{
        this.setState({patient:value.value})
      }

       changelist= ()=>{
         this.setState({
           tst:document.getElementById("txttst").value
         })
       }

      gopend =()=>{
        if(this.state.pen=='0' || this.state.pen=='')
        {
          document.getElementById("msg").innerHTML="<div class='alert alert-warning' style='position:static' id='#'><strong>Warning!</strong> No pending task finded.</div>"
          setTimeout(()=>{
            document.getElementById("msg").innerHTML="";
          },3000)
        }
      else window.location.href="/pending";
      }
 
      goacc=()=>{
        window.location.href="/accepted";
      }
    
      gorej=()=>{
        window.location.href="/rejected";
      }   

      gofind=()=>{
        window.location.href="/find";
      }

      goadmed=()=>{
        window.location.href="/add/lab";
      }
 
      async componentDidMount(){
        const res1=await axios.get('https://ulprojet.000webhostapp.com/api/getmed')
          if(res1.data.status===200){
              this.setState({
                'labmed':res1.data.medlab
              })
          }
          const res2=await axios.get('https://ulprojet.000webhostapp.com/api/gettest')
          if(res2.data.status===200){
              this.setState({
                'test':res2.data.test
              })
          }
          const res3=await axios.get('https://ulprojet.000webhostapp.com/api/gettot')
        this.setState({
          'pen':res3.data.pen,
          'acc':res3.data.acc,
          'rej':res3.data.rej,
        })
      }
 

      logout=()=>{
        window.location.href="/";
          localStorage.clear();
      }

      check=async()=>{
        if(document.getElementById('serial').value===""){
          document.getElementById('serial').style.borderColor="red"
          document.getElementById('serial').placeholder="Please fill before check"
        }
        const req={serial:this.state.serial};
       const res=await axios.post('https://ulprojet.000webhostapp.com/api/check',req,{
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
        }
    })
       if(res.data.status===200){
       this.setState({
         'pat':res.data.patt,
       })
       }
       else 
       {
        this.setState({
          'pat':res.data.patt,
        })
        document.getElementById("msg").innerHTML="<div class='alert alert-danger' style='position:static' id='#'><strong>Error!</strong> Serial Number uncorrect.</div>"
        setTimeout(function(){
          document.getElementById("msg").innerHTML="";
        },3000) 
      }
      }
      
      newtask=async()=>{
        this.setState({
          tst:document.getElementById("txttst").value
        })
        this.setState({patient:document.getElementById("patient").value})
        var dtreq = new Date().toISOString().slice(0, 10)
       if(this.state.serial==="" ||this.state.patient==="" ||this.state.date==="" ||this.state.tst==="" ||this.state.medlab===""){
         document.getElementById("errmodalbtn").click();
       }
       else {
        const req={serial:this.state.serial,patient:this.state.patient,date:this.state.date,test:this.state.tst,medlab:this.state.medlab,dtreq:dtreq}
        const res=await axios.post('https://ulprojet.000webhostapp.com/api/newrec',req,{
          headers: {
              'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
          }
      })
        if(res.data.status===200){
          document.getElementById("msg").innerHTML="<div class='alert alert-success' style='position:static' id='#'><strong>Success!</strong> New task successfully added.</div>";
          window.location.href="/welcome#";
          setTimeout(function(){
            document.getElementById("msg").innerHTML="";
          },3000)
         this.setState({
          'serial':'',
          'patient':'',
          'date':'',
          'medlab':'',
          'tst':''
         }) 
         this.componentDidMount()
        }
        
      }
      
    }
   

  render(){
      if(!localStorage.getItem('usr')) window.location.href="/";
      var email="";
      var name="";
      var serial="";
      var phone="";
  JSON.parse(localStorage.getItem('usr'),function(key,value){
      if(key==="email"){
          email=value;
      }
      if(key==="name"){
          name=value;
      }
      if(key==="phone"){
          phone=value;
      }
      if(key==="serial"){
          serial=value;
      }
  });
  var lab="";
  var tst="";
  var pat="";
  var acc=this.state.acc;
  var pen=this.state.pen;
  var rej=this.state.rej;

  pat=this.state.pat.map( (item)=>{
    return { value: item.id, label: item.NAME };
  });

  lab=this.state.labmed.map( (item)=>{
  return { value: item.id, label: item.namee };
  });

  tst=this.state.test.map( (item)=>{
    if(document.getElementById("slct").value==='lab'){
      if(item.type="Laboratory")
      return  { value: item.id, label: item.name };
    }
    if(document.getElementById("slct").value==='xray'){
      if(item.type="X-Ray")
      return  { value: item.id, label: item.name };
    }
    if(document.getElementById("slct").value==='ana'){
      if(item.type="Anatomic Pathology")
      return  { value: item.id, label: item.name };
    }
    if(document.getElementById("slct").value==='rad'){
      if(item.type="RadioOncology")
      return  { value: item.id, label: item.name };
    }
    }
  );

  return (
      <div>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark" style={{ position:'fixed',width:'100%' }}>
          <h1 style={{ color:'white' }}>Welcome Mr. <font style={{ textTransform:'capitalize' }}>{name}</font></h1></nav>
          <div style={{ float:'left', width:'15%',position:'fixed',marginTop:'4%' }}><nav class="navbar bg-dark navbar-dark" style={{  padding:'0.5%' }}>
          <table width="100%">
            <tr><td><button className="btn btn-warning" style={{ outline:'none',margin:'4.5%',width:'90%' }} onClick={this.gopend}><span class="badge badge-light">{pen}</span> Pending</button><br /></td></tr>
            <tr><td><button className="btn btn-success" style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }} onClick={this.goacc}><span class="badge badge-light">{acc}</span> Accepted</button><br /></td></tr>
            <tr><td><button className="btn btn-danger" style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }} onClick={this.gorej}><span class="badge badge-light">{rej}</span> Rejected</button><br /></td></tr>
            <tr><td><Link className="btn btn-light" to={'find/all'} style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }}><img src={srh} height="20px"/> Find task</Link><br /></td></tr>
            <tr><td><Link className="btn btn-light" style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }} to={'find/daily'}><img src={sch} height="20px"/> Daily task</Link><br /></td></tr>
            <tr><td><button className="btn btn-primary" style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }} onClick={this.goadmed}><img src={lb} height="20px"/> Add medical center</button><br /></td></tr>
            <tr><td><button className="btn btn-primary" style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }} data-toggle="modal" data-target="#ntest"><img src={testt} height="20px"/> Add new test</button><br /></td></tr>
            <tr><td><button type="button" class="btn btn-info" style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }} data-toggle="modal" data-target="#myModal"><img src={info} height="20px"/> Your information</button><br /></td></tr>
            <tr><td><button className="btn btn-secondary" style={{ outline:'none',margin:'4.5%',marginTop:'10%',width:'90%' }} onClick={this.logout}><img src={lout} height="20px"/> Logout</button><br /><br /></td></tr>
          </table>
          </nav></div>    
    <div style={{ float:'right', marginRight:'27%',marginTop:'7%'}}>
    <table align="center">
      <tr>
        <td colSpan="2" align="center" id="msg">
        
        </td>
      </tr>
      <tr>
        <th>Serial Number:</th>
        <td><div style={{ float:'left' }}><input value={this.state.serial} type="text" className="form-control" style={{ width:'300px' }} name="serial" id="serial" onChange={this.handleInput} /></div><div style={{ float:'right' }}><button className="btn btn-outline-success" onClick={this.check}>Check</button></div></td>
      </tr>
      <tr>
        <th>Patient Name:</th>
        <td><Select options={pat} onChange={this.changepat.bind(this)} style={{ width:'400px' }} placeholder="" name="patient" id="patient" /></td>
      </tr>
      <tr>
        <th>Date:</th>
        <td><input type="date" onChange={this.handleInput} value={this.state.date} className="form-control" style={{ width:'400px' }} name="date" /></td>
      </tr>
      <tr>
      <th>Doctor Name:</th>
        <td><input type="text"  className="form-control" style={{ width:'400px' }}/></td>
      </tr>
      <tr>
      <th>Specialisation:</th>
        <td><input type="text" className="form-control" style={{ width:'400px' }}/></td>
      </tr>
      <tr>
      <th>Doctor Phone:</th>
        <td><input type="text" className="form-control" style={{ width:'400px' }}/></td>
      </tr>
      <tr>
        <th>Medical Center:</th>
        <td><div style={{ width:'400px' }}><Select options={lab} onChange={this.onchange.bind(this)}  name="medlab" id="medlab" placeholder="" /></div></td>
      </tr>
      <tr>
        <th>Test type:</th>
        <td><select style={{ width:'400px' }} className="form-control" id="slct">
  <option value="lab">Laboratory</option>
  <option value="xray">X-Ray</option>
  <option value="rad">RadioOncology</option>
  <option value="ana">Anatomic Pathology</option>
  </select></td>
      </tr>
      <tr>
      <th>Test Name:</th>
      <td><div style={{ width:'400px' }}><Select options={tst} placeholder="" name="tst" onChange={this.changetest.bind(this)} id="test" /></div></td>
      </tr>
      <tr>
        <td></td>
        <td>
          <textarea name="tst" onChange={this.handleInput} value={this.state.tst} cols="40" rows="10" className="form-control" style={{ resize:'none',backgroundColor:'white' }} id="txttst" readOnly ></textarea>
        </td>
      </tr>
      <tr>
        <td></td>
        <td align="center"><button className="btn btn-primary" onClick={this.newtask}>Request</button></td>
      </tr>
    </table>  

    <button type="button" id="errmodalbtn" style={{ visibility:'hidden' }} class="btn btn-primary" data-toggle="modal" data-target="#errmodal">
  Open modal
</button>
  </div>
  <div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          
          <h3 class="modal-title">Your information</h3>
        </div>
        <div class="modal-body">
        <font style={{fontWeight: 'bold', fontSize:'20px'}}>Name: </font> <font style={{fontSize:'20px'}}>{name}</font><br />
          <font style={{fontWeight: 'bold', fontSize:'20px'}}>Email: </font> <font style={{fontSize:'20px'}}>{email}</font><br />
          <font style={{fontWeight: 'bold', fontSize:'20px'}}>Serial Number: </font> <font style={{fontSize:'20px'}}>{serial}</font><br />
          <font style={{fontWeight: 'bold',fontSize:'20px'}}>Phone: </font> <font style={{fontSize:'20px'}}>+961 {phone}</font><br />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>

  <div id="ntest" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          
          <h3 class="modal-title">Add new test</h3>
        </div>
        <div class="modal-body">
        <table className="table table-borderless">
          <tr>
            <th>Type:</th>
            <td align="center">
            <select style={{ width:'400px' }} className="form-control" id="slct">
            <option value="lab">Laboratory</option>
            <option value="xray">X-Ray</option>
            <option value="rad">RadioOncology</option>
            <option value="ana">Anatomic Pathology</option>
            </select>
            </td>
          </tr><br />
          <tr>
            <th>Test Name:</th>
            <td align="center"><input type="text" className="form-control" style={{ width:'400px' }} onChange={this.handleInput} /></td>
          </tr>
        </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-primary">Add</button>
        </div>
      </div>

    </div>
  </div>

<div class="modal fade" id="errmodal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h3 class="modal-title" style={{ color:'red' }}>Alert!</h3>
      </div>

      <div class="modal-body">
      <strong>Please fill all required data before request.</strong>
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
  export default welcome;