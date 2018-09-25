import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPersonalComponent } from './gestion-personal.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('GestionPersonalComponent', () => {
  let component: GestionPersonalComponent;
  let fixture: ComponentFixture<GestionPersonalComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugElement =  fixture.debugElement.query(By.css('p'));
    htmlElement = debugElement.nativeElement;
  });

  it('should create', () => {
    let v = component.listaEmpleados;
    component.listarEmpleados();
    console.log(v);
    
  });
});
