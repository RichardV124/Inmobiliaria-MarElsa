import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarAccesoComponent } from './asignar-acceso.component';

describe('AsignarAccesoComponent', () => {
  let component: AsignarAccesoComponent;
  let fixture: ComponentFixture<AsignarAccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarAccesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
