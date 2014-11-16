// * * * * * * * * * * * *
//	Utilidades para arrays y para scroll

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

// ************
// SCROLL
// ************

function goToByScroll(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}

function scrollToCasillas(id){
    $('html,body').animate({scrollTop: $('.casilla[data-pos="'+id+'"]').offset().top - 150},'slow');
//    $('.contCasilla[data-id|="'+id+'"]').css('backgroundColor','rgba(200,200,200,0.2)');
}

// ************
// LIMPIAR TEXTO
// ************

function limpiarTexto(txtin) {
	// limpiar un texto de signos de puntuación
	// Devuelve el texto con los signos sustituidos por espacios, y sin espacios dobles

	if(txtin!=null) {
		txtin = txtin.replace(/[\x2E\x2C\x21\x28\x29\x3B\x3A\x3F]/g, " ");	
		// .(2E) ,(2C) !(21) ((28) )(29) ;(3B) :(3A) ?(3F)
		//		txti = txti.replace('.', " ", 'g');
		txtin = txtin.replace(/¡/g, ' ', 'g'); // esto es facil que no vaya en explorer ppor los parametros
		txtin = txtin.replace(/¿/g, " ", 'g'); // idem
		while(txtin.indexOf("  ")>=0) {
			txtin = txtin.replace("  ", " ");
		}
	}
	return txtin;
}