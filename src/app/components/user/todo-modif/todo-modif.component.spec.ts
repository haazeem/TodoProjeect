import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoModifComponent } from './todo-modif.component';

describe('TodoModifComponent', () => {
  let component: TodoModifComponent;
  let fixture: ComponentFixture<TodoModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
