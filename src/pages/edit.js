import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';

class Edit extends Component{

   state={
       'edt':[],
       'pat':[],
       'serial':'',
       'benef':'',
       'test':'',
       'labmed':'',
       'date':''
   }

   handleInput=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })
 }

  async componentDidMount(e){
    const id=this.props.match.params.id;
       const res=await axios.get(`https://ulprojet.000webhostapp.com/api/edit/${id}`)
       if(res.data.status===200)
       {
       this.setState({
           'edt':res.data.edt,
           'pat':res.data.pat,
           'serial':document.getElementById("serial").value,
       })
   }
  }

  savesh =async()=>{
       /* this.setState({
           'serial':document.getElementById("serial").value,
           'benef':'',
           'test':'',
           'labmed':'',
           'date':''
        })*/
        console.log(this.state);
 }

    render(){
        var pat=this.state.pat.map( (item)=>{
            return(
                <option value={item.id}>{item.NAME}</option>
            )
        } );
        var serial="";
        var labmed="";
        var type;
        var date="";
        this.state.edt.map( (item)=>{
            serial=item.serial;
            labmed=item.namee;
            type=item.type;
            date=item.date;
            document.getElementById("txttst").innerHTML=type;
        })
        return(
            <div>
                 <nav className="navbar navbar-expand-sm bg-warning navbar-dark">
          <div style={{ textAlign:'center',alignContent:'center',width:'100%' }}><h1 style={{ color:'white' }}>Edit a pending task</h1></div></nav><br />
            <table class="table table-bordered table-warning cls">
    <tr>
    <th>Serial number</th>
    <th>Patient</th>
    <th>Tests</th>
    <th>Medical center</th>
    <th>Date</th>
    </tr>
    <tr>
    <td><input class="form-control" type="text" name="serial" id="serial" value={serial} readOnly onChange={this.handleInput} /></td>
    <td><select class="form-control" name="benef" id="benef" onChange={this.handleInput}>
        {pat}
    </select></td>
    <td><textarea style={{ maxWidth: '500px',resize:'none' }} cols="45" rows="7" class="form-control" name="test" id="txttst"></textarea></td>
    <td><input class="form-control" type="text" name="labmed" value={labmed} /></td>
    <td><input type="date" name="date" class="form-control" value={date} /></td>
    </tr>
    </table>
    <br />
    <div align="center"><button className="btn btn-primary" id="btn" onClick={this.savesh}>Save Changes</button></div>
            </div>
        )
    }
}

export default Edit;