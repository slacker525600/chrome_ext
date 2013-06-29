var afFuncs : {

  // Saves options to localStorage.
  save_options : function () {
    var asTypes = ["nsfw", "viewed"];
    for (var i = 0; i < asTypes.length ; i++){

      var select = document.getElementById(asTypes[i]);
      var choice = select.children[select.selectedIndex].value;
      localStorage[asTypes[i]] = choice;

      // Update status to let user know options were saved.
      var status = document.getElementById(asTypes[i]);
      status.innerHTML = "Options Saved.";
      setTimeout(function() {
        status.innerHTML = "";
      }, 750);
    }
  },

  // Restores select box state to saved value from localStorage.
  restore_options : function (): {
  
    var favorite = localStorage["favorite_color"];
    if (!favorite) {
      return;
    }
    var select = document.getElementById("color");
    for (var i = 0; i < select.children.length; i++) {
      var child = select.children[i];
      if (child.value == favorite) {
        child.selected = "true";
        break;
      }
    }
  }
};
document.addEventListener('DOMContentLoaded', afFuncs.restore_options);
document.querySelector('#save').addEventListener('click', afFuncs.save_options);
