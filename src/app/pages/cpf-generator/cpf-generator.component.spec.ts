import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CpfGeneratorComponent } from './cpf-generator.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from 'src/app/shared/alert.service';
import { By } from '@angular/platform-browser';

describe(CpfGeneratorComponent.name, () => {
  let component: CpfGeneratorComponent;
  let fixture: ComponentFixture<CpfGeneratorComponent>;
  let alert;

  beforeEach(async () => {

    alert = jasmine.createSpyObj('AlertService', ['resolve']);
    await TestBed.configureTestingModule({
      imports: [
        CpfGeneratorComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: AlertService, useValue: alert }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CpfGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`${CpfGeneratorComponent.prototype.generate.name}: should be called when the Generate CPF button is clicked`, () => {
    spyOn(component, 'generate');
    const button = fixture.debugElement.query(By.css('#gen_cpf'));
    button.triggerEventHandler('click', null);
    expect(component.generate).toHaveBeenCalled();
  });

  it(`${CpfGeneratorComponent.prototype.copy.name}: should be called when the Copy button is clicked`, () => {
    spyOn(component, 'copy');
    const button = fixture.debugElement.query(By.css('#copy'));
    button.triggerEventHandler('click', null);
    expect(component.copy).toHaveBeenCalled();
  });

  it(`should generate a cpf correctly only numbers`, () => {
    const button = fixture.debugElement.query(By.css('#gen_cpf'));
    button.triggerEventHandler('click', null);
    const cpf: string = component.form.get('Cpf')?.value;
    const regexOnlyNumber = /^[0-9]+$/;
    expect(cpf).toBeTruthy();
    expect(cpf.length).toBe(11);
    expect(regexOnlyNumber.test(cpf)).toBeTrue();
    expect(cpf.includes('.')).toBeFalse();
    expect(cpf.includes('-')).toBeFalse();
  });

  it(`should generate a cpf correctly with mask`, fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('#gen_cpf'));
    const labelWithMask = fixture.debugElement.query(By.css('#withMask'));
    labelWithMask.triggerEventHandler('change', { target: { checked: true } });
    button.triggerEventHandler('click', null);

    tick();
    fixture.detectChanges();
    const cpf: string = component.form.get('Cpf')?.value;
    const regexOnlyNumber = /^[0-9]+$/;

    expect(cpf).toBeTruthy();
    expect(cpf.length).toBe(14);
    expect(regexOnlyNumber.test(cpf)).toBeFalse();
    expect(cpf.includes('.')).toBeTrue();
    expect(cpf.includes('-')).toBeTrue();
  }));
});
