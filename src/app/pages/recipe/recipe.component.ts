import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { IRecipe } from '../../core/services/models/common.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent implements OnInit {
  recipes: IRecipe[] = [];
  filteredRecipes: IRecipe[] = [];
  searchQuery: string = '';

  constructor(private recipeService: RecipeService, private router: Router) {}
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
              category: recipe.category,
              cookingTime: recipe.cookingTime
            });
          });
          this.filteredRecipes = this.recipes; 
        },
      });
  }

  filterRecipes() {
    this.filteredRecipes = this.recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  editRecipe(key: string) {
    this.router.navigate(['/recipe-form/' + key]);
  }
  removeRecipe(key: string) {
    if (window.confirm('Are you sure you want to delete this')) {
      this.recipeService.deleteRecipe(key);
    }
  }
  viewRecipe(key: string) {
   this.router.navigate(['/recipe-details/' + key]);
  }
}
