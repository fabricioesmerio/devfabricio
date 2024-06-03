import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'cnpj-generator',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'password-generator',
        loadComponent: () => import('./pages/password-generator/password-generator.component').then(m => m.PasswordGeneratorComponent)
    },
    {
        path: '',
        redirectTo: 'cnpj-generator',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
