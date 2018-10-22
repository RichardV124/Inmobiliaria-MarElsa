import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionArriendoComponent } from './gestion-arriendo.component';

describe('GestionArriendoComponent', () => {
  let component: GestionArriendoComponent;
  let fixture: ComponentFixture<GestionArriendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionArriendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionArriendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
