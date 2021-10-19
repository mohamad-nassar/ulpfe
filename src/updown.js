    function tmzn(){
    var d=new Date();
    if(d.getHours()>=12){
        document.getElementById("nvbr").setAttribute("class","navbar navbar-expand-sm bg-dark navbar-dark");
        document.getElementById("dvcn").setAttribute("class","container-fluid bg-dark");
        document.getElementById("wlc").innerHTML="Good afternoon "+document.getElementById("wlc").innerText;
    }
    else{
        document.getElementById("nvbr").setAttribute("class","navbar navbar-expand-sm bg-primary navbar-dark");
        document.getElementById("dvcn").setAttribute("class","container-fluid bg-primary");
        document.getElementById("wlc").innerHTML="Good morning "+document.getElementById("wlc").innerText;
    }
    }
    
    
    
    function timee(){
        setInterval(function(){
            var d=new Date();
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            document.getElementById("tm").innerHTML =days[d.getDay()]+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
            if(d.getMinutes()<10){
                document.getElementById("tm").innerHTML=document.getElementById("tm").innerText+"<br><center>"+d.getHours()+":0"+d.getMinutes();
            }else{
                document.getElementById("tm").innerHTML=document.getElementById("tm").innerText+"<br><center>"+d.getHours()+":"+d.getMinutes();
            }
    
            document.getElementById("tm").style.marginLeft="40%";
            document.getElementById("tm").style.color="white";
            document.getElementById("tm").style.fontSize="25px";
        },100);
    }
   