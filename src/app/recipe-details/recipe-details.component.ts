import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../core/services/recipe.service';
import { IRecipe } from '../core/services/models/common.model';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  recipeId = '';
  recipe: IRecipe | undefined;
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.recipeId = params['id'];
        this.getRecipe(this.recipeId);
      },
    });
  }

  getRecipe(key: string) {
    this.recipeService
      .getRecipe(key)
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          const payload = data.payload.toJSON();
          this.recipe = { key, ...(payload as object) } as IRecipe;
        },
      });
  }
}
