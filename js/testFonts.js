

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
var nombres_Fonts = new Array();

nombres_Fonts = [
	"Arno Pro Caption",
	"Arno Pro Bold Italic Caption",

	"Arno Pro Subhead",
	"Arno Pro Italic SmText",

	"Arno Pro Display",
	"Arno Pro Bold Italic Display",

	"Arno Pro Semibold Subhead",
	"Arno Pro Bold Italic",
	// G05
	"ITC Franklin Gothic Std Book Compressed",
	"ITC Franklin Gothic Std Book Compressed Italic",

	"ITC Franklin Gothic Std Demi Compressed",
	"ITC Franklin Gothic Std Demi Compressed Italic",

	"ITC Franklin Gothic Std Book Condensed",
	"ITC Franklin Gothic Std Book Condensed Italic",

	"ITC Franklin Gothic Std Demi Condensed",
	"ITC Franklin Gothic Std Demi Condensed Italic",

	"Sabon LT Std Roman",
	"Sabon LT Std Italic",
	//G10
	"Sabon LT Std Bold",
	"Sabon LT Std Bold Italic",

	"Sabon LT Std Roman",
	"Sabon LT Std Bold Italic",

	"Sabon LT Std Bold",
	"Sabon LT Std Italic",

	"Avenir LT Std Light",
	"Avenir LT Std Light Oblique",

	"Avenir LT Std Book",
	"Avenir LT Std Book Oblique",
	// G15
	"Avenir LT Std Roman",
	"Avenir LT Std Oblique",

	"Avenir LT Std Medium",
	"Avenir LT Std Medium Oblique",

	"Franklin Gothic Book Regular",
	"Franklin Gothic Book Italic",

	"Franklin Gothic Demi Regular",
	"Franklin Gothic Demi Italic",

	"Franklin Gothic Heavy Regular",
	"Franklin Gothic Heavy Italic",
	// G20
	"Franklin Gothic Medium Regular",
	"Franklin Gothic Medium Italic",

	"DINMittelschrift Regular (Medium)",
	"DIN-RegularItalic Regular",

	"ITC Garamond Std Ultra Condensed",
	"ITC Garamond Std Bold Narrow Italic",

	"ITC Garamond Std Ultra Narrow",
	"ITC Garamond Std Ultra Condensed Italic",

	"ITC Garamond Std Book Condensed",
	"ITC Garamond Std Light Condensed Italic",
	// G25
	"ITC Garamond Std Light",
	"ITC Garamond Std Ultra Narrow Italic"
]

$(document).ready(function(){
	// poner datos Obra
	var titulo = "Obra Nueva";
	var bClosed = false;
	var numCasillas = 25;	// igual al numero de tipos de letra
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

	// Crear Casillas
	crearCasillas();

	// Eventos de teclado
	$(document).keydown(handlerKeyDown);

});

function setCasillaP_Font( nF ) {
	fontAct = nF;
	$('.casilla p').css("font-style", fonts[fontAct]['a']);
//	$('.casilla p').css("font-style", fonts[fontAct]);
}

function setCasillaP_FontNxt() {
	fontAct++;
	fontAct%=nFonts;

//	console.log("fAct "+fontAct + "   " + fonts[fontAct]['a']);
	$('.casilla p').css('font-family', fonts[fontAct]['a']);
}

function handlerKeyDown( eTecla ) {

	//		console.log(eTecla);
	console.log(eTecla.keyCode);
	if(eTecla.keyCode == 81) {	// q
	}
	else if(eTecla.keyCode == 65) {	// a
	}
	else if(eTecla.keyCode == 87) {	// w
	}
	else if(eTecla.keyCode == 83) {	// s
	}

	else if(eTecla.keyCode == 84) {	// t
	}

	else if(eTecla.keyCode == 70) {	// f
	}


}

function crearCasillas() {
	// borrar casillas del DOM si las hay
	$('.contCasilla').remove();

	// añadir casillas en DOM
	for(var i=1; i<=obra.numCasillas; i++) {
		$('#containerCasillas').append(function() {
			var htmlCasilla = "<div class='contCasilla' data-id='"+i+"'>";
			htmlCasilla += "<h3><span class='"+fonts[i-1]['a']+"'>"+nombres_Fonts[2*(i-1)]+"</span> - <span class='"+fonts[i-1]['b']+"'>"+nombres_Fonts[2*(i-1)+1]+"</span></h3>";
			htmlCasilla += "<span id='frase-"+i+"' class='casilla'><p></p></span>";
			htmlCasilla += "<div class='clearDiv'></div>";
			htmlCasilla += "</div>";
			return htmlCasilla;
		} );
	}

	// asignar txto a las casillas
	var i=1;
	$('.casilla p').each( function() {
		$(this).html("<b>"+i+" - - </b>"+grpFrases[0]);			// insertar contenido
		i++;
	});

	$('.casilla p').hover(
		// MOUSE IN
		function() {
			var idc = $(this).parent().parent().attr('data-id');
			// asignar clase
			$(this).removeClass(fonts[idc-1]['a']);
			$(this).addClass(fonts[idc-1]['b']);
			// $(this).stop().animate({
			// 			"color": "#333"
			// 		}, 500
			// 		);
			$(this).parent().parent().stop().animate({
						backgroundColor: "#CCC"
					}, 300
					);
		},
		// MOUSE OUT
		function() {
			var idc = $(this).parent().parent().attr('data-id');

			$(this).removeClass(fonts[idc-1]['b']);
			$(this).addClass(fonts[idc-1]['a']);
			// $(this).stop().animate({
			// 			"color": "#888"
			// 		}, 300
			// 		);
			$(this).parent().parent().stop().
					animate({
						backgroundColor: "#FFF"
					}, 200);

		}
	);


	i=0;
	$('.casilla p').each( function() {
		$(this).addClass(fonts[i]['a']);
		i++;
	});


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