import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordGeneratorComponent } from './password-generator.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert.service';

describe(PasswordGeneratorComponent.name, () => {
  let component: PasswordGeneratorComponent;
  let fixture: ComponentFixture<PasswordGeneratorComponent>;

  let alert;

  beforeEach(async () => {

    alert = jasmine.createSpyObj('AlertService', ['resolve']);


    await TestBed.configureTestingModule({
      imports: [PasswordGeneratorComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AlertService, useValue: alert }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve gerar uma senha somente com números', () => {
    component.form.get('WithNumbers')?.setValue(true);
    component.generatePassword();
    const password = component.form.get('Password')?.value;
    expect(password).toMatch(/\d{1,}/);
  });
  
  it('deve gerar uma senha somente com letras minúsculas', () => {
    component.form.get('WithNumbers')?.setValue(false);
    component.form.get('WithLowercaseLetters')?.setValue(true);
    component.generatePassword();
    const password = component.form.get('Password')?.value;
    expect(password).toMatch(/^[a-z]+$/);
  });
  
  it('deve gerar uma senha somente com letras maiúsculas', () => {
    component.form.get('WithNumbers')?.setValue(false);
    component.form.get('WithUppercaseLetters')?.setValue(true);
    component.generatePassword();
    const password = component.form.get('Password')?.value;
    expect(password).toMatch(/^[A-Z]+$/);
  });
  
  it('deve gerar uma senha somente com caracteres especiais', () => {
    component.form.get('WithNumbers')?.setValue(false);
    component.form.get('WithSpecialCharacteres')?.setValue(true);
    component.generatePassword();
    const password = component.form.get('Password')?.value;
    expect(password).toMatch(/^[^a-zA-Z0-9]+$/);
  });
  
  it('deve gerar uma senha somente com númeors, letras maiúsculas e minúscula e com caracteres especiais', () => {
    component.form.get('WithNumbers')?.setValue(true);
    component.form.get('WithUppercaseLetters')?.setValue(true);
    component.form.get('WithLowercaseLetters')?.setValue(true);
    component.form.get('WithSpecialCharacteres')?.setValue(true);
    component.generatePassword();
    const password = component.form.get('Password')?.value;
    expect(password).toMatch(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/);
  });
  
  it('deve gerar uma senha com o tamanho informado no formulário', () => {
    component.form.get('WithNumbers')?.setValue(true);
    component.form.get('WithUppercaseLetters')?.setValue(true);
    component.form.get('WithLowercaseLetters')?.setValue(true);
    component.form.get('WithSpecialCharacteres')?.setValue(true);
    component.form.get('Range')?.setValue(40);
    component.generatePassword();
    const password = component.form.get('Password')?.value;
    expect(password?.length).toEqual(component.form.get('Range')?.value);
  });
  
  it('deve acusar formulário inválido quando informado um valor menor que 1 no range', () => {
    component.form.get('WithNumbers')?.setValue(true);
    component.form.get('Range')?.setValue(0);
    component.generatePassword();
    const valid = component.form.valid;
    expect(valid).toBeFalse();
  });
  
  it('deve ficar marcado senhas com números quando não for selecionado nenhuma opção', () => {
    component.form.get('WithNumbers')?.setValue(false);
    component.generatePassword();
    const withNumber = component.form.get('WithNumbers');
    expect(withNumber?.value).toBeTrue();
  });
});
