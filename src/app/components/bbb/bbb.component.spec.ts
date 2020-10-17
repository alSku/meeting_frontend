import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbbComponent } from './bbb.component';

describe('BbbComponent', () => {
  let component: BbbComponent;
  let fixture: ComponentFixture<BbbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
