import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedsComponent } from './rejecteds.component';

describe('RejectedsComponent', () => {
  let component: RejectedsComponent;
  let fixture: ComponentFixture<RejectedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
