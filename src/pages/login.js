import '../App.css';
import React from 'react';
import {Component} from 'react';
import axios from 'axios';
import logo from '../images/logo.png';
import show from '../images/show.png'
import hide from '../images/hide.png'
class Login extends Component{

    state={
    'serial':'',
    'pass':'',
    }
     handleInput =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        }) 
     }
     
    login=async (e)=>{
        const req={serial:this.state.serial,pass:this.state.pass}
        const res=await axios.post('https://ulprojet.000webhostapp.com/api/login',req,{
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8;application/json'
            }
        })
        if(res.data.status===200){
          localStorage.setItem('usr',JSON.stringify(res.data.user))
          window.location.href="/welcome";
        }
        else{
            document.getElementById('msg').innerHTML="<div class='alert alert-danger' role='alert'>Serial number or password incorrect !</div>"
        }
    }

    componentDidMount(){
        setTimeout(()=>{
        document.getElementById("mdlg").click();
        },1000)
    }
 
    shwhid(){
    if(document.getElementById("pass").type==="password"){
        document.getElementById("pass").type="text";
        document.getElementById("ps").innerHTML="<img src="+hide+" height='25px' width='25px'>";
    }
    else{
        document.getElementById("pass").type="password";
        document.getElementById("ps").innerHTML="<img src="+show+" height='25px' width='25px'>";
    }
    }


    render(){
        const brdrless={
            border:'none',
            outline:'none',
            backgroundColor:'white'
        }
        return(
            <div>
                <div align="center">
                    <img src={logo} width="650px" height="650px" />
                </div>

<button type="button" style={{ visibility:'hidden' }} class="btn btn-primary" id="mdlg" data-toggle="modal" data-target="#myModal">
  Open modal
</button>

<div class="modal fade" id="myModal" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body">
      <table align="center" className="table table-borderless">
        <tr>
        <th colSpan="2"><h1 align="center">Login</h1></th>        
        </tr>
        <tr>
            <td colSpan="2" align="center" id="msg"></td>
        </tr>
        <tr>
            <th>Serial number:</th>
            <td><input type="text" onChange={this.handleInput} name="serial" value={this.state.serial} className="form-control" style={{width:'300px'}} /></td>
        </tr>
        <tr>
            <th>Password:</th>
            <td>
            <div class="input-group mb-3">
            <div style={{ float:'left' }}><input type="password" class="form-control" style={{ width:'260px' }} id="pass" name="pass" onChange={this.handleInput} /></div>
            <div style={{ float:'right' }}><button style={brdrless} onClick={this.shwhid}><div id="ps"><img  src={show} height="25px" width="25px"></img></div></button></div>
            </div>
            </td>
            
        </tr>
        <tr>
            <td align="center" colSpan="2"><button className="btn btn-primary" onClick={this.login} style={{width:'300px'}}>Login</button></td>
        </tr>
        </table>
      </div>
    </div>
  </div>
</div>


            </div>
        );
    }
}

export default Login;