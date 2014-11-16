// *******
// Clases Obra y Casillas
// *******

// GLOBALES
var obra;

// var tid ;	// TimeInterval
var t_update_obra = 5000;	// tiempo de update por defecto


// * * * * * * * * * * * * * * * * * * * * 
// clase Obra
var Obra = function( idObra, titulo, nVis, bCyclic, _created_at, _completed_at) {
	// Datos de la BD
	this.id = idObra;			// idObra
	this.titulo = titulo;		// titulo
	this.visib = nVis;			// Radio visibilidad
	this.cyclic = bCyclic;		// circular o no

	this.created_at = _created_at;	
	this.completed_at = _completed_at;
	this.fch_first_post = null;	// fecha del primer post enviado

	this.t_Ultimo = null;

	// funciones para init, play, stop
	this.tid; 
	this.t_update_obra; 
	this.estadoPlay = "stop";	// "play"


	// CASILLAS de la OBRA
	this.numCasillas = null;		// numero de participantes/casillas
	this.casillas = null;
	this.ult_regtro_json = null;

	this.reset = function () {
		this.numCasillas = 0;		// numero de participantes/casillas
		this.casillas = new Array();
		this.ult_regtro_json = -1;
	}

	this.reset();

	this.url_obra = "http://riverrun-2.herokuapp.com/works/"+this.id+"/changelog";
	this.url_obra_json = this.url_obra+".json";

	console.log("--OBRA CREADA--"+this.ult_regtro_json);


	this.initTimer = function () { // to be called when you want to stop the timer
		clearInterval(obra.tid);
		obra.tid = setInterval(this.update_Obra, t_update_obra);
	}

	this.abortTimer = function () { // to be called when you want to stop the timer
		clearInterval(obra.tid);
		obra.tid = null;
	}

	this.ajax_leerCasillas = function () {
		console.log("obra.ajax_leerCasillas");
		// Lee datos de obra
		$.ajax({
			type: 'GET',
			url: this.url_obra_json, 
			async: false,
			contentType: 'application/json; charset=utf-8',
			crossDomain: true,
			dataType: 'jsonp',
			success: this.leer_casillas_upd,
			error: function(e, desc, errThrow)
			{
			   console.log("**ERROR** : " + e.status + "-" + e.statusText);
			   console.log("**ERROR DESCR** : " + desc);
			   console.log("**ERROR THROW** : " + errThrow);
			}
		});
	}

	this.update_Obra = function () {
		console.log("obra.update_Obra   **** ");
		obra.ajax_leerCasillas();
	}


	this.initObra = function (data_json) {

		// DOM
		$('#obraCasillas').html('');
		$('#ctrl_play').html("STOPPED - pulsar para PLAY");

		obra.casillas = new Array();

		// crear casillas en DOM a partir de data_json y obtener nCasillas, dates...
		$.each(data_json, function(i,item) {	// i: 0....
			var datos = "";
			var vers = item.version;
			var n_cambio = vers.version;

			// init de obra: solo coger las casillas con n_cambio=1
			if( n_cambio==1 ) {
				console.log(i + " casilla nueva: "+vers.position+"."+n_cambio);
				obra.ult_regtro_json++;	// ultimo registro del JSON actualizado

				// ************ ############ AQUI ########## *********
				var cc = new Casilla( vers.position, "&nbsp;" , obra.visib);
				obra.casillas.push( cc );

				// appends  (add casilla en dom)
				$('#obraCasillas').append(cc.html_datos_nueva_casilla(vers) );

				obra.numCasillas++;
				// actualizar el numero de casillas en la info de la obra:
				$('#nCasillasObra').html(obra.numCasillas);
			}
		});
	}



	//	Lectura JSON de obra/changelog
	this.leer_casillas_upd = function (data)
	{
		var init_obra = false;
		var hay_nueva_casilla = false;
		if(obra.ult_regtro_json < 0) {
			init_obra = true;
			obra.initObra(data);
			setTipos();	// pone los estilos y el comportamiento del mouse			
		} else {

			if(obra.ult_regtro_json<data.length) {	// si hay mas registros...
				// Hay mas texto para revisar

				var ult_regtro = obra.ult_regtro_json;

				hay_nueva_casilla = true;
				var vers = data[ult_regtro+1].version;


				// capturar la fecha del primer post: que es el de i==obra.numCasillas;
				if(obra.ult_regtro_json==obra.numCasillas-1) {
					obra.fch_first_post = vers.updated_at;
				}

				obra.ult_regtro_json++;

				// UPDATE CASILLA
				// Todo esto lo deberá a hacer la propia casilla
				var cc = obra.casillas[vers.position-1];	// posic en array = position en obra - 1
				// cc.updateTexto( vers );
				// updateCasilla(cc, vers.text)

				// 1 - scroll
				scrollToCasillas(vers.position);

				// 2 - animacion de casilla modificada
				animacasilla(vers.position);

				// 3 - actualizar casilla en obra: toca el dom de la casilla y de infoObra
				obra.update_dom_casilla(vers);

			}
			else {	// si no hay mas registros...

				// si la obra ya esta terminada: quitar timer e indicar final obra

				// else seguir con el timer, no hacer nada

			}

		}


	}


	this.update_dom_casilla = function (vers) {
		// UPDATE DEL DOM

		var n_cambio = vers.version;
		var fecha_updated = new Date(vers.updated_at);
		var hora_updated = fecha_updated.getHours()+":"+fecha_updated.getMinutes()+":"+fecha_updated.getSeconds();	

		// Modificar DOM casilla
		// ** info **
		$('.casilla[data-pos="'+vers.position+'"]').attr("data-ncambio", n_cambio);
		$('.casilla[data-pos="'+vers.position+'"] .ncambio_casilla').html(n_cambio);			
		$('.casilla[data-pos="'+vers.position+'"] .fch_upd_casilla').html(fecha_updated.toLocaleTimeString());
		
		// ** texto **
		$('.casilla[data-pos="'+vers.position+'"] .contenido').html(vers.text)

		// ** INFO OBRA **
		obra.t_Ultimo = fecha_updated;
		$('#tLastObra').html(obra.t_Ultimo.toLocaleTimeString());
	}



}


// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
//  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
//  # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 



// ********* CASILLAS **********

function renovarCasilla(idCasillaTmp) {

	var data=null;

	// He borrado cosas...
	// leer texto via ajax y lo pone en data
	//
	// si lo leo en otra parte puedo pasarlo como argumento
	// 

    var json = eval("(" + data + ")");
    var txtGen = json.txtGenerado;

	var listaCasillasModificar  = updateCasilla(casillas[idCasillaTmp-1], txtGen);

	$.each(listaCasillasModificar, function(index, cas_vecina) {
		//updateCasilla(cas_vecina);
		// ejecutarlo pasado un tiempo
		setTimeout(function() {updateCasilla(cas_vecina);}, 800);
	});

}

function updateCasilla(cas, newFrase) {
		// hace scroll a la casilla

		// actualiza el texto de la casilla
		// compara con las casillas vecinas
		// devuelve la lista de vecinos a comparar

		// scroll a la casilla!
		scrollToCasillas(cas.id);

		// resetCasilla
		cas.resetPalabras();

		// meter nuevo texto solo si hay nuevo texto
		if(newFrase) cas.updateTexto(newFrase);

		// hay que llamar a esto para update palabras repetidas
		// - Por cada nivel: comparar con las casillas correspondiente
		var cas_min, cas_max;
		// casillas afectadas
		if(!obra.bClosed) {
			// casoI: secuencia lineal
			cas_min = Math.max(1, parseInt(cas.id) - obra.visib);
			cas_max = Math.min(obra.numCasillas, parseInt(cas.id) + obra.visib);
		}
		else {
			// casoII: secuencia circular
			cas_min = ((parseInt(cas.id) - obra.visib)<=0)? (obra.numCasillas+(parseInt(cas.id) - obra.visib)) : Math.max(1, parseInt(cas.id) - obra.visib);
			cas_max = ((parseInt(cas.id) + obra.visib)>obra.numCasillas)? ( obra.visib - obra.numCasillas-parseInt(cas.id) ) : Math.min(obra.numCasillas, parseInt(cas.id) + obra.visib) ;
		}

		var casillasModificar = new Array();
		for(icas = cas_min; icas<=cas_max; icas++) {
			var nivel = Math.abs(cas.id - icas);
			// Test cambiar clase de palabra
			if(nivel!=0) {
				// Si no es la misma casilla, comparar y cambiar letras
				var swModifVecino = comparaCasillas(cas, casillas[icas-1], nivel);
		//		console.log("Comparadas c1 " +cas.id+ " con c2: "+ icas + "      Nivel: " + nivel + "    modif c2: "+swModifVecino);
				if(swModifVecino) {
					casillasModificar.push(casillas[icas-1]);
				}
			}

		}

//		console.log("Fin Comparacion c1: vecinos a modificar "+casillasModificar.length);
		return casillasModificar;
}

function comparaCasillas(c1, c2, nivel) {
	var bCoinc12 = false;	// Indica si hay alguna palabra coincidente entre c1 y c2 
	var coincids = new Array();

	// para cada word de c1, buscarla en las de c2
	for(var p1=0; p1<c1.palabras.length; p1++ ) {
		if(c1.palabras[p1]!="") {
			for(var p2=0; p2<c2.palabras.length; p2++ ) {				
				// ### comparar con minusculas!

				if(c1.palabras[p1] == c2.palabras[p2]) {
//					console.log("COINCIDE: "+c1.palabras[p1]);
					c1.setClasePalabra(c1.palabras[p1], nivel);
					bCoinc12 = true;
					// anotar la palabra en la lista de coincidencias de c1 y c2 
					coincids.push(c1.palabras[p1]);
					break;
				}
			}
		}
	}

	return bCoinc12;
}


// Unir todas las casillas en containerTextoObra:
function unionTexto() {
	// En el div #containerTextoObra poner un <p> que contiene todos los textos de las 
	// casillas seprados por algún caracter (., espacio, barritas...)

}


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 


// clase Casilla: frase + array palabras
var Casilla = function( id, txti, n_vis ) {

	// CODIGO AL FINAL!
	// this.texto;		// texto formateado de la casilla
	// this.textoClean;		// texto en bruto de la casilla
	// this.palabras = new Array();
	// this.timesUpdts = new Array();

	// funciones de objeto Casilla:
	this.updateTexto = function(txtNew) {

		// tiempo de actualizacion
		// var d=new Date();
		// var t=d.toLocaleTimeString();
		// this.timesUpdts.push(d);

		this.texto = txtNew;		// texto formateado de la casilla
		this.textoOrig = txtNew;		// texto en bruto de la casilla
		this.textoClean = txtNew;		// texto sin signos de puntuacion
		this.palabras = new Array();

		// // limpiar el texto de signos de puntuación
		this.textoClean = limpiarTexto(txtNew);

		// pasarlo a array de palabras
		this.palabras = this.textoClean.split(' ');

		// Hacer Unique para quitar duplicados del conjunto de palabras
		this.palabras = this.palabras.unique();

		// Hacer update del DOM!
		$(this.idDOMstr).html(txtNew);

	}

	// # # # # # setClasePalabra
	//
	this.setClasePalabra = function(palabra, level) {
		// cambia la palabra en el <div> correspondiente
		// var idDOMstr = '#frase-'+this.id + ' p';
		// var idDOMstr = '.casilla[data-pos="'+this.id+'"] .contenido';

		var bSpan = false;

		// revisar si ya hay algun span con el contenido = palabra
		$.each($(this.idDOMstr).children(".tipob"), function(){
			if(palabra == $(this).html()) {
//				console.log(palabra + " *** Ya tiene <SPAN> ******");
				bSpan = true;
			}
		});

		// Si no hay <SPAN class="..."> con la palabra de interés => aplicarlo
		if(!bSpan) {


			// Esto cambia porque ahora se aplican estilos!

						var clase = "tipoa";
						var replaceClass = "<span class='"+clase+"'>"+palabra+"</span>";
						var regex = new RegExp("\\b"+palabra+"\\b", "g");
					//			var regex = new RegExp(palabra, "g");

					// * * * * 
						// $(idDOMstr).html( $(idDOMstr).html().replace(regex, replaceClass) );
						// this.texto = $(idDOMstr).html();
						this.texto = $(this.idDOMstr).html().replace(regex, replaceClass);
						$(this.idDOMstr).html( this.texto );
		}
	}

	this.resetPalabras = function() {
		// Quitar las clases a todas las palabras

		// una forma de hacerlo a saco es reiniciando tdo el html
		// var idDOMstr = '#frase-'+this.id + ' p';
		$(this.idDOMstr).texto = $(this.idDOMstr).textoClean;
		$(this.idDOMstr).html(this.textoClean);
	}


	this.limpiarTexto = function(txtin) {
		// limpiar el texto de signos de puntuación
		var txt_in = txtin.replace(/[\x2E\x2C\x21\x28\x29\x3B\x3A\x3F]/g, " ");	
		// .(2E) ,(2C) !(21) ((28) )(29) ;(3B) :(3A) ?(3F)
		//		txti = txti.replace('.', " ", 'g');
		txt_in = txt_in.replace(/¡/g, ' ', 'g'); // esto es facil que no vaya en explorer ppor los parametros
		txt_in = txt_in.replace(/¿/g, " ", 'g'); // idem
		while(txt_in.indexOf("  ")>=0) {
			txt_in = txt_in.replace("  ", " ");
		}
		return txt_in;
	}


	this.html_datos_nueva_casilla = function (vers) {
		// Devuelve una cadena de texto HTML para una casilla
		// NO HACE UPDATE DE DOM NI DE OBJETOS

		var datos = "";
		var n_cambio = vers.version;

		var fecha_updated = new Date(vers.updated_at);

		this.time_last_update = new Date(vers.updated_at);
		
		datos += "<div class='casilla tipoa' ";
		datos += "data-pos='"+vers.position+"' ";
		datos += "data-ncambio='"+n_cambio+"' ";
		datos += ">";
		datos += "<span class='cabecera_casilla'>";
		datos += 	"<span class='posic_casilla'>" + vers.position + "</span>";
		datos += 	"/"
		datos += 	"<span class='ncambio_casilla'>" + n_cambio + "</span>";
		datos += 	" - ";
		datos += 	"<span class='fch_upd_casilla'>" + fecha_updated.toLocaleTimeString() + "</span>"; //hora_updated;
		datos += " | ";
		datos += "</span>"
		datos += "<span class='contenido'>";
	//	datos += 	vers.text;	
		datos += "</span></div>";


		return datos;
	}


	// - - - - - CODE CASILLA - - - - - - 

	this.id = id;	// es igual a json: position. Vale: 1,2,3...


	this.time_last_update = null;
//	this.timesUpdts = new Array();
	this.updateTexto(txti);

	this.idDOMstr = '.casilla[data-pos="'+this.id+'"] .contenido';

	this.visibs = new Array(2*n_vis);	// 2* porque se guardan datos de vecinos prev y next
	$.each(this.visibs, function(index, value) {
		value = 0;
	});

}
// ******* Fin Clase Casilla *********


