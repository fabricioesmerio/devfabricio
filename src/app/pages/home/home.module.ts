import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { IConfig, NgxMaskModule } from 'ngx-mask'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatDividerModule,
        NgxMaskModule.forRoot(maskConfig)
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
