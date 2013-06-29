//demonstrates module is loading properly comment out on stable
console.log("git git");
/*
//all this code is commented out, and Ive screwed with it, 
//untested name feature
var port = chrome.runtime.connect({name:"from_hide_page"});

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
      return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
      console.log("Content script received: " + event.data.text);
      port.postMessage(event.data.text);
    }
}, false);

window.addEventListener("DOMContentLoaded", function(){
  port.postMessage({event:"hide_event"});
}, false);
*/

//var imgURL = chrome.extension.getURL("popup.html");
//document.getElementById("").src = imgURL;
//want to add filter settings here, ... set some bool flags based on
//html page from popup of app. 
var eFilter = {
  doFilter : function(eType){
   var aElements = document.getElementById("siteTable").children;
   //console.log(Element.innerHTML); //was doing some debugging
   //aElements = aElements.children;//splitting 
   var nCount = 0;
   for (var i=0; i< aElements.length; i++){
     //list of all elements in table of links, want to make some invisible.
     // by memory, add style = visibility None or and ... display none
     eElm = aElements.item(i);
     //console.log(".");//eElm.innerHTML);
     if ((eElm.innerHTML.indexOf('nsfw-stamp') == -1 && eType == "nsfw") || 
         (eElm.innerHTML.indexOf('nsfw-stamp') != -1 && eType == "sfw")){

        //console.log(eElm.innerHTML);
        nCount += 1;
        //display 
        eElm.setAttribute("style", "display:none" );
        //hidden maintains formatting, weird whitespace issues,
        //eElm.setAttribute("style", "visibility:hidden" ); 
     } else {
        eElm.setAttribute("style", "display:inherit")
     }
   }
   console.log(nCount);
  },
  onLoad : function () {
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

   }
 }
};

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "set-nsfw"){
      sendResponse({farewell: request.value});
      console.log("got here: " + request.value);
      eFilter.doFilter(request.value);
    }
  }
);
//code to hide the segments of the page I want hidden
//could not get below working naively, ... not worrying about it. 
//window.addEventListener("onClicked", function(){
//  console.log('Got here really nice.');
  //var dompart;
  //document.
//});
