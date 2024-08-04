import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBgComponent } from './custom-bg.component';

describe('CustomBgComponent', () => {
  let component: CustomBgComponent;
  let fixture: ComponentFixture<CustomBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
