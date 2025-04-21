import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarModalidadComponent } from './insertar-modalidad.component';

describe('InsertarModalidadComponent', () => {
  let component: InsertarModalidadComponent;
  let fixture: ComponentFixture<InsertarModalidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertarModalidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertarModalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
