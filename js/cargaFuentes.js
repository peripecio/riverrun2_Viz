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
	// Fuentes
	nFonts = 25;
	fontAct = 6;
	for(var i=1; i<=nFonts; i++) {
		var numTmp = (i<10)? "0"+i : i;
		fonts.push(
			{'a':'fuente-'+numTmp+'a',
			 'b':'fuente-'+numTmp+'b',
			});
	}
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

