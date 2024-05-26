import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMarcasComponent } from './register-marcas.component';

describe('RegisterMarcasComponent', () => {
  let component: RegisterMarcasComponent;
  let fixture: ComponentFixture<RegisterMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMarcasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
