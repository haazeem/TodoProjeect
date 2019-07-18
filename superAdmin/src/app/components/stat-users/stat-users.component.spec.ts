import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatUsersComponent } from './stat-users.component';

describe('StatUsersComponent', () => {
  let component: StatUsersComponent;
  let fixture: ComponentFixture<StatUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
