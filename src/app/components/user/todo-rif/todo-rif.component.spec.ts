import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoRifComponent } from './todo-rif.component';

describe('TodoRifComponent', () => {
  let component: TodoRifComponent;
  let fixture: ComponentFixture<TodoRifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoRifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
