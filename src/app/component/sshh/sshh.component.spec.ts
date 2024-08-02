import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SshhComponent } from './sshh.component';

describe('SshhComponent', () => {
  let component: SshhComponent;
  let fixture: ComponentFixture<SshhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SshhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SshhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
