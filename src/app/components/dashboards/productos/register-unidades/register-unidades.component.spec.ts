import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUnidadesComponent } from './register-unidades.component';

describe('RegisterUnidadesComponent', () => {
  let component: RegisterUnidadesComponent;
  let fixture: ComponentFixture<RegisterUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUnidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
