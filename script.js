var playing=0;
var position=0;
var hidden=1;
var audio;
var fillStyle=[0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0];
var punched,punchHoleNo=25*30,rows=30;
var paperWidth,paperHeight,rowsBefore=30;
var iterations,playingTime,playThread;


//new Audio("https://www.dropbox.com/s/xba5v56387k2e3e/F1.wav?raw=1"),new Audio("https://www.dropbox.com/s/4vh8z97tlxfjq09/G1.wav?raw=1"),new Audio("https://www.dropbox.com/s/xpsu9a2njm4x22k/A1.wav?raw=1"),new Audio("https://www.dropbox.com/s/ddzka7f456mrg5i/B1.wav?raw=1"),

function init(){
  ldAudio();
  setPaper();
  setCanvas();
}

function ldAudio(){
  audio=[new Audio("https://www.dropbox.com/s/w1m1jlpfc3pb9nq/C1.wav?raw=1"),new Audio("https://www.dropbox.com/s/k50n0hoam0zlvrm/C1%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/b982fua0pay1yhe/D1.wav?raw=1"),new Audio("https://www.dropbox.com/s/aj5p39hei0xmv7m/D1%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/qg5jerpp1psb1ux/E1.wav?raw=1"),new Audio("https://www.dropbox.com/s/xba5v56387k2e3e/F1.wav?raw=1"),new Audio("https://www.dropbox.com/s/dtuzutrlt91qe2a/F1%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/4vh8z97tlxfjq09/G1.wav?raw=1"),new Audio("https://www.dropbox.com/s/2sj4rupewdb5cau/G1%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/xpsu9a2njm4x22k/A1.wav?raw=1"),new Audio("https://www.dropbox.com/s/glx501pq3o0t1ky/A1%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/ddzka7f456mrg5i/B1.wav?raw=1"),new Audio("https://www.dropbox.com/s/bgedoz2e8te6lpx/C2.wav?raw=1"),new Audio("https://www.dropbox.com/s/krtkb0q2nhg6unm/C2%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/zb5n1c41qbz9k5o/D2.wav?raw=1"),new Audio("https://www.dropbox.com/s/18uml584lnyc9rg/D2%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/i2pofuubzvadu45/E2.wav?raw=1"),new Audio("https://www.dropbox.com/s/ued1pmmn1ltzejt/F2.wav?raw=1"),new Audio("https://www.dropbox.com/s/wcyydq4fyrk2tvv/F2%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/gjswlxh8xwk5nfc/G2.wav?raw=1"),new Audio("https://www.dropbox.com/s/92zf7ik327ll3ut/G2%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/lar4583dtk6l1pj/A2.wav?raw=1"),new Audio("https://www.dropbox.com/s/72tfjll1zcuk492/A2%23.wav?raw=1"),new Audio("https://www.dropbox.com/s/htdrexk3zh2zcnk/B2.wav?raw=1"),new Audio("https://www.dropbox.com/s/xapgrq2kf66lt89/C3.wav?raw=1")];

  
  if (localStorage.getItem("Rows")!==null){
    document.getElementById("inputRows").value=localStorage.getItem("Rows");
    rows=localStorage.getItem("Rows");
    setPunched();
  }
  if (localStorage.getItem("BPM")!==null){
    document.getElementById("inputBpm").value=localStorage.getItem("BPM");
    document.getElementById("dur").innerHTML="("+Math.floor((punchHoleNo/25)/localStorage.getItem("BPM"))+"m"+Math.floor((punchHoleNo/25)/localStorage.getItem("BPM")*60)%60+"s)";
  }
  if (localStorage.getItem("Rows")!==null){
    updateRows();
  }
  paint();
}

function setSize(){
  //alert("lol: "+document.getElementById("keyboard").style.width);
  document.getElementById("keyboard").style.height=document.getElementById("keyboard").style.width;
}

window.onresize = function(event) {
  refresh();
};

function refresh(){
  document.getElementById("settings").style.zoom=""+(window.innerWidth/1400)+"";
  document.getElementById("settings2").style.zoom=""+(window.innerWidth/1400)+"";
  setPaper();
  setCanvas();
  paint();
}

function updateBPM(){
  localStorage.setItem("BPM",document.getElementById("inputBpm").value);
  document.getElementById("dur").innerHTML="("+Math.floor(rows/localStorage.getItem("BPM"))+"m"+Math.floor((rows)/localStorage.getItem("BPM")*60)%60+"s)";
}

function updateRows(){
  rowsBefore=rows;
  localStorage.setItem("Rows",document.getElementById("inputRows").value);
  rows=document.getElementById("inputRows").value;
  if (rowsBefore<rows){
    for (i=rowsBefore;i<rows;i++){
      for (n=0;n<25;n++){
        punched.push(0);
      }
    }
    rowsBefore=rows;
  }
  updateBPM();
  refresh();
}

function kPressed(id){
  playing=1;
  position=id*3;
  /*document.getElementById("notes").currentTime=position;
  document.getElementById("notes").play();*/
  audio[id].currentTime=0;
  audio[id].play();
}

function bringForth(id){
  setSize();
  if (hidden==1){
    document.getElementById("keyboard").style.top="20%";
    document.getElementById("btn").innerHTML="Back";
    document.getElementById("btn1").innerHTML="Back";
    document.getElementById("paper").style.top="-80%";
    document.getElementById("paper").style.transition="1000ms";
    document.getElementById("keyboard").style.transition="1500ms";
    document.getElementById("btn2").style.opacity="0";
    document.getElementById("btn3").style.opacity="0";
    document.getElementById("bpm").style.opacity="0";
    document.getElementById("dur").style.opacity="0";
    document.getElementById("rows").style.opacity="0";
    document.getElementById("settings2").style.opacity="0";
    document.getElementById("inputBpm").style.opacity="0";
    document.getElementById("paper").style.animationDuration="2s";
    hidden=0;
    playing=1;
    if (id==1){
      document.getElementById("keyboard").style.top="35%";
      document.getElementById("lzr").style.opacity="1";
      document.getElementById("lzr2").style.opacity="1";
      setTimeout(kickstart,1500);
    }
  }else{
    document.getElementById("keyboard").style.top="105%";
    document.getElementById("btn").innerHTML="Auto";
    document.getElementById("btn1").innerHTML="Play";
    document.getElementById("paper").style.top="5%";
    document.getElementById("paper").style.transition="1500ms";
    document.getElementById("keyboard").style.transition="1000ms";
    document.getElementById("btn2").style.opacity="1";
    document.getElementById("btn3").style.opacity="1";
    document.getElementById("bpm").style.opacity="1";
    document.getElementById("dur").style.opacity="1";
    document.getElementById("lzr").style.opacity="0";
    document.getElementById("lzr2").style.opacity="0";
    document.getElementById("rows").style.opacity="1";
    document.getElementById("settings2").style.opacity="1";
    document.getElementById("inputBpm").style.opacity="1";
    hidden=1;
    playing=0;
  }
}

function keyPress(e){
  //alert(e.keyCode);
}

function kickstart(){
  document.getElementById("paper").style.transition="1500ms";
  document.getElementById("paper").style.top="-70%";
  setTimeout(rollSheet,2000);
}

function rollSheet(){
  if (playing==1){
    playingTime=(rows/document.getElementById("inputBpm").value)*60000;
    document.getElementById("paper").style.transition=""+playingTime+"ms";
    document.getElementById("paper").style.transitionTimingFunction="linear";
    document.getElementById("paper").style.top="20%";
    iterations=1;
    playChords();
    playThread=setTimeout(bringForth,playingTime+500);
  }
}

function playChords(){
  press();
  if (iterations<rows){
    if (playing==1){
      iterations++;
      setTimeout(playChords,playingTime/rows);
    }else{
      clearTimeout(playThread);
    }
  }
}

function press(){
  for (i=0;i<25;i++){
    //resetK();
    var id="k"+i;
    if (fillStyle[i]==0){
        document.getElementById(id).style.boxShadow="5px 5px 5px rgba(0,0,0,0.2)";
        document.getElementById(id).style.backgroundColor="#ddd";
      }else{
        document.getElementById(id).style.boxShadow="5px 5px 5px rgba(0,0,0,0.2)";
        document.getElementById(id).style.backgroundColor="#111";
      }
    if (punched[(rows-iterations)*25+i]==1){
      audio[i].currentTime=0;
      audio[i].play();
      if (fillStyle[i]==0){
        //document.getElementById(id).style.backgroundImage="linear-gradient(top, rgba(221,221,221,1) 0%,rgba(150,150,150,1) 100%);";
        document.getElementById(id).style.boxShadow="none";
        document.getElementById(id).style.backgroundColor="#bbb";
      }else{
        //document.getElementById(id).style.background="-webkit-linear-gradient(top, rgba(0,0,0,1) 0%,rgba(50,50,50,1) 100%);";
        document.getElementById(id).style.boxShadow="none";
        document.getElementById(id).style.backgroundColor="#333";
      }
    }
  }
}

function resetK(){
  for (i=0;i<25;i++){
    var id="k"+i;
    if (fillStyle[i]==0){
      document.getElementById(id).style.background="initial";
      document.getElementById(id).style.backgroundColor="#ddd";
    }else{
      document.getElementById(id).style.background="initial";
      document.getElementById(id).style.backgroundColor="#111";
    }
  }
}

function undock(){
  document.getElementById("paper").style.transition="1500ms";
  document.getElementById("paper").style.transitionTimingFunction="ease";
  document.getElementById("paper").style.top="30%";
  setTimeout(bringForth,1500);
}

function flip(){
  height=rows;
  var tmpArr=[];
  var tmpStr="";
  for (i=h-1;i>=0;i--){
    for (w=0;w<25;w++){
      if (punched[i*25+w]==1){
        tmpArr.push(1);
        tmpStr+="1";
      }else{
        tmpArr.push(0);
        tmpStr+="0";
      }
    }
  }
  localStorage.setItem("punchCardData",tmpStr);
  punched=tmpArr;
  paint();
}

function clearCanvas(){
  var tmpStr="";
  for (i=0;i<punched.length;i++){
    punched[i]=0;
    tmpStr+="0";
  }
  localStorage.setItem("punchCardData",tmpStr);
  paint();
}

function setPaper(){
  document.getElementById("canvas").style.height=""+window.innerWidth*0.6*(rows/25)+"px";
  paperWidth=window.innerWidth*0.6;
  paperHeight=window.innerHeight*0.9;
}

function setCanvas(){
  document.getElementById("canvas").width=paperWidth;
  document.getElementById("canvas").height=paperWidth*rows/25;
  //alert("lol");
}

function setPunched(){
  punched=[];
  var input=localStorage.getItem("punchCardData");
  if (input===null){
    for (i=0;i<25*rows;i++){
      punched.push(0);
    }
  }else{
    for (i=0;i<input.length;i++){
      if (input.charAt(i)=='0'){
        punched.push(0);
      }else{
        punched.push(1);
      }
    }
  }
}

/*function check(){
  if (playing==1){
    var tmpPos=document.getElementById("notes").currentTime;
    if (tmpPos>=position+2.5){
      document.getElementById("notes").pause();
      playing=0;
    }
  }
}*/
//setInterval(check,200);

function openScore(){
  var open=window.prompt("Protip: \"data\" contains all project names.\n\nEnter project name:");
  if (localStorage.getItem(open)==null&&open!=null&&open!="data"){
    alert("Could not find data.\nPlease try again.");
  }else if (open=="data"){
    alert("Filenames:\n"+localStorage.getItem("data"));
  }else if (open!=null){
    document.getElementById("inputBpm").value=localStorage.getItem(open+"|Bpm");
    document.getElementById("inputRows").value=localStorage.getItem(open+"|Rows");
    rows=parseInt(localStorage.getItem(open+"|Rows"));
    punched=[];
    var input=localStorage.getItem(open);
    for (i=0;i<input.length;i++){
      if (input.charAt(i)=='0'){
        punched.push(0);
      }else{
        punched.push(1);
      }
    }
    setPaper();
    setCanvas();
    paint();
  }
}

function saveScore(){
  var save=window.prompt("Projects are stored locally and cannot be opened on other devices.\nEnter project name:");
  if (localStorage.getItem(save)!=null&&save!="data"&&save!=null){
    if (confirm("File taken.\nOverwrite?")){
      var outStr="";
      for (i=0;i<rows*25;i++){
        if (punched[i]==0){
          outStr+="0";
        }else{
          outStr+="1";
        }
      }
      localStorage.setItem(save,outStr);
      localStorage.setItem(save+"|Bpm",document.getElementById("inputBpm").value);
      localStorage.setItem(save+"|Rows",document.getElementById("inputRows").value);
    }
  }else if(save=="data"){
    alert("\"data\" is a default system file. It cannot be edited.\nPlease try again.");
  }else if (save!=null){
    var outStr="";
    for (i=0;i<rows*25;i++){
      if (punched[i]==0){
        outStr+="0";
      }else{
        outStr+="1";
      }
    }
    localStorage.setItem(save,outStr);
    localStorage.setItem(save+"|Bpm",document.getElementById("inputBpm").value);
    localStorage.setItem(save+"|Rows",document.getElementById("inputRows").value);
    if (localStorage.getItem("data")==null){
      localStorage.setItem("data",save);
    }else{
      var inp=localStorage.getItem("data")+","+save;
      localStorage.setItem("data",inp);
    }
  }
}

function select(){
  if (hidden==1){
    var tmpX=event.clientX-paperWidth/3-8;
    var tmpY=event.clientY-window.innerHeight*0.05;
    //alert(Math.floor(tmpX/(paperHeight/30))+","+Math.floor(tmpY/(paperWidth/25)));
    var active=Math.floor(tmpY/(paperHeight/rows))*25+Math.floor(tmpX/(paperWidth/25));
    if (punched[active]==0){
      punched[active]=1;
      kPressed(Math.floor(tmpX/(paperWidth/25)));
    }else{
      punched[active]=0;
    }
    //alert(Math.floor(tmpY/(paperHeight/30))*25+Math.floor(tmpX/(paperWidth/25)));
    var outStr="";
    for (i=0;i<rows*25;i++){
      if (punched[i]==0){
        outStr+="0";
      }else{
        outStr+="1";
      }
    }
    localStorage.setItem("punchCardData",outStr);
    paint();
  }
}

function paint(){
  //alert(document.getElementById("canvas").width)
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.clearRect(0,0,paperWidth,paperHeight);
  ctx.fillStyle="#000000";
  var count=0;
  for (a=0;a<paperWidth;a+=paperWidth/25){
    if (fillStyle[count]==0){ctx.fillStyle="rgba(0,0,0,0.1)";}
    else {ctx.fillStyle="rgba(0,0,0,0.3)";}
    ctx.fillRect(a,0,paperWidth/25,paperHeight);
    if (count<24){
      ctx.fillStyle="rgba(0,0,0,0.1)";
      ctx.fillRect(a+paperWidth/25-1,0,2,paperHeight);
    }
    count++;
  }
  count=0;
  for (a=0;a<paperHeight;a+=paperHeight/rows){
    if (count<rows-1){
      ctx.fillStyle="rgba(0,0,0,0.1)";
      ctx.fillRect(0,a+paperHeight/rows-1,paperWidth,2);
    }
  }
  count=0;
  for (h=0;h<rows;h++){
    for (w=0;w<25;w++){
      if (punched[count]==1){
        ctx.fillStyle="rgba(0,0,0,0.7)";
        ctx.fillRect(w*paperWidth/25,h*paperHeight/rows,paperWidth/25,paperHeight/rows);
      }
      count++;
    }
  }
}