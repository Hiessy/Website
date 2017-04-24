var radio = ['human','boyfriend','pizza','half-elf','otro mas'];
var title = ['es una persona', 'es un estado', 'es una comida', 'es imaginario','es abstracto']

function startup(){

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// When the user clicks the button, open the modal 
btn.onclick = function() {
	btn.value='';
	modal.style.display = "block";

	var r = document.getElementsByTagName("input");

	for (var i=0; i < r.length; i++) {
		if ((r[i].type == "radio")) {
			r[i].setAttribute("onClick", "document.getElementById('myBtn').value=this.value");
		}

	}
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}


	for(var i = 0; i < radio.length; i++){

		var lbl = document.createElement("label");
		lbl.innerHTML = radio[i];
		lbl.setAttribute("onClick", "document.getElementById('myBtn').value=this.innerText");  
		lbl.setAttribute("value", radio[i]);  
		lbl.setAttribute("title", title[i]);
		document.getElementById('add_radio').appendChild(lbl);

	}

}

