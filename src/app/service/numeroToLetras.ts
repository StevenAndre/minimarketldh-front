export class NumeroALetras {
    private static Unidades(num: number): string {
        switch (num) {
            case 1: return 'UN';
            case 2: return 'DOS';
            case 3: return 'TRES';
            case 4: return 'CUATRO';
            case 5: return 'CINCO';
            case 6: return 'SEIS';
            case 7: return 'SIETE';
            case 8: return 'OCHO';
            case 9: return 'NUEVE';
            default: return '';
        }
    }

    private static Decenas(num: number): string {
        const decena = Math.floor(num / 10);
        const unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0: return 'DIEZ';
                    case 1: return 'ONCE';
                    case 2: return 'DOCE';
                    case 3: return 'TRECE';
                    case 4: return 'CATORCE';
                    case 5: return 'QUINCE';
                    default: return 'DIECI' + this.Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0: return 'VEINTE';
                    default: return 'VEINTI' + this.Unidades(unidad);
                }
            case 3: return this.DecenasY('TREINTA', unidad);
            case 4: return this.DecenasY('CUARENTA', unidad);
            case 5: return this.DecenasY('CINCUENTA', unidad);
            case 6: return this.DecenasY('SESENTA', unidad);
            case 7: return this.DecenasY('SETENTA', unidad);
            case 8: return this.DecenasY('OCHENTA', unidad);
            case 9: return this.DecenasY('NOVENTA', unidad);
            case 0: return this.Unidades(unidad);
            default: return this.Unidades(unidad);
        }
    }

    private static DecenasY(strSin: string, numUnidades: number): string {
        if (numUnidades > 0)
            return strSin + ' Y ' + this.Unidades(numUnidades);
        return strSin;
    }

    private static Centenas(num: number): string {
        const centenas = Math.floor(num / 100);
        const decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + this.Decenas(decenas);
                return 'CIEN';
            case 2: return 'DOSCIENTOS ' + this.Decenas(decenas);
            case 3: return 'TRESCIENTOS ' + this.Decenas(decenas);
            case 4: return 'CUATROCIENTOS ' + this.Decenas(decenas);
            case 5: return 'QUINIENTOS ' + this.Decenas(decenas);
            case 6: return 'SEISCIENTOS ' + this.Decenas(decenas);
            case 7: return 'SETECIENTOS ' + this.Decenas(decenas);
            case 8: return 'OCHOCIENTOS ' + this.Decenas(decenas);
            case 9: return 'NOVECIENTOS ' + this.Decenas(decenas);
            default: return this.Decenas(decenas);
        }
    }

    private static Seccion(num: number, divisor: number, strSingular: string, strPlural: string): string {
        const cientos = Math.floor(num / divisor);
        const resto = num - (cientos * divisor);

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = this.Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    }

    private static Miles(num: number): string {
        const divisor = 1000;
        const cientos = Math.floor(num / divisor);
        const resto = num - (cientos * divisor);

        const strMiles = this.Seccion(num, divisor, 'UN MIL', 'MIL');
        const strCentenas = this.Centenas(resto);

        if (strMiles === '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    }

    private static Millones(num: number): string {
        const divisor = 1000000;
        const cientos = Math.floor(num / divisor);
        const resto = num - (cientos * divisor);

        const strMillones = this.Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        const strMiles = this.Miles(resto);

        if (strMillones === '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    }

    public static NumeroALetras(num: number, currency?: {plural?: string, singular?: string, centPlural?: string, centSingular?: string}): string {
        currency = currency || {};
        const data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: Math.round(num * 100) - Math.floor(num) * 100,
            letrasCentavos: '',
            letrasMonedaPlural: currency.plural || 'SOLES PERUANOS',
            letrasMonedaSingular: currency.singular || 'SOL PERUANO',
            letrasMonedaCentavoPlural: currency.centPlural || 'CENTIMOS CHILENOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CENTIMO PESO CHILENO'
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + data.centavos + '/100 ' + data.letrasMonedaPlural;
        }

        if (data.enteros === 0)
            return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros === 1)
            return this.Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
            return this.Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    }
}

// Uso en TypeScript
const resultado = NumeroALetras.NumeroALetras(12.98, {
    plural: "SOLES",
    singular: "SOL",
    centPlural: "CENTAVOS",
    centSingular: "CENTAVO"
});
console.log(resultado);  
