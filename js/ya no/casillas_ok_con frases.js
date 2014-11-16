

// GLOBALES
var obra;
var casillas = new Array();

var tid ;

// colores: 
	// https://kuler.adobe.com/#create/fromacolor
	// http://es.fuelyourcreativity.com/ls-rueda-del-color-definitiva/

// fuentes
var nFonts;
var fontAct;
var fonts = new Array();

$(document).ready(function(){
	// poner datos Obra
	var titulo = "Obra Nueva";
	var bClosed = false;
	var numCasillas = 56;
	var visib = 1;

	// Fuentes
	nFonts = 25;
	fontAct = 6;
	for(var i=1; i<=nFonts; i++) {
		var numTmp = (i<10)? "0"+i : i;
		fonts.push(
			{'a':'fuente-'+numTmp+'a',
			 'b':'fuente-'+numTmp+'b',
			});
//		console.log("INIT FONTS: " + i + " --- " + fonts[i-1]['a'] + " ++++ " + fonts[i-1]['b']);
	}

	obra = new Obra(titulo, numCasillas, visib, bClosed);

	// Rellenar datos de Obra
	$('#titulo').html(obra.titulo);
	$('#numcasillas').html(obra.numCasillas);
	$('#bclosed').html( (obra.bClosed)? 'cerrado' : 'abierto');
	$('#visib').html(obra.visib);

	// Crear Casillas
	// Modo Test: las crea a partir de lo que esta escrito en HTML
	crearCasillas();

	// Modo Live: las crea a partir de lecturas de json/BD
	// TIMERS
	// Leera con un timer
	// . . . 
	tid = setInterval(timerUpdate, 3000);

	// Timer para mostrar la hora:
	var timerHora=setInterval(function(){
		var d=new Date();
		var t=d.toLocaleTimeString();
		$("#tiempo").html(t);		
	},1000);

	// si click en casilla: hacer comparacion con las otras
	$('.casilla').click(function(e) {
		var idCasillaTmp = $(this).parent().attr("data-id");
		var nfrase = Math.floor(Math.random()*grpFrases.length);
//		updateCasilla(casillas[idCasillaTmp-1], grpFrases[nfrase]);

		var listaCasillasModificar  = updateCasilla(casillas[idCasillaTmp-1], grpFrases[nfrase]);
		$.each(listaCasillasModificar, function(index, cas_vecina) {
			updateCasilla(cas_vecina);
		});

		e.preventDefault();
	});

	// set interval
//	var tid = setInterval(timerUpdate, 2000);

	$(".reset").click(function() {
		var idCasilla = $(this).parent().attr("data-id");
		casillas[idCasilla-1].resetPalabras();
	});


	$(".wRep").mouseover(function() {
		var left = $(this).offset().left;
		var top  = $(this).offset().top;
		console.log("over span "+top+","+left);
		var position = $(this).position();
 		console.log('X: ' + position.left + ", Y: " + position.top );		
	});


	// Eventos de teclado
	// $(document).keypress(func);
	$(document).keydown(handlerKeyDown);
	// $(document).keyup(func);

});

function setCasillaP_Font( nF ) {
	fontAct = nF;
	$('.casilla p').css("font-style", fonts[fontAct]['a']);
//	$('.casilla p').css("font-style", fonts[fontAct]);
}

function setCasillaP_FontNxt() {
	fontAct++;
	fontAct%=nFonts;

	console.log("fAct "+fontAct + "   " + fonts[fontAct]['a']);
	$('.casilla p').css('font-family', fonts[fontAct]['a']);
	// $('.casilla > p').css('color', '#440');
	// console.log(" seleccionados: " + $('.casilla p').length + "    " + fonts[fontAct]['a']);
	// $('.casilla p').each(function(){
	// 	$(this).css('font-style', fonts[fontAct]['a']);
	// 	console.log("letra: " + $(this).css('font-style'));
	// });
}

function handlerKeyDown( eTecla ) {

	//		console.log(eTecla);
	console.log(eTecla.keyCode);
	if(eTecla.keyCode == 81) {	// q
		$('.reset').show(120);
	}
	else if(eTecla.keyCode == 65) {	// a
		$('.reset').hide(300);
	}
	else if(eTecla.keyCode == 87) {	// w
		$('#contHeader').show(120);
	}
	else if(eTecla.keyCode == 83) {	// s
		$('#contHeader').hide(120);
	}

	else if(eTecla.keyCode == 84) {	// t
		abortTimer();
	}

	else if(eTecla.keyCode == 70) {	// f
		setCasillaP_FontNxt()
	}


}

function timerUpdate() {
	// actualiza random una casilla
	var idCasillaTmp = Math.floor(Math.random()*obra.numCasillas);

	var nfrase = Math.floor(Math.random()*grpFrases.length);
	var listaCasillasModificar  = updateCasilla(casillas[idCasillaTmp], grpFrases[nfrase]);


	//
	$.each(listaCasillasModificar, function(index, cas_vecina) {
		updateCasilla(cas_vecina);
	});

	// leer json
	// . . . 
	console.log('timerUpdate');

	$(".wRep").mouseover(function() {
		// TEST
		// Para comprobar que los span tienen posicion asignada:
		var left = $(this).offset().left;
		var top  = $(this).offset().top;
		console.log("over span "+top+","+left);
		var position = $(this).position();
// 		console.log('X: ' + position.left + ", Y: " + position.top );		
	});

}

function abortTimer() { // to be called when you want to stop the timer
	clearInterval(tid);
	console.log("abortTimer. tid:>"+tid+"<");
}


function crearCasillas() {
	// borrar casillas del DOM si las hay
	$('.contCasilla').remove();

	// añadir casillas en DOM
	for(var i=1; i<=obra.numCasillas; i++) {
		$('#containerCasillas').append(function() {
			var htmlCasilla = "<div class='contCasilla' data-id='"+i+"'>";
			htmlCasilla += "<span id='reset-"+i+"' class='reset'><p>R</p></span>";
			htmlCasilla += "<span id='frase-"+i+"' class='casilla'><p></p></span>";
			htmlCasilla += "<div class='clearDiv'></div>";
			htmlCasilla += "</div>";
			return htmlCasilla;
		} );
	}

	// crear casillas en 
	$('.casilla').each( function() {
		var id = $(this).parent().attr("data-id");
		console.log("crearCasillas->ID: " + id +"··>Cont:" + $(this).text() );
//		var cc = new Casilla( id, $(this).text() , obra.visib);
		var cc = new Casilla( id, "&nbsp;" , obra.visib);
		casillas.push( cc );
	});
}

function updateCasilla(cas, newFrase) {
		// resetCasilla
		cas.resetPalabras();

		// meter nuevo texto
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

		// Modificar las casillas que hagan falta.
		//		Lo hare fuera de la funcion
		// $.each(casillasModificar, function(index, cas_vecina) {
		// 	cas_vecina.resetPalabras();
		// 	// Una vez reseteada tocaría comparar con sus vecinos
		// 	// pero esta vez sin que se extienda cambio alguno.
		// 	comparaCasillas(cas_vecina, cas, nivel);
		// });

//		console.log("Fin Comparacion c1: vecinos a modificar "+casillasModificar.length);
		return casillasModificar;
}

function cambiaPalabraRnd(cas) {
		var nword = Math.floor(Math.random()*(cas.palabras.length-1));
		var level = 1;
		// cambiar la clase .txtAzul por ejemplo
		cas.setClasePalabra(cas.palabras[nword], level);

		// Se puede probar con: http://benalman.com/projects/jquery-replacetext-plugin/
}

function comparaCasillas(c1, c2, nivel) {
		var bCoinc12 = false;	// Indica si hay alguna palabra coincidente entre c1 y c2 
		var coincids = new Array();

		// para cada word de c1, buscarla en las de c2
		for(var p1=0; p1<c1.palabras.length; p1++ ) {
			if(c1.palabras[p1]!="") {
				for(var p2=0; p2<c2.palabras.length; p2++ ) {
					// si una palabra coincide
					
					// comparar con minusculas!

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


function resaltaWord() {
	// http://webmasters.guiaplaza.com/2012/02/script-para-buscar-palabras-o-textos-en.html
}


// Unir todas las casillas en textoObra:
function prepararTexto() {
	// En el div #textoObra poner un <p> que contiene todos los textos de las 
	// casillas

}

// * * * * * * * * * * * * * * * * * * * * 
// clase Casilla: frase + array palabras
var Obra = function( titulo, nCas, nVis, bClsd) {
	this.titulo = titulo;
	this.numCasillas = nCas;
	this.visib = nVis;
	this.bClosed = bClsd;

	this.casillas = new Array();

}



// * * * * * * * * * * * * * * * * * * * * 
// clase Casilla: frase + array palabras
var Casilla = function( id, txti, n_vis ) {

	// CODIGO AL FINAL!
	// this.texto;		// texto formateado de la casilla
	// this.textoClean;		// texto en bruto de la casilla
	// this.palabras = new Array();
	// this.timesUpdts = new Array();

	// 
	// funciones de objeto Casilla:
	//
	this.updateTexto = function(txtNew) {

		// tiempo de actualizacion
		var d=new Date();
		//var t=d.toLocaleTimeString();
		this.timesUpdts.push(d);

//		console.log("casilla.updateTexto => Num de updates: " + this.timesUpdts.length);


		this.texto = txtNew;		// texto formateado de la casilla
		this.textoOrig = txtNew;		// texto en bruto de la casilla
		this.textoClean = txtNew;		// texto sin sigons de puntuacion
		this.palabras = new Array();

		// // limpiar el texto de signos de puntuación
		this.textoClean = limpiarTexto(txtNew);

		// pasarlo a array de palabras
		this.palabras = this.textoClean.split(' ');

		// Hacerle Unique para quitar duplicados
		this.palabras = this.palabras.unique();

		// Hacer update del DOM!
		var idFrase = '#frase-'+this.id + ' p';
		$(idFrase).html(txtNew);

	}



	// # # # # # setClasePalabra
	//
	this.setClasePalabra = function(palabra, level) {
		// cambia la palabra en el <div> correspondiente
		var idFrase = '#frase-'+this.id + ' p';

		var bSpan = false;

		// revisar si ya hay algun span con el contenido = palabra
		$.each($(idFrase).children(".wRep"), function(){
//			console.log("PALABRO-a: "+this.innerHTML);	// funciona OK
//			console.log("PALABRO-b: "+$(this).html());	// mejor esto, que es jquery
			if(palabra == $(this).html()) {
//				console.log(palabra + " *** Ya tiene <SPAN> ******");
				bSpan = true;
			}

		});

		// Si no hay <SPAN class="..."> con la palabra de interés => aplicarlo
		if(!bSpan) {

	//		var clase = (Math.random()<0.5)? 'txtAzul':'txtAzulClaro';
	//		var clase = (Math.random()<0.5)? 'wRep txta fuente-23a fontSzUp txtVerde':'wRep txtb fuente-23b fontSzUp txtAzul';
//			var clase = 'wRep txta fuente-03b fontSzUp txtVerde';

//			var clase = 'wRep txta fuente-03b txtRojo';
			var clase = "wRep txta " + fonts[fontAct]['b'] + " txtRojo";

			var replaceClass = "<span class='"+clase+"'>"+palabra+"</span>";

			var regex = new RegExp("\\b"+palabra+"\\b", "g");
		//			var regex = new RegExp(palabra, "g");

//			console.log("** setClasePalabra **"+palabra+"**   "+regex);


		// * * * * 
			// $(idFrase).html( $(idFrase).html().replace(regex, replaceClass) );
			// this.texto = $(idFrase).html();
			this.texto = $(idFrase).html().replace(regex, replaceClass);
			$(idFrase).html( this.texto );


		}

	}



	this.resetPalabras = function() {
		// Quitar las clases a todas las palabras

		// una forma de hacerlo a saco es reiniciando tdo el html
		var idFrase = '#frase-'+this.id + ' p';
		$(idFrase).texto = $(idFrase).textoClean;
		$(idFrase).html(this.textoClean);
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


	// - - - - - CODE CASILLA - - - - - - 

	this.id = id;
	this.timesUpdts = new Array();
	this.updateTexto(txti);

	this.visibs = new Array(2*n_vis);	// 2* porque se guardan datos de vecinos prev y next
	$.each(this.visibs, function(index, value) {
		value = 0;
	});

}
// ******* Fin Clase Casilla *********

function limpiaTexto(strIn) {
	// recibe una cadena y la devuelve 
	// sin espacios 
	// ni signos de puntuacion
	// y las palabras todas en minusculas 
	// y separadas por un solo espacio

	var strOut;	

	return strOut;
}


function limpiarTexto(txtin) {
		// limpiar un texto de signos de puntuación
		// Devuelve el texto con los signos sustituidos por espacios, y sin espacios dobles

		txtin = txtin.replace(/[\x2E\x2C\x21\x28\x29\x3B\x3A\x3F]/g, " ");	
		// .(2E) ,(2C) !(21) ((28) )(29) ;(3B) :(3A) ?(3F)
		//		txti = txti.replace('.', " ", 'g');
		txtin = txtin.replace(/¡/g, ' ', 'g'); // esto es facil que no vaya en explorer ppor los parametros
		txtin = txtin.replace(/¿/g, " ", 'g'); // idem
		while(txtin.indexOf("  ")>=0) {
			txtin = txtin.replace("  ", " ");
		}
		return txtin;
	}

// * * * * * * * * * * * *
// FUNCIONES para eliminar duplicados en arrays!!!
// http://www.etnassoft.com/2011/06/24/array-unique-eliminar-valores-duplicados-de-un-array-en-javascript/
//
Array.prototype.unique=function(a){
	return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

// http://www.cristalab.com/tutoriales/programacion-orientada-a-objetos-oop-con-javascript-c232l/
Array.prototype.coincidencias = function(palabra) {
	coincidencias = 0;
	for (i=0; i<this.length; i++) {
	    if (this[i] == palabra) {
	        coincidencias++;
	    }
	}
}