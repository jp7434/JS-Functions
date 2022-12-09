/**
 * Función para ordenar objeto por string
 * @param {object} objeto objeto a filtrar 
 * @param {string} atributo nombre del atributo del objeto que se va a filtrar
 * 
 * Uso de función: 
 * 1 -> var objName = [{nombre: 'Julio'},{nombre: 'Esteban'},{nombre: 'Andrés'}];
 * 2 -> objectOrderByString(objName, 'nombre');
*/

const objectOrderByString = (objeto, atributo) => {
    objeto.sort(function (a,b) {
        return ((a[atributo] == b[atributo]) ? 0 : ((a[atributo] > b[atributo]) ? 1 : -1 ));
    });
}

/**
 * Función parar ordenar objeto según fechas o valores numéricos
 * @param {object} objeto objeto a filtrar
 * @param {string} tipo fechas | numeros
 * @param {string} orden asc | desc
 * @param {string} fecha nombre del atributo del objeto relacionado a fechas
 * @param {string} numero nombre del atributo del objeto relacionado a numeros
 * 
 * Uso de funcion: 
 * 1 -> var objDateNumber = [{fecha: '2022-10-26', numero: 15},{fecha: '2022-12-14', numero: 5}];
 * 2 -> objectOrderByDateOrNumber(objDateNumber, 'fechas', 'asc', 'fecha', null) || objectOrderByDateOrNumber(objDateNumber, 'numeros', 'desc', null, 'numero');
*/

const objectOrderByDateOrNumber = (objeto, tipo, orden, fecha = null, numero = null) => {
    objeto.sort(function (a, b) {
        var v1, v2;

        switch (tipo) {
            case 'fechas':
                v1 = new Date(a[fecha]);
                v2 = new Date(b[fecha]);
            break;
            case 'numeros':
                v1 = a[numero];
                v2 = b[numero];
            break;
        }

        var sort1 = v1, sort2 = v2;
    
        if(orden == 'asc'){
            return sort2 - sort1;
        }else if(orden == 'desc'){
            return sort1 - sort2;
        }
    });
}

/**
 * Función para encontrar index segun valor
 * @param {object} objeto 
 * @param {string, int} valor 
 * 
 * Uso de función:
 * 1 -> const objectIndex = [5, 12, 8, 130, 44];
 * 2 -> var index = objectGetIndex(objectIndex, 12);
 * @return index de valor
*/

const objectGetIndex = (objeto, valor) => {
    const value = (element) => element == valor;

    return objeto.findIndex(value);
}

/**
 * Función para ordenar objeto segun categoria/atributo
 * @param {object} objeto 
 * @param {string} atributo nombre del atributo a agrupar
 * 
 * Uso de function: 
 * 1 -> var objGroup = [{fecha: '2022-05-28', observacion: 1},{fecha: '2022-05-28', observacion: 2},{fecha: '2022-07-05', observacion: 3}];
 * 2 -> var newObj = objectGroupBy(objGroup, 'fecha');
 * @return objeto ordenado por valores de atributo
*/

const objectGroupBy = (objeto, atributo) => {
    const groupBy = objeto.reduce((group, array) => {
        group[array[atributo]] = group[array[atributo]] ?? [];
        group[array[atributo]].push(array);
        return group;
    }, {});

    return groupBy;
}

/**
 * Función para dejar la primera letra de un string en mayúscula
 * @param {string} str 
 * 
 * Uso de función: capitalizeFirstLetter(str);
 * @returns string con primera letra en mayúscula
*/
 
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Función para dar formato a las fechas
 * @param {string} fecha 
 * 
 * Uso de función: formatDate(fecha);
 * @returns fecha con formato Y-m-d h:i:s
*/

const formatDate = (fecha) => {
    let date = new Date(fecha);

    let formatoFecha = Intl.DateTimeFormat('es-CL', {
        year: 'numeric',    //  2-digits
        month: '2-digit',   //  numeric (03), long(Marzo), short(Mar), narrow(M)
        day: '2-digit',     //  numeric (05)
        hour: '2-digit',    //  numeric (05)
        minute: '2-digit',  //  nuemric (05)
        second: '2-digit',  //  numeric (05)
        hour12: false       //  true para formato de 12 horas
    }).format(date);
    
    return formatoFecha;
}

/**
 * Función para agregar puntos de mil a los precios
 * @param {int} precio 
 * 
 * Uso de función: formatPrice(precio);
 * @returns valor con puntos de miles
*/

const formatPrice = (precio) => {
    return new Intl.NumberFormat("de-DE").format(precio);
}

/**
 * Función para redondear precios en base 10
 * @param {int} precio 
 * 
 * Uso de función: roundPrice(precio);
 * @returns precio rendondeado en base 10
*/

const roundPrice = (precio) => {
    var total = precio;
    var redondeo = total.toString().charAt(total.toString().length - 1);
                        
    if(redondeo != 0){
        if(redondeo >= 6){
            redondeo = 10 - redondeo;
        }else if(redondeo <= 5){
            redondeo = redondeo * -1;
        }
    }

    total = parseInt(total) + parseInt(redondeo);

    return total;
}

/**
 * Función para obtener descuento de un precio
 * @param {int} precio 
 * @param {int} descuento porcentaje de descuento
 * 
 * Uso de la función: var {precio, precioNuevo} = discountPrice(1500, 50);
 * @returns precio inicial y precio con descuento
*/

const discountPrice = (precio, descuento) => {
    var nuevoPrecio = 0;
    nuevoPrecio = precio - (precio * (descuento / 100));
    return {precio, nuevoPrecio};
}

/**
 * Función para dar formato a rut en input
 * Se recomienda usar la funcion en input con onkeyup
 * @param {string} input 
 * 
 * Uso de función: <input onkeyup="formatRut(this)"/>
*/

const formatRut = (input) => {
    var valor = input.value.replace('.','');
    valor = valor.replace('-','');

    if(valor > 2){
        cuerpo = valor.slice(0,-1);
        dv = valor.slice(-1).toUpperCase();
        input.value = cuerpo + '-'+ dv;
    } 
}

/**
 * Función para controlar maxLength en inputs
 * Se recomienda usar la funcion en input con onkeyup
 * @param {string, int} input 
 * 
 * Uso de la función: <input onkeyup="maxLengthCheck(this)"/>
*/

const maxLengthCheck = (input) => {
    if(input.value.length > input.maxLength){
        input.value = input.value.slice(0, input.maxLength)
    }
}

/**
 * Función para solo permitir ingreso de números en input
 * Se recomienda usar la funcion en input con onkeyup
 * @param {int} input 
 * 
 * Uso de la función: <input onkeyup="validateNumber(this)"/>
*/

const validateNumber = (input) => {
    input.value = input.value.replace(/^[-+]?[0-9]/g,"");
}

/**
 * Función para obtener texto de select
 * @param {element} select elemento select del DOM
 * 
 * Uso de función: 
 * 1 -> const select = document.querySelector('#select_id');
 * 2 -> var selectText = getTextOfSelect(select);
 * @returns texto de select
*/

const getTextOfSelect = (select) => {
    return select.options[select.selectedIndex].text;
}

/**
 * Función para asignar valores a select multiple
 * @param {element} select elemento select del DOM
 * @param {object} object objeto con nombres de atributo
 * @param {string} atributo nombre de atributo para dar valor a select
 * 
 * Uso de función:
 * 1 -> const select = document.querySelector('#select_id');
 * 2 -> var object = [{id: 1, nombre: 'Pedro'},{id: 3, nombre: 'Cristian'}];
 * 2 -> assignValuesSelectMultiple(selecy, object, 'id');
*/

const assignValuesSelectMultiple = (select, object, atributo) => {
    const event = new Event("change");
    var valores = [];

    for(const array of object){
        valores[valores.length] = array[atributo];
    }

    select.value = valores;
    select.dispatchEvent(event);
}

/**
 * Función para obtener valores de atributos
 * @param {element} select elemento select del DOM
 * @param {string} attributo nombre de atributo a obtener
 * 
 * Uso de función:
 * 1 -> const select = document.querySelector('#select_id');
 * 2 -> var valor = getDataOfSelect(select, 'data-id');
 * @returns valor del atributo buscado
*/

const getDataOfSelect = (select, attributo) => {
    return select.options[select.selectedIndex].getAttribute(attributo);
}

/**
 * Función para agrear fila a tabla HTML en ultima posición
 * @param {element} tabla elemento table del DOM
 * @param {string} fila HTML de la fila a agregar
 * @param {array} array array de valores para agregar a nueva fila
 * @param {string, int} position 'first' | 'last' | number -> posición de la fila en la tabla
 * 
 * Uso de función:
 * 1 -> const tabla = document.querySelector('#tabla_id');
 * 2 -> var fila = `<tr><td></td><tr>`;
 * 3 -> var array = {id: 1, name: 'tr_1'};
 * 4 -> addRowToTable(tabla, fila, array, 'first'); || addRowToTable(tabla, fila, array, 'last') || addRowToTable(tabla, fila, array, 3);
*/

const addRowToTable = (tabla, fila, array, position) => {
    var tablaRef = tabla.getElementsByTagName('tbody')[0];
    var nuevaFila;

    switch (position) {
        case 'first':
            nuevaFila = tablaRef.insertRow(0);
        break;
        case 'last':
            nuevaFila = tablaRef.insertRow(tablaRef.rows.length)
        break;
        default:
            nuevaFila = tablaRef.insertRow(position);
        break;
    }

    for(const [key, value] of Object.entries(array)){
        nuevaFila[key] = value;
    }

    nuevaFila.innerHTML = fila;
}

/**
 * Función para eliminar fila de tabla HTML
 * @param {element} fila elemento tr del DOM
 * 
 * Uso de función: 
 * 1 -> const fila = document.querySelector('#fila_id');
 * 2 -> deleteRowOfTable(fila);
*/

const deleteRowOfTable = (fila) => {
    fila.parentNode.removeChild(fila);
}

/**
 * Función para determinar si el valor corresponde a alguno del objeto a comparar
 * @param {object} valores objeto con valores a verificar
 * @param {element} elemento elemento del DOM con valor
 * 
 * Uso de función:
 * 1 -> var valor = document.querySelector('#input_id').value || var valor = 15 || var valor = "hola";
 * 2 -> var valores = [5, 9, 15, 2]; || ["primer", "hola", "mundo"];
 * 3 -> if(verifyValuesOfInput(valores, valor)) || if(verifyValuesOfInput([9, 15, 3], valor))
 * @returns true en caso de que exista el valor en el objeto, de lo contrario, false
*/

const verifyValuesOfInput = (valores, valor) => {
    if(valores.includes(valor)){
        return true;
    }else{
        return false;
    }
}

/**
 * Función para obtener parametro de url
 * @param {string} parametro nombre de parametro de url
 * 
 * Uso de función: var param = getParamUrl('id');
 * @returns parametro de url
*/

const getParamUrl = (parametro) => {
    var url = new URL(window.location.href);
    var param = url.searchParams.get(parametro);
    return param;
}

/**
 * Función para eliminar parametro de url
 * @param {string} parametro nombre de parametro url
 * 
 * Uso de función: deleteParamUrl('id');
*/

const deleteParamUrl = (parametro) => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search.slice(1));
        params.delete(parametro);
        window.history.replaceState(
            {},
            '',
            `${window.location.pathname}${params}${window.location.hash}`,
        )
    }
}

/**
 * Función para bloquear botón y mostrar texto de cargando junto a un spinner según texto de botón (clase spinner de bootstap)
 * @param {element} btn elemento de botón DOM
 * @param {string} accion accion de botón
 * @param {string} texto texto de botón
 * 
 * Uso de función:
 * 1 -> const btn = document.querySelector('#btn_id');
 * 2 -> Iniciar botón: loadingButton(btn, 'start', 'Cargando');
 * 3 -> Detener botón: loadingButton(btn, 'stop');
*/

const loadingButton = (btn, accion, texto = null) => {
    switch (accion) {
        case 'start':
            btn.setAttribute('data-btn-text', btn.innerHTML);
            btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> ${texto}`;
            btn.disabled = true;
        break;
        case 'stop':
            btn.innerHTML = btn.getAttribute('data-btn-text');
            btn.disabled = false;
        break
    }
}

/**
 * Función para filtar página mediante parametros
 * @param {string} clase clase de elementos del filtro
 * @param {string} pagina nombre de url a filtar
 * 
 * Uso de function:
 * Ejemplo de url -> 127.0.0.1:8000/ventas
 * 1 -> <input class="filtro" value="1"/>
 * 2 -> filterPage('.filtro', 'ventas?');
*/

const filterPage = (clase, pagina) => {
    const filtros = document.querySelectorAll(clase);
    var url = pagina;

    filtros.forEach(element = (element, index) => {
        if(index == 0){
            url += element.id+'='+element.value;
        }

        if(index != 0){
            url += '&'+element.id+'='+element.value;
        }
    });

    window.location.href = url;
}

/**
 * Función para calcular la edad por una fecha
 * @param {string, date} fecha en formato Y-m-d
 * 
 * Uso de la función: var nacimiento = calculateAge(fecha);
 * @returns edad con texto y números
 */

const calculateAge = (fecha) => {
    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth()+1;
    var ahora_dia = fecha_hoy.getDate();
    var edad = (ahora_ano + 1900) - ano;

    if ( ahora_mes < mes ){
        edad--;
    }

    if ((mes == ahora_mes) && (ahora_dia < dia)){
        edad--;
    }

    if (edad > 1900){
        edad -= 1900;
    }

    var meses = 0;

    if(ahora_mes > mes){
        meses = ahora_mes - mes;
    }

    if(ahora_mes < mes){
        meses = 12 - (mes - ahora_mes);
    }

    if(ahora_mes == mes && dia > ahora_dia){
        meses = 11;
    }

    var dias = 0;

    if(ahora_dia > dia){
        dias = ahora_dia - dia;
    }

    if(ahora_dia < dia){
        ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
        dias = ultimoDiaMes.getDate() - (dia-ahora_dia);
    }

    if(edad < 1){
        if(meses < 1){
            return dias+" días";
        }else{
            return meses+" meses y "+dias+" días";
        }
    }else{
        if(meses < 1){
            return edad+" años y "+dias+" días";
        }else{
            return edad+" años, "+meses+" meses y "+dias+" días";
        }
    }
}