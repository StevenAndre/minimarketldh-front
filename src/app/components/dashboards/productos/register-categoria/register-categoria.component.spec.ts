import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCategoriaComponent } from './register-categoria.component';

describe('RegisterCategoriaComponent', () => {
  let component: RegisterCategoriaComponent;
  let fixture: ComponentFixture<RegisterCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
