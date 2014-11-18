// The following short JSON file called "data.json" is parsed 

/*
version: {
"id":3930,
"created_at":"2010/04/23 20:16:57 +0000",
"text":null,
"position":1,
"work_id":81,
"user_id":null,
"piece_id":1277,
"updated_at":"2010/04/23 20:16:57 +0000",
"version":1
}
*/

// HAy un problema con el campo "text" porque a veces es null, 
// en esas coasiones no se puede extraer como un String y da error.

JSONArray values;

int numEntradas;



void setup() {

  values = loadJSONArray("https://riverrun-2.herokuapp.com/works/54/changelog.json");

  numEntradas = values.size();

  println("Numero de entradas: " + numEntradas);

  for (int i = 0; i < numEntradas; i++) {
    
    JSONObject version = values.getJSONObject(i); 
//
    JSONObject versionData = version.getJSONObject("version");
    int id = versionData.getInt("id");
    int position = versionData.getInt("position");
    int vers = versionData.getInt("version");
    
    println(versionData);
    String txt = "";
//    if( versionData.getInt("text")==0) { 
//      //txt = versionData.getString("text");
//    }

//    println(id + " pos:version=" + position + ":"+vers+"    TXT:"+txt);
    println(id + " pos-version=" + position + "-"+vers);
//    String species = animal.getString("species");
//    String name = animal.getString("name");

//    println(id + ", " + species + ", " + name);
  }
}

// Sketch prints:
// 0, Capra hircus, Goat
// 1, Panthera pardus, Leopard
// 2, Equus zebra, Zebra
