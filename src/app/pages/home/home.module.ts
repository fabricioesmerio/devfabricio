import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { IConfig, NgxMaskModule } from 'ngx-mask';

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
        MatIconModule,
        MatDividerModule,
        MatCheckboxModule,
        MatButtonModule,
        NgxMaskModule.forRoot(maskConfig)
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
