import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeePropertyComponent } from './see-property.component';

describe('SeePropertyComponent', () => {
  let component: SeePropertyComponent;
  let fixture: ComponentFixture<SeePropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeePropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeePropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
