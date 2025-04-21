import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarProyectoComponent } from './insertar-proyecto.component';

describe('InsertarProyectoComponent', () => {
  let component: InsertarProyectoComponent;
  let fixture: ComponentFixture<InsertarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertarProyectoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
