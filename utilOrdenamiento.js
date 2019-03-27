function sortJSONSingle(data, key, orden) {
    return data.sort( function(a, b) {
        let x = a[key],
        y = b[key];
        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }
        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

function sortJSONMulti(data, sortBy, orden) {
    let direction;
    data.sort( function(a, b) {
        let i = 0, result = 0;
        while(i < sortBy.length && result === 0) {
            direction = (orden[i] === "asc")? -1: 1;
            result = direction*(a[ sortBy[i] ].toString() < b[ sortBy[i] ].toString() ? -1 : (a[ sortBy[i] ].toString() > b[ sortBy[i] ].toString() ? 1 : 0));
            i++;
        }
        return result;
    })
}
function sortJSONMulti2(data, sortBy, orden) {
    let direction;
    data.sort( function(a, b) {
        let i = 0, result = 0;
        while(i < sortBy.length && result === 0) {
            direction = (orden[i] === "asc")? -1: 1;
            result = sortBy[i].direction*(a[ sortBy[i].prop ].toString() < b[ sortBy[i].prop ].toString() ? -1 : (a[ sortBy[i].prop ].toString() > b[ sortBy[i].prop ].toString() ? 1 : 0));
            i++;
        }
        return result;
    })
}
// Ordenamos el json.
// Ojo, hay que incluir como parámetro:
// El JSON origninal
// La propiedad que queremos ordenar
// El orden (asc | desc)
//var oJSON = sortJSON(elJSON, 'num', 'asc');

module.exports = {
    sortJSONSingle,
    sortJSONMulti
}