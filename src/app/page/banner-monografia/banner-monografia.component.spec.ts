import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMonografiaComponent } from './banner-monografia.component';

describe('BannerMonografiaComponent', () => {
  let component: BannerMonografiaComponent;
  let fixture: ComponentFixture<BannerMonografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerMonografiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerMonografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
