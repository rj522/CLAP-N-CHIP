import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPortfolioComponent } from './artist-portfolio.component';

describe('ArtistPortfolioComponent', () => {
  let component: ArtistPortfolioComponent;
  let fixture: ComponentFixture<ArtistPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
