/* Funciones para convertir objetos con estilo snake_case a camelCase y viceversa */
function charPos(str, char) {
    return str
           .split("")
           .map(function (c, i) { if (c == char) return i; })
           .filter(function (v) { return v >= 0; });
}

// Prototipo de la clase String que permite reemplazar un caracter por otro
String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}


let isCamelCase = word => !word.match(/[\s_-]/g);

// Convierte un string o una lista de strings en snake_case a camelCase
const camelize = (...args) => {
    for (let i = 0 ; i < args.length ; i++) {
        if (typeof args[i] === 'string') {
            // Se obtiene la lista de índices en donde se encuentran los '_'
            let underscorePos = charPos(args[i], '_');
            let word = args[i]; // Palabra actual
            
            for (let j = 0 ; j < underscorePos.length ; j++) {

                /* En caso de que la posición actual + 1 no sobrepase el largo de la palabra
                   se reemplaza el caracter siguiente (+1) por su mismo valor, pero  en mayúscula.
                    La segunda condición es para no hacer un upperCase del primer caracter 'válido'
                    por ejemplo en una palabra: '_snake_case ==> SnakeCase' */
                if (underscorePos[j] - j + 1 !== word.length && underscorePos[j] !== 0) {
                    word = word.replaceAt(underscorePos[j] - j + 1, word[underscorePos[j] - j + 1].toUpperCase());
                }

                // Se reemplaza por un caracter vacío el del caracter '_' actual
                word = word.replaceAt(underscorePos[j] - j, '');
                
            }

            /* Finalmente se vuelve a reemplazar la nueva palabra en camelCase a la lista
            de argumentos recibidos */
            args[i] = word;

        } else if (typeof args[i] === 'object') {
            for (let objectKey in args[i]) {
                if (!isCamelCase(objectKey)) {
                    Object.defineProperty(args[i], camelize(objectKey),
                    Object.getOwnPropertyDescriptor(args[i], objectKey));
                    delete args[i][objectKey];  
                }
                
            }  
        }
    }

    if (args.length === 1) {
        return args[0];
    }

    return args
}

export {
    camelize
}