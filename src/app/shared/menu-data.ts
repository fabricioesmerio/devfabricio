export interface IMenu {
    label: string;
    routerLink: string | Array<string>;
}

export type MenuType = Array<IMenu>

export const MENU_DATA: MenuType = [
    {
        label: 'Gerador de CNPJs',
        routerLink: 'cnpj-generator'
    },
    {
        label: 'Gerador de CPF',
        routerLink: 'cpf-generator'
    },
    {
        label: 'Gerador de senhas',
        routerLink: 'password-generator'
    }
]