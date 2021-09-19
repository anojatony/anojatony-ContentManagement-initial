import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourpostsComponent } from './yourposts.component';

describe('YourpostsComponent', () => {
  let component: YourpostsComponent;
  let fixture: ComponentFixture<YourpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourpostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
