function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.158.40.212:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

//Manejador GET
function traerInformacionSkate() {
    $.ajax({
        url:"http://129.158.40.212:8080/api/Quadbike/all",
        //url: "http://localhost:8080/api/Quadbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaSkate(response);
        }

    });

}

function pintarRespuestaSkate(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Brand</td>";
        myTable+="<td>Year</td>";
        myTable+="<td>Description</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar Quadbike!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="cargarDatosSkate(' + response[i].id + ')">Editar quadbike!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar quadbike!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaSkate").html(myTable);
}

//Capturar informacion para Actualizar
function cargarDatosSkate(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.158.40.212:8080/api/Quadbike/"+id,
        //url: "http://localhost:8080/api/Quadbike/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarSkate() {

   // if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#rooms").val().length == 0 || $("#description").val().length == 0){
       //alert("Todos los campos son obligatorios")
    //}else{

            let elemento = {
                name: $("#name").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.158.40.212:8080/api/Quadbike/save",
                //url: "http://localhost:8080/api/Quadbike/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                   // $("#resultado").empty();
                    $("#name").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    //}
}

//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.158.40.212:8080/api/Quadbike/"+idElemento,
            //url: "http://localhost:8080/api/Quadbike/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name").val(),
            brand: $("#brand").val(),
            rooms: $("#year").val(),
            description: $("#description").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.158.40.212:8080/api/Quadbike/update",
           // url: "http://localhost:8080/api/Quadbike/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();
                traerInformacionSkate();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
