import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoApplicationDataComponent } from './no-application-data.component';

describe('NoApplicationDataComponent', () => {
  let component: NoApplicationDataComponent;
  let fixture: ComponentFixture<NoApplicationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoApplicationDataComponent],
      imports: [],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoApplicationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
