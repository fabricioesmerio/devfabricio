import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-cpf-generator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cpf-generator.component.html',
  styleUrl: './cpf-generator.component.scss'
})
export class CpfGeneratorComponent implements OnInit {

  form: FormGroup<any> = new FormGroup<any>({
    Cpf: new FormControl<string>('', { nonNullable: true }),
    WithMask: new FormControl<boolean>(false, { nonNullable: true })
  });

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.form.get('Cpf')?.disable();
  }

  private calculateCheckDigit(cpf: string, weight: number): number {
    let sum = 0;
    for (let i = 0; i < cpf.length; i++) {
      sum += parseInt(cpf.charAt(i)) * (weight - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  generate(): void {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
      cpf += Math.floor(Math.random() * 10).toString();
    }

    const firstCheckDigit = this.calculateCheckDigit(cpf, 10);
    cpf += firstCheckDigit;

    const secondCheckDigit = this.calculateCheckDigit(cpf, 11);
    cpf += secondCheckDigit;

    let finishCpf = cpf;
    const withMask = this.form.get('WithMask')?.value;
    
    if (withMask)
      finishCpf = this.formatCpf(cpf);
    
    this.form.get('Cpf')?.setValue(finishCpf);
  }

  onChangeWithMask() {
    const value = this.form.get('Cpf')?.value;
    const withMask = this.form.get('WithMask')?.value;

    if (value)
      this.form.get('Cpf')?.setValue(withMask ? this.formatCpf(value) : value.replace(/[^0-9]/g, ''));
  }

  private formatCpf(cpf: string): string {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
  }

  copy() {
    if (!this.form.get('Cpf')?.value) return;

    navigator.clipboard.writeText(this.form.get('Cpf')?.value || '');
    this.alertService.resolve('success', `Senha copiada com sucesso.`)
  }
}
