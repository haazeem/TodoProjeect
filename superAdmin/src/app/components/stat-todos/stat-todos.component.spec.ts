import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTodosComponent } from './stat-todos.component';

describe('StatTodosComponent', () => {
  let component: StatTodosComponent;
  let fixture: ComponentFixture<StatTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
