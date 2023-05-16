import { Injectable } from '@angular/core';
import { Utils } from 'src/app/shared/utils';

@Injectable({
    providedIn: 'root'
})
export class GeraCnpjService {
    baseCNPJ = '0001';

    constructor() { }

    gerarCNPJ(qtdFilial: number, cnpjMatriz: string = ''): {
        matriz: string,
        filiais?: Array<string>
    } {
        let cnpj;
        let filiais: Array<string> = [];
        let raizCNPJ;
        let base;


        if (cnpjMatriz !== '') {

            cnpj = cnpjMatriz;
            raizCNPJ = cnpjMatriz.substring(8, 0);
            base = cnpjMatriz.substring(8, 12);

        } else {

            base = this.baseCNPJ;
            let dados = this.gerarCnpjMatriz(base);
            cnpj = dados.cnpj;
            raizCNPJ = dados.raizCnpj;
        }

        if (qtdFilial > 0) {
            for (let i = parseInt(this.baseCNPJ); i <= qtdFilial; i++) {
                let _base = this.geraBaseCNPJFilial(i + 1);
                let _d1 = this.getDigitoVerificador1(_base, raizCNPJ)
                let _d2 = this.getDigitoVerificador2(_base, raizCNPJ, _d1);
                filiais.push(`${raizCNPJ}${_base}${_d1}${_d2}`)
            }
        }
        return { matriz: cnpj, filiais };

    }

    private gerarCnpjMatriz(base: string): {
        cnpj: string, raizCnpj: string
    } {
        let total_array = 8;
        let n = 9;
        let [n1, n2, n3, n4, n5, n6, n7, n8] = Utils.create_array(total_array, n);
        let raizCnpj = n1.toString() + n2.toString() + n3.toString() + n4.toString() + n5.toString() + n6.toString() + n7.toString() + n8.toString()

        let d1 = this.getDigitoVerificador1(base, raizCnpj.toString());

        let d2 = this.getDigitoVerificador2(base, raizCnpj, d1)

        let cnpj = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${base}${d1}${d2}`;
        return { cnpj, raizCnpj };
    }

    private geraBaseCNPJFilial(args: number) {
        let raiz = '';
        let argumento = args.toString();
        let tmp: number = 4 - argumento.length;
        for (let i = 0; i < tmp; i++) {
            raiz += '0';
        }
        return raiz + args.toString();
    }

    private getDigitoVerificador1(baseCNPJ: string, raizCNPJ: string): number {
        let d1 = parseInt(baseCNPJ[3]) * 2 + parseInt(baseCNPJ[2]) * 3 + parseInt(baseCNPJ[1]) * 4 + parseInt(baseCNPJ[0]) * 5 +
            parseInt(raizCNPJ[7]) * 6 +
            parseInt(raizCNPJ[6]) * 7 +
            parseInt(raizCNPJ[5]) * 8 +
            parseInt(raizCNPJ[4]) * 9 +
            parseInt(raizCNPJ[3]) * 2 +
            parseInt(raizCNPJ[2]) * 3 +
            parseInt(raizCNPJ[1]) * 4 +
            parseInt(raizCNPJ[0]) * 5;
        d1 = 11 - (Utils.mod(d1, 11))
        if (d1 >= 10) return 0
        else return d1;
    }

    private getDigitoVerificador2(baseCNPJ: string, raizCNPJ: string, digitoVerificador1: number) {
        let d2 = digitoVerificador1 * 2
            + parseInt(baseCNPJ[3]) * 3 + parseInt(baseCNPJ[2]) * 4 + parseInt(baseCNPJ[1]) * 5 + parseInt(baseCNPJ[0]) * 6
            + parseInt(raizCNPJ[7]) * 7 +
            parseInt(raizCNPJ[6]) * 8 +
            parseInt(raizCNPJ[5]) * 9 +
            parseInt(raizCNPJ[4]) * 2 +
            parseInt(raizCNPJ[3]) * 3 +
            parseInt(raizCNPJ[2]) * 4 +
            parseInt(raizCNPJ[1]) * 5 +
            parseInt(raizCNPJ[0]) * 6;
        d2 = 11 - (Utils.mod(d2, 11));
        if (d2 >= 10) return 0;
        return d2
    }

}