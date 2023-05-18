import { TestBed } from '@angular/core/testing';

import { ValidadorCnpjService } from './validador-cnpj.service';

describe('ValidadorCnpjService', () => {
	let service: ValidadorCnpjService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ValidadorCnpjService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it(`${ValidadorCnpjService.prototype.testaCNPJ} deve retornar FALSE quando o valor informado for um CNPJ inválido (11111111111111)`, () => {
		let test = service.testaCNPJ('11111111111111');
		expect(test).toBeFalse();
	})
	
	it(`${ValidadorCnpjService.prototype.testaCNPJ} deve retornar FALSE quando o valor informado for um CNPJ inválido (12123456000100)`, () => {
		let test = service.testaCNPJ('12123456000100');
		expect(test).toBeFalse();
	})
	
	it(`${ValidadorCnpjService.prototype.testaCNPJ} deve retornar TRUE quando o valor informado for um CNPJ válido (47141352000120)`, () => {
		let test = service.testaCNPJ('47141352000120');
		expect(test).toBeTrue();
	})
	
	it(`${ValidadorCnpjService.prototype.testaCNPJ} deve retornar TRUE quando o valor informado for um CNPJ de filial válido (70850283003757)`, () => {
		let test = service.testaCNPJ('70850283003757');
		expect(test).toBeTrue();
	})
	
	it(`${ValidadorCnpjService.prototype.testaCNPJ} deve retornar TRUE quando o valor informado for um CNPJ de filial inválido (70850283003758)`, () => {
		let test = service.testaCNPJ('70850283003758');
		expect(test).toBeFalse();
	})
	
	it(`${ValidadorCnpjService.prototype.testaCNPJ} deve retornar FALSE quando o valor informado for uma string vazia como parâmetro`, () => {
		let test = service.testaCNPJ('');
		expect(test).toBeFalse();
	})
});
