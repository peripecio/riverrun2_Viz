function obrasMgr_update_obras() {
	ajax_LeerObras();
}

function ajax_LeerObras() {
	$.ajax({
		type: 'GET',
		url: 'http://riverrun-2.herokuapp.com/works.json', 
		async: false,
		contentType: 'application/json; charset=utf-8',
		crossDomain: true,
		dataType: 'jsonp',
		success: leer_obras,
		error: function(e, desc, errThrow)
		{
		   console.log("**OBRAS ERROR** : " + e.status + "-" + e.statusText);
		   console.log("**OBRAS ERROR DESCR** : " + desc);
		   console.log("**OBRAS ERROR THROW** : " + errThrow);
		}
	});
}

function leer_obras(data)
{
	// limpiar el div donde se listan las obras
	$('#lista_obras').html("");

	$.each(data, function(i,item) {
		var datos = "";
		var vers = item.work;
		// var n_cambio = vers.version;
		datos += html_FilaDatosObra(vers);
		$('#lista_obras').append(datos);
	});

	$('.div_obra').click (
		select_obra_nueva
	);
}

function html_FilaDatosObra(vers) {

		var fecha_created = new Date(vers.created_at);
		var ymd_created = fecha_created.getFullYear()+"/"+(fecha_created.getMonth()+1)+"/"+fecha_created.getDate();	
		var hms_created = fecha_created.getHours()+":"+fecha_created.getMinutes()+":"+fecha_created.getSeconds();	

		var fecha_completed = new Date(vers.completed_at);
		var ymd_completed = (vers.completed_at != null)? fecha_completed.getFullYear()+"/"+(fecha_completed.getMonth()+1)+"/"+fecha_completed.getDate()   :   "----/--/--";	
		var hms_completed = (vers.completed_at != null)? fecha_completed.getHours()+":"+fecha_completed.getMinutes()+":"+fecha_completed.getSeconds()    :   "--:--:--";	

		var datos = "<div class='div_obra' ";
		datos += " data-id = '"+vers.id+"'";
		datos += " data-name = '"+vers.name+"'";
		datos += " data-visibility_radio = '"+vers.visibility_radio+"'";
		datos += " data-cyclic = '"+vers.cyclic+"'";
		datos += " data-completed_at = '"+vers.completed_at+"'";
		datos += " data-created_at = '"+vers.created_at+"'";
		datos += ">";
		datos += "<span class='o_id'>"+vers.id+"</span>";
		datos += "<span class='o_name'>" + vers.name + "</span>";
		datos += "<span class='o_visib'>"+vers.visibility_radio + "</span>";
		datos += "<span class='o_cyclic'>"+vers.cyclic + "</span>";
		datos += "<span class='o_fch'>" + ymd_created+"-"+hms_created + "</span>";
		datos += "<span class='o_fch'>" + ymd_completed+"-"+hms_completed + "</span>";
		datos += "</div>";

		return datos;
}


function select_obra_nueva(data) {

	// Marcador en la lista de obras:
	// limpiar la linea de la obra anterior
	$(".selected").removeClass("selected");
	// marcar la linea de la nueva obra 
	$(this).addClass("selected");

	var logg = "select_obra_nueva() - id: " + $(this).attr('data-id');
	logg += "     name: "+$(this).attr('data-name');
	console.log(logg);

	var tmpobra_id = $(this).attr('data-id');
	var tmpobra_name = $(this).attr('data-name');
	var tmpobra_visib = $(this).attr('data-visibility_radio');
	var tmpobra_cyclic = $(this).attr('data-cyclic');
	var tmpobra_tcr = $(this).attr('data-created_at');
	var tmpobra_tco = $(this).attr('data-completed_at');	// puede ser null


	// quitar cosas de obra antigua (si la hay)
	// en particular los timers!
	if(obra!=null) obra.abortTimer();

	$('#obraCasillas').html('');

//	$('#containerTextoObra').html('');
	$('#unionCasillas').html('');

	// crear obra nueva
	obra = new Obra(tmpobra_id, tmpobra_name, tmpobra_visib, tmpobra_cyclic, tmpobra_tcr, tmpobra_tco);

	$('#titObra').html(obra.titulo);
	$('#rVisObra').html(obra.visib);
	$('#ciclObra').html(obra.cyclic);
	var d_creat = new Date(obra.created_at);
	$('#tCreatedObra').html(d_creat.toLocaleDateString() + " " + d_creat.toLocaleTimeString());//obra.created_at);

	if(obra.completed_at == null) {
		console.log("obra completed_at ==> NULL");
		$('#tCompletedObra').html("Sin terminar");
	} else {
		var d_cmplt = new Date(obra.completed_at);
		console.log("obra completed_at ==> OK");
		$('#tCompletedObra').html(d_cmplt.toLocaleDateString() + " " + d_cmplt.toLocaleTimeString());//obra.completed_at);		
	}

	$('#tLastObra').html(d_creat.toLocaleTimeString());//obra.completed_at);


	// Mostrar cartel de datos de obra
	$('#infoObra').show();

	// quitar las casillas que haya

	// limpiar timer
	//abortTimer();

	// inicializar Obra: numero de casillas....
	// $('.tweet').remove();
	obra.update_Obra();

//	tid = setInterval(update_Obra, t_update_obra);
//	obra.initTimer();

}




