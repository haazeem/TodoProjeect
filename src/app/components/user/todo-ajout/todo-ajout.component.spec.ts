import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAjoutComponent } from './todo-ajout.component';

describe('TodoAjoutComponent', () => {
  let component: TodoAjoutComponent;
  let fixture: ComponentFixture<TodoAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
