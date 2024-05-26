import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRubrosComponent } from './list-rubros.component';

describe('ListRubrosComponent', () => {
  let component: ListRubrosComponent;
  let fixture: ComponentFixture<ListRubrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRubrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRubrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
