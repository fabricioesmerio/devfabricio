import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

// const maskConfig: Partial<IConfig> = {
//     validation: false,
// };

@NgModule({
    imports: [
        CommonModule,        
        RouterModule.forChild(routes),
        NgxMaskDirective,
        NgxMaskPipe,
        FormsModule
    ],
    declarations: [HomeComponent],
    providers: [provideNgxMask()]
})
export class HomeModule { }
