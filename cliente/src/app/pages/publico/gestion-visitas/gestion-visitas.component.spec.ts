import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVisitasComponent } from './gestion-visitas.component';

describe('GestionVisitasComponent', () => {
  let component: GestionVisitasComponent;
  let fixture: ComponentFixture<GestionVisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionVisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
