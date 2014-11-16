// ****
// *
// *   Control de tipos de letra, colores...
// *
// ****

var colorTexto;
var colorFondo;
var colorFondo_hover;

var settings = {
	parFuentes : 10,
	colorTexto_a : "#000000",
	colorTexto_b : "#0099FF",
	colorFondo : "#FFFFFF",
	colorFondo_Transp : 'rgba(255, 255,255, 0.0)',// "#FFFFFF",
	colorFondo_hover : "#CCFF33",
	colorFondo_eco : "#CCFF33",
	sizetxt : 20
}

$(document).ready(function() {

	// **** 	SELECCION DE TIPO DE LETRA 		****
	parActual = settings.parFuentes; // $("#parFuentes").val();

	$("#parFuentes").val(settings.parFuentes);

	// coger el valor de parFuente
	$('.tipoa').addClass("fuente-"+settings.parFuentes+"a");
	$('.tipob').addClass("fuente-"+settings.parFuentes+"b");

	$("#parFuentes").change(function() {

		var tipofuente = "fuente-"+$(this).val();
		$('.tipoa').removeClass("fuente-"+settings.parFuentes+"a");
		$('.tipob').removeClass("fuente-"+settings.parFuentes+"b");
		$('.tipoa').addClass(tipofuente+"a");
		$('.tipob').addClass(tipofuente+"b");

		settings.parFuentes = $(this).val();

	})

	// *** TAMAÑO TEXTO ***
	function updateTextSize() {
		var val_txtsize = $('#f_textsize').val();
		settings.sizetxt = val_txtsize;
		$('#v_textsize').val(val_txtsize);
		$("#testTexto .tipoa").css("font-size", val_txtsize+"px");
		$(".tipoa").css("font-size", val_txtsize+"px");
		$(".tipob").css("font-size", val_txtsize+"px");
	}

	$('#f_textsize').val(settings.sizetxt);
	
	updateTextSize();
	
	$('#f_textsize').change( function() {
		updateTextSize();
	});


	// **** 	SELECCION DE COLORES 		****
	// calculo de color de fondo
	// settings.colorFondo_eco = jQuery.Color(settings.colorFondo_hover);
	// var ll = settings.colorFondo_eco.lightness();
	// ll *= 1.1;		if(ll>1) ll=1;		// ll=1;
	// settings.colorFondo_eco = settings.colorFondo_eco.lightness(ll);
	// console.log("COLORES. Fondo, Eco: " + settings.colorFondo_hover+"  "+settings.colorFondo_eco)

	function cambiaBrillo( micolor, pct ) {
		var color_tmp =  jQuery.Color(micolor);
		var ll = color_tmp.lightness();
		ll *= pct;		if(ll>1) ll=1;
		color_tmp = color_tmp.lightness(ll);
		return color_tmp;
	}


	$("#colorTexto").val(settings.colorTexto_a);
	$("#colorTexto-b").val(settings.colorTexto_b);
	$(".tipoa").css("color", settings.colorTexto_a);
	$(".tipob").css("color", settings.colorTexto_b);

	$('#colorFondo').val(settings.colorFondo);
	$("#colorFondo-hover").val(settings.colorFondo_hover);
	$("#testTexto").css("background-color", settings.colorFondo);
	$(".casilla").css("background-color", settings.colorFondo_Transp);

	settings.colorFondo_eco = cambiaBrillo(settings.colorFondo_hover, 1.2 );
	//console.log("COLORES. Fondo, Eco: " + settings.colorFondo_hover+"  "+settings.colorFondo_eco);

	// **** EVENTOS ****
	$("#colorFondo").change(function() {
		settings.colorFondo = $(this).val(); //$("#colorFondo").val();
		$("#testTexto").css("background-color", settings.colorFondo);
		$(".casilla").css("background-color", settings.colorFondo_Transp);

		$("body").css("background-color", settings.colorFondo);
		$("#containerObra").css("background-color", settings.colorFondo_Transp);
		$("#containerTextoObra").css("background-color", settings.colorFondo);
	});
	$("#colorFondo-hover").change(function() {
	//	console.log("COLORES. Fondo, Eco, This: " + settings.colorFondo_hover+"  "+settings.colorFondo_eco+"   "+$(this).val());
		settings.colorFondo_hover = $(this).val(); //$("#colorFondo-hover").val();
		settings.colorFondo_eco = cambiaBrillo(settings.colorFondo_hover, 1.2 );
	//	console.log("COLORES. Fondo, Eco: " + settings.colorFondo_hover+"  "+settings.colorFondo_eco);
	});

	$("#colorTexto").change(function() {
		settings.colorTexto_a = $(this).val();
		$(".tipoa").css("color", settings.colorTexto_a);
	});
	$("#colorTexto-b").change(function() {			
		settings.colorTexto_b = $(this).val();
		$(".tipob").css("color", settings.colorTexto_b);
	});

	// Background del cuadro de test de estilos
	$("#testTexto")
		.mouseenter(function() {
			//$(this).css("background-color", colorFondo_hover);
			$(this).stop().animate({
					backgroundColor: settings.colorFondo_hover
				}, 150
			);

		})
		.mouseleave(function() {
//				$(this).css("background-color", colorFondo);
			$(this).stop().animate({
					backgroundColor: settings.colorFondo
				}, 100
			);
		});

})

function setTipos() {
	// ESTA FUNCION SOLO SE UTILIZA PARA INICIALIZAR NUEVA OBRA

	var fuente = settings.parFuentes;
	var tipofuente = "fuente-"+fuente;
	// $('.tipoa').removeClass("fuente-"+settings.parFuentes+"a");
	// $('.tipob').removeClass("fuente-"+settings.parFuentes+"b");
	$('.tipoa').addClass(tipofuente+"a");
	$('.tipob').addClass(tipofuente+"b");

	$(".tipoa").css("color", settings.colorTexto);
	$(".tipob").css("color", settings.colorTexto_b);

	$(".casilla").css("background-color", settings.colorFondo_Transp);
	
	var sizetxt = $('#f_textsize').val();
	settings.sizetxt = $('#f_textsize').val();		// 15062013
	$(".tipoa").css("font-size", settings.sizetxt+'px');
	$(".tipob").css("font-size", settings.sizetxt+'px');

	// eventos mouse
	$("#obraCasillas .casilla")
		.mouseenter(function() {
			//$(this).css("background-color", colorFondo_hover);
			$(this).stop().animate({
					backgroundColor: settings.colorFondo_hover
				}, 150
			);

		})
		.mouseleave(function() {
//				$(this).css("background-color", colorFondo);
			$(this).stop().animate({
					backgroundColor: settings.colorFondo_Transp
				}, 100
			);
		});


	// Formas Texto
    $('#boton_ordenForma').click(function() {
    	console.log("BOTON ORDEN FORMA");
        $('#contForma').html('');
        var cc = $('#ordenForma').val();
        //console.log("BOTON ORDEN FORMA - orden: cc: " + cc);
        $('#contForma').html( cc );
        // console.log("FIN ORDEN BOTN FORMA: cc: "+cc);
    });
	

}

function updateTiposCasilla(c) {
	// volver a defnir los estilos de la casilla c
	console.log("updateTiposCasilla " + c.idDOMstr_cont + " children(tipob): " + $(c.idDOMstr_cont).children('.tipob').size() );

	var fuente = settings.parFuentes; // $("#parFuentes").val();
	var tipofuente = "fuente-"+fuente;
	$(c.idDOMstr_cont).children('.tipob').addClass(tipofuente+"b");

	$(c.idDOMstr_cont).children('.tipob').css( {
								"color":settings.colorTexto_b, 
								"font-size":settings.sizetxt+'px'
							});
}