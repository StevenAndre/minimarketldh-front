import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRubroComponent } from './registrar-rubro.component';

describe('RegistrarRubroComponent', () => {
  let component: RegistrarRubroComponent;
  let fixture: ComponentFixture<RegistrarRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarRubroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
