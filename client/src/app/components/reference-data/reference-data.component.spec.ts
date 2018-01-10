import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDataComponent } from './reference-data.component';
import {
     RouterLinkStubDirective,
    RouterOutletStubComponent
} from '../../testing/router-stubs';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('ReferenceDataComponent', () => {
  let component: ReferenceDataComponent;
  let fixture: ComponentFixture<ReferenceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceDataComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
        imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
