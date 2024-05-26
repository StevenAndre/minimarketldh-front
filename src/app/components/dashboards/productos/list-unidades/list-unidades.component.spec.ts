import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnidadesComponent } from './list-unidades.component';

describe('ListUnidadesComponent', () => {
  let component: ListUnidadesComponent;
  let fixture: ComponentFixture<ListUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUnidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
