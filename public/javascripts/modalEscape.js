var modal = document.getElementById('id01');
var modalRegister = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modalRegister) {
    modalRegister.style.display = "none";
  }
 
}