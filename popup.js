var stuff = {
 logStr :  function(sToPopUp) {
    console.log(sToPopUp);
 },
 getElem : function  () {document.getElementById('');
 },
 sendEvent : function (event){
  if(event.target.name == "nsfw"){
   this.sendMessage(event.target.value);
  }
 }, 
 onLoadSetSelected : function(){
  if(typeof(Storage)!=="undefined") {
    // Yes! localStorage and sessionStorage support!
    // Some code.....
    console.log("hello");
    if( typeof(localStorage.nsfw) !== "undefined"){
      //use this value to set 
      console.log(localStorage.nsfw+"-radio");
      document.getElementById(localStorage.nsfw + "-radio").selected =true;
      document.update
    } else { 
      console.log("not set nsfw tag");
      //has not been set before, set to home by default
      localStorage.nsfw = "home";
    }
    this.sendMessage(localStorage.nsfw);
    console.log("reached here");
  } else {
    // Sorry! No web storage support..
    stuff.logStr('no web storage available')
  }

 },
 sendMessage : function (value) {
  //console.log(value);
  chrome.tabs.getSelected(null, function(tab) {
     chrome.tabs.sendMessage(tab.id, 
       {greeting: "set-nsfw",value:value}, 
       function(response) {
          console.log(response.farewell + "-radio");
          document.getElementById(response.farewell + "-radio").selected =true;
          localStorage.nsfw = response.farewell;
       });
  });
 }
};

document.addEventListener('DOMContentLoaded', function () {
  stuff.logStr("loaded"); //sendMessage();
  stuff.onLoadSetSelected();
});
document.addEventListener('click', function(event){
  stuff.sendEvent(event);
});
//want to set variables using local storage retain what was already set, 
//document.addEventListener('', );
