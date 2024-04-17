import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { IRecipe } from '../../core/services/models/common.model';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
  recipes: IRecipe[] = [];
  totalRecipes = 0;

  constructor(private recipeService: RecipeService) {}
  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.recipeService
      .getAllRecipes()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.recipes = [];

          data.forEach((item) => {
            let recipe = item.payload.toJSON() as IRecipe;

            this.recipes.push({
              key: item.key || '',
              name: recipe.name,
              img: recipe.img,
              ingredients: recipe.ingredients,
              description: recipe.description,
            });
          });
        },
      });
  }
}
