import { FormControl } from "@angular/forms";

export interface PasswordGeneratorFormInterface {
    Password: FormControl<string>;
    Range: FormControl<number>;
    WithNumbers: FormControl<boolean>;
    WithLowercaseLetters: FormControl<boolean>;
    WithUppercaseLetters: FormControl<boolean>;
    WithSpecialCharacteres: FormControl<boolean>;
}