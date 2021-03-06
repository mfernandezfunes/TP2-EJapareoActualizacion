const fs = require('fs');
const util = require('util');
const fUtils = require('./fileUtils');
const oUtils = require('./utilOrdenamiento');

/**
 * ordena (in place) una coleccion de datos segun las claves provistas.
 * @param {Object[]} coleccion el array que quiero ordenar
 * @param {string[]} claves las claves por las que quiero ordenar, por orden de importancia
 */
function ordenar(coleccion, claves) {
    //throw new Error('falta implementar!')
    
    for (let elemento of coleccion) {
        coleccion.sort(ordernarPor(elemento));
    }
}

//(a, b) => a.sort1 - b.sort1 || a.sort2 - b.sort2)

/**
 * recibe las rutas del archivo de deudas original, archivo de pagos, archivo de deudas con las actualizaciones, y archivo de log para registrar errores o advertencias.
 * @param {string} rutaDeudasOld 
 * @param {string} rutaPagos 
 * @param {string} rutaDeudasNew 
 * @param {string} rutaLog 
 */
function actualizarArchivosDeudas(rutaDeudasOld, rutaPagos, rutaDeudasNew, rutaLog) {
    const deudasOld = fUtils.leerArchivoComoString(rutaDeudasOld);
    const pagos = fUtils.leerArchivoComoString(rutaPagos);
    let pagosJ= oUtils.sortJSONMulti(JSON.parse(pagos), ['dni','fecha'], ['desc','dsc']);
    let deudasJ = oUtils.sortJSONSingle(JSON.parse(deudasOld), 'id', 'asc');
    console.table(deudasJ);

}

/**
 * @callback loggerCallback 
 * @param {string} error error message to display
 */

/**
 * realiza el apareo con actualizacion entre deudas y pagos, y loguea algunos eventos relevantes.
 * @param {Object[]} deudas las deudas originales
 * @param {Object[]} pagos los pagos a aplicar
 * @param {loggerCallback} logger funcion a la cual llamar en caso de necesitar loguear un evento
 * @returns {Object[]} las deudas actualizadas
 */
function actualizarDeudas(deudas, pagos, logger) {
	throw new Error('falta implementar!')
}

/**
 * arma un mensaje informando los detalles de un pago que no corresponde a ninguna deuda 
 * @param {Object} pago el pago sin deuda correspondiente
 * @returns {string} el mensaje a loguear
 */
function armarMsgPagoSinDeudaAsociada(pago) {
    const logMsg = `
    el siguiente pago no corresponde a ninguna deuda:
${util.inspect(pago)}

=================================
`
    return logMsg
}

/**
 * arma un mensaje indicando el dni del sujeto que pagó de más, y cuanto dinero quedó a su favor
 * @param {Object} deuda la deuda con excedente de pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoDeMas(deuda) {
    const logMsg = `
dni: ${deuda.dni} posee $${Math.abs(deuda.debe)} a su favor

=================================
`
    return logMsg
}

/**
 * arma un mensaje mostrando la deuda, y el pago que no se pudo concretar, y notifica que el registro permanece sin cambios.
 * @param {Object} deuda 
 * @param {Object} pago
 * @returns {string} el mensaje a logguear
 */
function armarMsgPagoConDatosErroneos(deuda, pago) {
    const logMsg = `
error al querer actualizar esta deuda:
${util.inspect(deuda)}
con este pago:
${util.inspect(pago)}

se mantiene el registro original sin cambios

=================================
`
    return logMsg
}

module.exports = {
    actualizarArchivosDeudas
}
