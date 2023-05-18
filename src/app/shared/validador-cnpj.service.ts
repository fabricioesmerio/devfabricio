import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
/**
 * 
 * By: https://guilherme-manzano.medium.com/como-fazer-um-validador-de-cnpj-em-tyepscript-e-ionic-4-a06c0d1bba4c
 */
export class ValidadorCnpjService {

	constructor() { }

	testaCNPJ(cnpj: string) {
		if (cnpj === undefined) {
			return false;
		}

		var strCNPJ = cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

		if (strCNPJ === '00000000000000' || strCNPJ === '11111111111111' || strCNPJ === '22222222222222' || strCNPJ === '33333333333333' ||
			strCNPJ === '44444444444444' || strCNPJ === '55555555555555' || strCNPJ === '66666666666666' || strCNPJ === '77777777777777' ||
			strCNPJ === '88888888888888' || strCNPJ === '99999999999999' || strCNPJ.length !== 14) {
			return false;
		}

		var tamanho = strCNPJ.length - 2;
		var numeros: any = strCNPJ.substring(0, tamanho);
		var digitos: any = strCNPJ.substring(tamanho);
		var soma = 0;
		var pos = tamanho - 7;

		for (let i = tamanho; i >= 1; i--) {
			soma += numeros.charAt(tamanho - i) * pos--;
			if (pos < 2) {
				pos = 9;
			}
		}

		var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0)) {
			return false;
		}

		tamanho = tamanho + 1;
		numeros = strCNPJ.substring(0, tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (let k = tamanho; k >= 1; k--) {
			soma += numeros.charAt(tamanho - k) * pos--;
			if (pos < 2) {
				pos = 9;
			}
		}

		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1)) {
			return false;
		}

		return true;
	}
}
