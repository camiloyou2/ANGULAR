import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDocentesComponent } from './banner-docentes.component';

describe('BannerDocentesComponent', () => {
  let component: BannerDocentesComponent;
  let fixture: ComponentFixture<BannerDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerDocentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
