import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistLoginComponent } from './artist-login.component';

describe('ArtistLoginComponent', () => {
  let component: ArtistLoginComponent;
  let fixture: ComponentFixture<ArtistLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
