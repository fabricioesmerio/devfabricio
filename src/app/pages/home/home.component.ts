import { Component, OnInit } from '@angular/core';
import { GeraCnpjService } from '../services/gera-cnpj.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    gerarFiliais: boolean = false;
    cnpjMatriz: string = '';
    qtdFiliais: number = 1;
    filiaisList: Array<string> = [];

    constructor(
        private geradorCNPJ: GeraCnpjService
    ) { }

    ngOnInit() {
    }

    generateCNPJ() {
        // if (this.gerarFiliais) {
        //     for (let i = 0; i < this.qtdFiliais; i++) {
        //         this.filiaisList.push(i.toString())
        //     }
        // }
        this.cnpjMatriz = this.geradorCNPJ.gerarCNPJ()
    }

}
