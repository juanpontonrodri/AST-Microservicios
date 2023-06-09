import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPokemonComponent } from './get-pokemon.component';

describe('GetPokemonComponent', () => {
  let component: GetPokemonComponent;
  let fixture: ComponentFixture<GetPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
