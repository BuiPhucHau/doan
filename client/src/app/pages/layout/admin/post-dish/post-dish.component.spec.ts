import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDishComponent } from './post-dish.component';

describe('PostDishComponent', () => {
  let component: PostDishComponent;
  let fixture: ComponentFixture<PostDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
