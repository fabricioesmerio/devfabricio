import { GeraCnpjService } from "./gera-cnpj.service";


describe(GeraCnpjService.name, () => {
    let service: GeraCnpjService;

    beforeEach(() => { service = new GeraCnpjService() })

    it(`${GeraCnpjService.prototype.gerarCNPJ} deve gerar um cnpj sem filias`, () => {
        const QTDE_FILIAIS = 0;
        let data = service.gerarCNPJ(QTDE_FILIAIS);

        expect(data.matriz).toBeTruthy();
    })

    it(`${GeraCnpjService.prototype.gerarCNPJ} deve gerar um cnpj com dois cnpj de filiais`, () => {
        const QTDE_FILIAIS = 2;
        let data = service.gerarCNPJ(QTDE_FILIAIS);

        expect(data.filiais?.length).toBe(QTDE_FILIAIS);
    })

    it(`${GeraCnpjService.prototype.gerarCNPJ} deve gerar dois cnpjs de filiais quando informado um cnpj matriz`, () => {
        const QTDE_FILIAIS = 2;
        const CNPJ_MATRIZ = '64625814000102';
        let data = service.gerarCNPJ(QTDE_FILIAIS, CNPJ_MATRIZ);
        expect(data.filiais?.length).toBe(QTDE_FILIAIS);
    })

    it(`${GeraCnpjService.prototype.gerarCNPJ} deve gerar dois cnpjs de filiais quando informado um cnpj matriz e deve conter a a mesma base do cnpj Matriz`, () => {
        const QTDE_FILIAIS = 2;
        const CNPJ_MATRIZ = '64625814000102';
        let data = service.gerarCNPJ(QTDE_FILIAIS, CNPJ_MATRIZ);

        let cnpjFilial1 = data.filiais ? data.filiais[0] : null;
        let baseCnpjFilial = '';
        if (cnpjFilial1) {
            baseCnpjFilial = cnpjFilial1.substring(8, 0);
        }

        expect(CNPJ_MATRIZ.substring(8, 0)).toEqual(baseCnpjFilial);
    })
})