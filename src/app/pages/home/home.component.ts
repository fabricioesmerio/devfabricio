
import { Component } from '@angular/core';
import { GeraCnpjService } from '../services/gera-cnpj.service';
import { AlertService } from 'src/app/shared/alert.service';
import { ValidadorCnpjService } from 'src/app/shared/validador-cnpj.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    gerarFiliais: boolean = false;
    cnpjMatriz: string = '';
    qtdFiliais: number = 1;
    filiaisList: Array<string> = [];

    constructor(
        private geradorCNPJ: GeraCnpjService,
        private alertService: AlertService,
        private validatorCnpj: ValidadorCnpjService
    ) { }

    clearAndGenerateCNPJ() {
        this.cnpjMatriz = '';
        this.generateCNPJ();
    }

    generateCNPJ() {

        if (this.cnpjMatriz) {
            if (this.validatorCnpj.testaCNPJ(this.cnpjMatriz) === false) {
                this.alertService.resolve('error', 'O CNPJ informado é inválido.');
                this.filiaisList = [];
                return;
            }
        }

        if (this.gerarFiliais) {
            if (this.qtdFiliais > 999) {
                return;
            }
            for (let i = 0; i < this.qtdFiliais; i++) {
                this.filiaisList.push(i.toString())
            }
        }
        let result = this.geradorCNPJ.gerarCNPJ(this.gerarFiliais ? this.qtdFiliais : 0, this.cnpjMatriz);
        this.cnpjMatriz = this.cnpjMatriz || result.matriz;
        this.filiaisList = result.filiais || [];
    }

    copy(cnpj: any) {
        if (!cnpj) return;

        navigator.clipboard.writeText(cnpj);
        this.alertService.resolve('success', `O CNPJ ${cnpj} foi copiado com sucesso.`)
    }

}
