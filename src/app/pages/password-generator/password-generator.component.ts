import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordGeneratorFormInterface } from './interfaces/password-generator-form-interface';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss'
})
export class PasswordGeneratorComponent {
  form: FormGroup<PasswordGeneratorFormInterface> = new FormGroup<PasswordGeneratorFormInterface>({
    Password: new FormControl<string>('', { nonNullable: true }),
    Range: new FormControl<number>(15, { nonNullable: true, validators: [Validators.min(1), Validators.max(50)] }),
    WithNumbers: new FormControl<boolean>(true, { nonNullable: true }),
    WithLowercaseLetters: new FormControl<boolean>(false, { nonNullable: true }),
    WithSpecialCharacteres: new FormControl<boolean>(false, { nonNullable: true }),
    WithUppercaseLetters: new FormControl<boolean>(false, { nonNullable: true })
  })

  constructor(private alertService: AlertService) { }


  generatePassword(): void {

    if (!this.validateOptionsPassword()) return;

    const form = this.form.getRawValue();
    let password = '';

    while (password.length < form.Range) {
      if (form.WithNumbers) {
        password += this.getNumber(Math.floor(Math.random() * 10));
      }
      if (form.WithLowercaseLetters) {
        password += this.getLowerCase(Math.floor(Math.random() * 26));
      }
      if (form.WithSpecialCharacteres) {
        password += this.getSpecialCharacter(Math.floor(Math.random() * 24));
      }
      if (form.WithUppercaseLetters) {
        password += this.getUpperCase(Math.floor(Math.random() * 26));
      }
    }

    this.form.get('Password')?.setValue(this.shuffleString(password.substring(0, form.Range)));
  }

  private shuffleString(password: string) {
    let arr = password.split('');

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.join('');
  }

  private getNumber(index: number): number {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return numbers[index];
  }

  private getLowerCase(index: number): string {
    const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    return lowerCase[index];
  }

  private getUpperCase(index: number): string {
    const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return upperCase[index];
  }

  private getSpecialCharacter(index: number): string {
    const specialCharacteres = ['?', '/', '~', '^', '{', '}', '[', ']', '!', '@', '#', '$', '%', '&', '*', '(', ')', '_', '-', '+', '=', '.', ':', ';'];

    return specialCharacteres[index];
  }

  private validateOptionsPassword(): boolean {
    const form = this.form.getRawValue();
    if (
      !form.WithLowercaseLetters
      && !form.WithNumbers
      && !form.WithSpecialCharacteres
      && !form.WithUppercaseLetters)
      this.form.get('WithNumbers')?.setValue(true);

    if (!this.form.valid)
      this.alertService.resolve('error', 'Opções inválidas, tente novamente!');

    return this.form.valid;
  }

  copy() {
    if (!this.form.get('Password')?.value) return;

    navigator.clipboard.writeText(this.form.get('Password')?.value || '');
    this.alertService.resolve('success', `Senha copiada com sucesso.`)
  }
}
