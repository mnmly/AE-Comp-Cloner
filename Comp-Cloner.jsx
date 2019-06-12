#include "json2.jsx"

var data = loadJSON()
var prototypeComp = null

for (var i = 1; i <= app.project.numItems; i++) {
    var item = app.project.item(i)
    if (item instanceof CompItem && item.name == 'Prototype') {
        prototypeComp = item
        break;
    }
}

if (prototypeComp && data) {
    for (var i = 0; i < data.length; i++) {
        var dataObj = data[i]
        var newComp = duplicateComp(prototypeComp, 'Title_' + data[i]['ID'] + '_' + data[i]['Student Name'])
        applyDataToComp(dataObj, newComp)
    }
}

function loadJSON(){
    var myJSONobject;
    var jsonFilepath = File.openDialog("Selection prompt");
    var jsonFile = File(jsonFilepath);
    var content;
    if(jsonFile != false){
        jsonFile.open('r');
        content = jsonFile.read();
        try {
            var json = JSON.parse(content);
        } catch(e) {
            alert(e)
        }
        jsonFile.close(); // always close files after reading
        return json
    }else{
        return null
    }
};

function duplicateComp( comp , newName) {
    // add a page at the end of the current document,
    // place a text frame on it, and link the text frame
    var newComp = comp.duplicate()
    newComp.name = newName
    return newComp
}

function applyDataToComp( data, comp ) {

    for ( var i = 1; i <= comp.numLayers; i++ ) {
        var layer = comp.layer( i )
        var value = data[ layer.name ]
        if ( value && layer instanceof TextLayer ) {
            layer.property("Source Text").setValue(value);
        }
    }

}
