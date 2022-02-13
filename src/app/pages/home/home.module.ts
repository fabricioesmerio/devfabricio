import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
