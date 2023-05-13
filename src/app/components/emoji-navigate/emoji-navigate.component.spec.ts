import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiNavigateComponent } from './emoji-navigate.component';

describe('EmojiNavigateComponent', () => {
  let component: EmojiNavigateComponent;
  let fixture: ComponentFixture<EmojiNavigateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmojiNavigateComponent]
    });
    fixture = TestBed.createComponent(EmojiNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
