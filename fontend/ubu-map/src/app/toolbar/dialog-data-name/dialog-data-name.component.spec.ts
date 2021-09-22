import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataNameComponent } from './dialog-data-name.component';

describe('DialogDataNameComponent', () => {
  let component: DialogDataNameComponent;
  let fixture: ComponentFixture<DialogDataNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDataNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDataNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
