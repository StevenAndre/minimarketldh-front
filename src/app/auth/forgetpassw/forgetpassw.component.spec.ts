import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetpasswComponent } from './forgetpassw.component';

describe('ForgetpasswComponent', () => {
  let component: ForgetpasswComponent;
  let fixture: ComponentFixture<ForgetpasswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetpasswComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetpasswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
