import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVisitaComponent } from './gestion-visita.component';

describe('GestionVisitaComponent', () => {
  let component: GestionVisitaComponent;
  let fixture: ComponentFixture<GestionVisitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionVisitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
