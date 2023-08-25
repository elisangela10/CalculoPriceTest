import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoPrecosComponent } from './calculo-precos.component';

describe('CalculoPrecosComponent', () => {
  let component: CalculoPrecosComponent;
  let fixture: ComponentFixture<CalculoPrecosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculoPrecosComponent]
    });
    fixture = TestBed.createComponent(CalculoPrecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
