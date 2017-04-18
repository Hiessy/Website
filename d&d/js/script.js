//TODO: formato más amigable a la vista;
//TODO: verificar que itinerary pase 2 opciones si es ida y vuelta o una si es solo vuelta, se ideo la posibilidad de implementar un onclick en los checkbuton
//TODO: validación de precio de compra y disponibilidad que haya cambiado desde que se elijio hasta que llego al checkout;

/*Ver 1.0
 *Autor: Martín díaz
 *Escuelita despegar.com
 *Nota: 
 *Idealmente con mas tiempo esta función asignaria su selección a una funcion que crea el URL para el boton de checkout, con el itineriario y
 *las opciones. Se intento dejar el codigo lo mas leible posible y los nombres de las variables también. Sin embargo algunas funciones que user
 *como la función de itineraryToChekoutURL(iti,ioption) no se modifíco.
 **/

 function startup(){

 	$(document).ready(function(){
    var maxField = 10; //Input fields increment limitation
    var addButton = $('.add_button'); //Add button selector
    var wrapper = $('.field_wrapper'); //Input field wrapper
    var fieldHTML = '<div class="row"><div class="col-md-7"><input type="text" class="form-control" id="character_class" placeholder="Enter character class"></div><div class="col-md-3"><input type="number" class="form-control" id="character_lv" placeholder="Enter character level"></div><div class="col-md-1"><a href="javascript:void(0);" class="remove_button" title="remove field"><i class="glyphicon glyphicon-minus"> </i></a></div></div>'; //New input field html 
    var x = 1; //Initial field counter is 1
    $(addButton).click(function(){ //Once add button is clicked
        if(x < maxField){ //Check maximum number of input fields
            x++; //Increment field counter
            $(wrapper).append(fieldHTML); // Add field html
        }
    });
    $(wrapper).on('click', '.remove_button', function(e){ //Once remove button is clicked
    	e.preventDefault();
        $(this).parent('div').parent('div').remove(); //Remove field html
        x--; //Decrement field counter
    });
})

 }

 function standard3d6() 
 {
 	document.getElementById("character_skill_points").value = Math.floor(document.getElementById("character_lv").value/4); 
 	document.getElementById("character_str").value = random3d6(); 
 	document.getElementById("character_dex").value = random3d6(); 
 	document.getElementById("character_con").value = random3d6(); 
 	document.getElementById("character_int").value = random3d6(); 
 	document.getElementById("character_wis").value = random3d6(); 
 	document.getElementById("character_cha").value = random3d6(); 
 }

 function roll4d6() 
 {
 	document.getElementById("character_skill_points").value = Math.floor(document.getElementById("character_lv").value/4); 
 	document.getElementById("character_str").value = random3d6(); 
 	document.getElementById("character_dex").value = random3d6(); 
 	document.getElementById("character_con").value = random3d6(); 
 	document.getElementById("character_int").value = random3d6(); 
 	document.getElementById("character_wis").value = random3d6(); 
 	document.getElementById("character_cha").value = random3d6(); 
 }

 function starting() 
 {

 	document.getElementById("character_str").value = 10; 
 	document.getElementById("character_dex").value = 10; 
 	document.getElementById("character_con").value = 10; 
 	document.getElementById("character_int").value = 10; 
 	document.getElementById("character_wis").value = 10; 
 	document.getElementById("character_cha").value = 10; 
 	document.getElementById("character_skill_points").value = 20 + Math.floor(document.getElementById("character_lv").value/4); 

 }

 function addSkillPont()
 {

document.getElementById("character_lv").value
 }
//RANDOM ROLLING FUNCTIONS
function random3d6()
{
	return (Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1) + Math.floor((Math.random() * 6) + 1));
}

function random4d6()
{

	var die = [Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1)];
	min = Math.min.apply(null, die);
	var sum = die.reduce(function(pv, cv) { return pv + cv; }, 0);
	return sum - min;
}

/*function setchoice_ida(num){
	console.log(num);
	return num;
}

function setchoice_vuelta(num){
	console.log(num);
	return num;
}


 *No se modifíco la función, una vez implementada tomaria en cuenta mabas opciones
 
function itineraryToChekoutURL(iti,ioption){

    var option=option||0;
   
    var clusterOpt = iti;
    var clusterId = clusterOpt.split("!");
    var mutanOption = clusterId[3];
    var mutanOptionS = mutanOption.split("_");
    var optionsRefSelected = mutanOptionS[0];

    var ticketIdCountry = clusterId[0].split("_")[0];
    var ticketId = clusterId[0];
    var version_id = clusterId[1];
    var optionsRef = clusterId[3].split("_"); // Array with options reference
    var posItinararyId = optionsRef.indexOf(optionsRefSelected); // Position in option reference

    if (posItinararyId >= 0) { // If selected options founded in options
        itineraryiId = clusterId[2].replace("C_", "").split("_")[posItinararyId]; //delete C_ in string and set itineraryId
    }else{
        itineraryiId="";
    }
    var checkoutEncodedUrl = "https://www.despegar.com.ar/book/flights/checkout/"
                            + ticketId
                            + "/" + version_id
                            + "/" + itineraryiId;
    return checkoutEncodedUrl;
}

var searchBoxApp = {
	origen : '',
	destino : '',
	fechaSalida : '',
	fechaRegreso : '',
	soloIda : '',
	pasajeros : '',
	fieldsok : '',
	airport_code : [],

	init: function(){
		
		_this = this;
		//Jquery autocomplete
		$("#input-origen, #input-destino").autocomplete({
			source: function(request, response){
				_this.querySearch(request.term,function(json){
				var source = [];
				var airports = JSON.parse(json);
				airports = airports.data.airports;
				for(i=0;i<airports.length;i++){				
					_this.airport_code[airports[i].description] = airports[i].id;
					source.push(airports[i].description);
				}
				_this.source = source;
				response(_this.source);
				});
			},
			minLength: 2,
		});

		//Jquery date picker
		$(function() {
	    $("#input-fecha-salida,#input-fecha-regreso").datepicker({dateFormat: 'yy-mm-dd'});
	  	});
		document.getElementById("boton-buscar").onclick = function(){
			$("#cluster_results").empty();
			document.querySelector(".no_hay_vuelos_row").style.display = "none";
			document.querySelector(".loading_row").style.display = "initial";
			_this.search();
		}
	},

    querySearch: function(entry, callback){
			request = new XMLHttpRequest();
			request.open("get","http://despegando.travel/api/geo/search?query="+entry,true);
			request.onreadystatechange = function(){
				if(request.readyState != 4 || request.status != 200) return;
					callback(request.responseText);
			};
			request.send();
	},

	search: function(){

        this.origen = this.airport_code[document.getElementById("input-origen").value] || "";
        this.destino = this.airport_code[document.getElementById("input-destino").value] || "";
        this.fechaSalida = document.getElementById("input-fecha-salida").value || "";
        this.fechaRegreso = document.getElementById("input-fecha-regreso").value || "";
        this.soloIda = document.getElementById("chx-solo-ida").checked || "";
        this.pasajeros = document.getElementById("selector-pasajeros").value || "";

		var params = {
			adults:this.pasajeros,
			cabinclass:"economy",
			children:0,
			client:"vuelos",
			country:"ar",
			currency:"ARS",
			destinationplace:this.destino.toUpperCase(),
			inbounddate:this.fechaRegreso,
			locale: "",
			locationschema:"iata",
			originplace: this.origen.toUpperCase(),
			outbounddate:this.fechaSalida,
			providers:"despegar",
			site:"ar",
			typedestination:"airport",
			typeorigin:"airport",
		}		
		
		this.ValidarRequierd();
		this.ValidarDate();		
		if(this.fieldsok){
			this.getFlight(params);
		}else{
			document.querySelector(".loading_row").style.display = "none";
			console.log("Error al validar los campos")
		};
	},
	
	//Bloque de obtención de Json
	getFlight: function(params){
		_this = this;
	 	this.getData(params, function(HttpResponse){
			var jsonResponse = JSON.parse(HttpResponse);
			var objectTID = {tid : jsonResponse.tid}
			_this.getDataByTID(objectTID);
		 });
	},
	
	getData : function(params, callback){
		var url = "http://despegando.travel/api/fsearch/?";
		var myParamsString ="";

		for (var i in params){
			if(params.hasOwnProperty(i)){
				myParamsString += i + "=" + params[i]+"&";
			}
		}		
		myParamsString = myParamsString.substring(0, myParamsString.length - 1);
		try{
			var r =new XMLHttpRequest();
		}catch(e){
			console.log("request failed");
		}
		r.open("GET",url+myParamsString,true);
		r.onreadystatechange = function (){
			if(r.readyState != 4 || r.status != 200) return; 
				callback(r.responseText);
		}
		r.send();
	},

	getDataByTID : function (objectTID){
		_this = this;
		this.getData(objectTID, function(HttpResponseVuelos){
			setTimeout(function(){
				try{
					var jsonResponseVuelos = JSON.parse(HttpResponseVuelos);
				}catch(e){
					return e;
				}
				if(jsonResponseVuelos.length === 0 || jsonResponseVuelos.length === 1){
					_this.getDataByTID(objectTID);
				}else{
					try{
						var JsonVuelos = JSON.parse(HttpResponseVuelos);
					}catch(e){
						return e;
					}
					for (var i = 0; i < JsonVuelos.length ; i++){
							console.log("buscando en la posición: " +i);	
						if(JsonVuelos[i].data.provider === "despegar" && JsonVuelos[i].finish){
							console.log("INFO: Información de vuelos obtenida");
							if(JsonVuelos[i].data.results.length === 0){
								document.querySelector(".loading_row").style.display = "none";
								document.querySelector(".no_hay_vuelos_row").style.display = "initial";
								console.log("ERROR : No se encontraron vuelos"); 
							}		
							_this.buildResultList(JsonVuelos[i].data.results);
						}else{
							console.log("ERROR : No se obtuvo la información de los vuelos");
						}
					}
				}
			},2000)
		});
	},

	//Bloque de creación de resultados
	buildResultList:function(flights){
		
		var Itinerary_id = []; 
		var cluster = document.getElementById("futuroLi");
		var cluster_ida = document.getElementById("vuelo_Prueba_ida");
		var cluster_vuelta = document.getElementById("vuelo_Prueba_vuelta");
		var choices_ida ="setchoice_ida(";
		var choices_vuelta ="setchoice_vuelta(";

		for (var i = 0; i < flights.length; i++) {	

			Itinerary_id[i]= flights[i].Itinerary_id;
			var results_flight_template = document.createElement("div");
			results_flight_template.innerHTML = cluster.innerHTML;

			var priceSpan = results_flight_template.querySelector(".price");
			var from_origin = results_flight_template.querySelector(".from_origin");
			var to_origin = results_flight_template.querySelector(".to_origin");

			var from_return = results_flight_template.querySelector(".from_return");
			var to_return = results_flight_template.querySelector(".to_return");

			var result_inbound = results_flight_template.querySelector(".resultado_ida"); 
			var result_outbound = results_flight_template.querySelector(".resultado_vuelta");	

        	results_flight_template.querySelector(".boton-checkout").href = itineraryToChekoutURL(Itinerary_id[i],0);
 	
			flight = flights[i];
			from_origin.innerHTML = this.origen;
			to_origin.innerHTML = this.destino;

			this.choiceflights(flight.Outbound,result_inbound,cluster_ida.innerHTML, choices_ida);
			
			if (!this.soloIda){
				from_return.innerHTML = this.destino;
				to_return.innerHTML = this.origen;				
				this.choiceflights(flight.Inbound,result_outbound,cluster_vuelta.innerHTML, choices_vuelta);	
			}else{
				results_flight_template.querySelector(".row_superior_vuelta").style.display = "none";
			}
			if(flight.Prices.total != null){
				priceSpan.innerHTML = "Total Precio: "+flight.Prices.total*this.pasajeros;
			}
			document.getElementById("cluster_results").appendChild(results_flight_template);
			document.querySelector(".loading_row").style.display = "none";
		}		
	},

	//Bloque de creación de las opciones que populan los resultados
	choiceflights : function(flights,results,choice_template, choices_function){

			for(var n = 0; n < flights.length; n++){ 

				var results_choices = document.createElement("div");
				results_choices.setAttribute("class", "row resultado_choice");
				results_choices.innerHTML = choice_template;

				flightSegments = flights[n].segments;
	
				var choice_number = results_choices.querySelector(".choice_number");
				var vuelo_aerolinea = results_choices.querySelector(".vuelo_aerolinea");	
				var aeropuerto_salida = results_choices.querySelector(".aeropuerto_salida");
				var hora_salida = results_choices.querySelector(".hora_salida");
				var aeropuerto_escalas = results_choices.querySelector(".aeropuerto_escalas");
				var aeropuerto_llegada = results_choices.querySelector(".aeropuerto_llegada");
				var hora_llegada = results_choices.querySelector(".hora_llegada");

				choice_number.setAttribute("value",n+1);
				choice_number.setAttribute("onclick",choices_function+(n+1)+")");				
				vuelo_aerolinea.innerHTML = flights[0].segments[0].airline_label;
				aeropuerto_salida.innerHTML = flightSegments[0].from; 
				hora_salida.innerHTML = flightSegments[0].departure_datetime.substr(11, flightSegments[0].departure_datetime.length-24);
				aeropuerto_escalas.innerHTML = flightSegments.length; 
				aeropuerto_llegada.innerHTML = flightSegments[flightSegments.length-1].to;
				hora_llegada.innerHTML = flightSegments[flightSegments.length-1].arrival_datetime.substr(11, flightSegments[flightSegments.length-1].arrival_datetime.length-24);

				results.appendChild(results_choices);
			}
	},	
	
	//Validacion de las información
	ValidarRequierd : function(){
		this.fieldsok = true;
			if (this.origen !="" && this.origen === this.destino){
				document.getElementById("error-origen").style.display = "initial";
				document.getElementById("error-destino").style.display = "initial";
				console.log("ERROR : Origen y destino no pueden ser el mismo valor");
				this.fieldsok = false;
			}
			if(this.origen == ""){
				document.getElementById("error-origen").style.display = "initial";
				console.log("ERROR : Falta el origen");
				this.fieldsok = false;
			}
			if(this.destino == ""){
				document.getElementById("error-destino").style.display = "initial";
				console.log("ERROR : Falta el destino");
				this.fieldsok = false;
			}
			if(this.fechaSalida == ""){
				document.getElementById("error-fecha-salida").style.display = "initial";
				console.log("ERROR : Falta la fecha de salida");
				this.fieldsok = false;
			}
			if(!this.soloIda){
				if(this.fechaRegreso == ""){
					document.getElementById("error-fecha-regreso").style.display = "initial";
					console.log("ERROR : Falta la fecha de regreso");
					this.fieldsok = false;
				}
			}
	},

	ValidarOneWay : function(){
		if (document.getElementById("chx-solo-ida").checked == true){
			document.getElementById("input-fecha-regreso").disabled = true;
				console.log("INFO : Viaje solo ida");
		}else{
			document.getElementById("input-fecha-regreso").disabled = false;
				console.log("INFO : Viaje Ida y vuelta");
		}
	},
	
	ValidarDate: function(){
		if(!this.soloIda){
			if(this.fechaRegreso.split("/")[0] < this.fechaSalida.split("/")[0]){
				if(this.fechaRegreso.split("/")[1] <= this.fechaSalida.split("/")[1]){
					if(this.fechaRegreso.split("/")[2] <= this.fechaSalida.split("/")[2]){
						console.log("ERROR : Fecha de día de regreso es menor que día de salida");
						document.getElementById("error-fecha-regreso").style.display = "initial";
						this.fieldsok = false;
					}
					console.log("ERROR : Fecha de mes de regreso es menor que mes de salida");
					document.getElementById("error-fecha-regreso").style.display = "initial";
					this.fieldsok = false;
				}
				console.log("ERROR : Fecha de regreso invalida");
				console.log("ERROR : Fecha de año de regreso es menor que año de salida");
				document.getElementById("error-fecha-regreso").style.display = "initial";
				this.fieldsok = false;
			}else{
				console.log("INFO : Fecha valida");
			}
		}
	},

	//Reset de campos
	ResetFieldOrigen : function(){
		document.getElementById("error-origen").style.display = "none";
	},

	ResetFieldDestino : function(){
		document.getElementById("error-destino").style.display = "none";
	},

	ResetFieldSalida : function(){
		document.getElementById("error-fecha-salida").style.display = "none";
	},

	ResetFieldRegreso : function(){
		document.getElementById("error-fecha-regreso").style.display = "none";
	},

	CambiarConDestino : function(){
		var temp = document.getElementById("input-origen").value;
		document.getElementById("input-origen").value = document.getElementById("input-destino").value;
		document.getElementById("input-destino").value = temp;
	}
} 
*/
