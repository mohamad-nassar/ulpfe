import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import prtt from '../images/printing.png';
class print extends Component{
 
state={
    'lst':[],
    'task':[]
}

async componentDidMount(){
    const id=this.props.match.params.id;
    const res=await axios.get(`https://ulprojet.000webhostapp.com/api/print/acc/${id}`)
    if(res.data.status===200){
    this.setState({
        'lst':res.data.lst,
        'task':res.data.task
    })
    console.log(this.state.lst,this.state.task)
    }
}

prt(){
    var a=document.getElementById("dc").value;
    if(a=="dc1") document.getElementById("sig").innerHTML="Doctor 1 signature"
    if(a=="dc2") document.getElementById("sig").innerHTML="Doctor 2 signature"
    if(a=="dc3") document.getElementById("sig").innerHTML="Doctor 3 signature"
    window.print();
}
render(){
    var serial="";
    var pat="";
    var pid="";
    var labmed="";
    var idd="";
    var dtask="";
const lst=this.state.lst.map( (item)=>{
    serial=item.serial
    pid=item.PID
    if(item.PID==0) {pat=item.NAME+" (himself)"}
    if(item.PID==1) {pat=item.NAME+" (Parents)"}
    if(item.PID==2) {pat=item.NAME+" (Spouse or hasbend)"}
    if(item.PID>=3) {pat=item.NAME+" (Son or daughter)"}
    labmed=item.namee;
    dtask=item.dtask;
    idd=new Date().getFullYear()+"/"+item.id;
} );

const task=this.state.task.map( (item)=>{
    if(item.status=="Accepted") return(
        <tr>
            <td align="center">{item.name}</td>
            <td align="center"><font style={{ fontSize:'25px' }}>&times;</font></td>
            <td align="center"></td>
        </tr>
    )
    if(item.status=="Rejected") return(
        <tr>
            <td align="center">{item.name}</td>
            <td align="center"></td>
            <td align="center"><font style={{ fontSize:'25px' }}>&times;</font></td>
        </tr>
    )
} )

    return(
     <div>
         <nav class="navbar bg-success navbar-dark">
            <div style={{ textAlign:'center',width:'100%' }}><h1 style={{ color:'white' }}>Printing accepted test</h1></div></nav><br />
            <div id="prt">
                <center><img src={logo} height="220px" width="220px" /></center><br />
                <hr width="100%" />
            <div style={{ float:'left',fontSize:'20px' }}>
            <table dir="rtl">
                <tr><th>رقم الانتساب :</th>
                <td align="center">{serial}</td></tr>
                <tr>
                    <th>إسم المريض :</th>
                    <td  align="center" dir="ltr">{pat}</td>
                </tr> 
                <tr>
                <th>نسبة التغطية :</th>
                <td  align="center"></td>
                </tr>
            </table>
            </div>
            <div style={{ float:'right',fontSize:'20px' }}>
            <table dir="rtl">
                <tr><th>رقم الموافقة :</th>
                <td  align="center">{idd}</td></tr>
                <tr>
                    <th>تاريخ الموافقة :</th>
                    <td  align="center">{dtask}</td>
                </tr>
                <tr>
                <th>مركز الفحوصات :</th>
                <td  align="center">{labmed}</td>
                </tr>
            </table>
            </div><br /><br /><br /><br /><br /><br />
            <div align="center">
            <table align="center" width="70%" className="table-bordered" style={{ fontSize:'20px' }}>
            <tr>
                <th align="center">Name of exam</th>
                <th align="center">Approved</th>
                <th align="center">Not approved</th>
            </tr>
            {task}
            </table>
            </div>
            <br />
            <label style={{ fontSize:'20px' }}><b>Remarks:</b></label><br />
            <textarea dir="rtl" style={{ fontSize:'20px',resize:'none' }} cols="160" rows="6">
            </textarea>
            <br /><br />
            <div  align="center"><strong>*الفحوصات الموافق عليها هي بحسب لائحة الضمان الإجتماعي*</strong></div>
            <div id="sig"></div>
            <div class="noprint" align="center"><br />
            <select id="dc" className="form-control" style={{ width:'300px' }}>
                <option value="dc1">Doctor 1</option>
                <option value="dc2">Doctor 2</option>
                <option value="dc3">Doctor 3</option>
            </select>
            <button onClick={this.prt} className="btn btn-basic"><img src={prtt} width="25px" height="25px" /></button>
            </div><br />
            </div>
     </div>
 )
 }
}
export default print;