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
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipes: IRecipe[] = [];
  filteredRecipes: IRecipe[] = [];
  searchQuery: string = '';
  selectedCategories: { [key: string]: boolean } = {
    Veg: false,
    'Non-Veg': false,
  };
  selectedSort: string = 'name';
  sortOrder: string = 'asc';

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
              cookingTime: recipe.cookingTime,
            });
          });
          this.filteredRecipes = this.recipes;
        },
      });
  }

  filterRecipes() {
    this.filteredRecipes = this.recipes.filter(recipe => {
      const matchesSearch = 
        recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(this.searchQuery.toLowerCase());
  
      const matchesCategory = 
        (this.selectedCategories['Veg'] && recipe.category === 'Veg') ||
        (this.selectedCategories['Non-Veg'] && recipe.category === 'Non-Veg');
  
      // If no categories are selected
      if (!this.selectedCategories['Veg'] && !this.selectedCategories['Non-Veg']) {
        return matchesSearch;
      }
  
      // If both search and category match
      return matchesSearch && matchesCategory;
    });
  }
  

  sortRecipes() {
    if (!this.selectedSort) {
      return; 
    }
    
    const [sortField, order] = this.selectedSort.split(' '); 

    if (sortField === 'cookingTime') {
      this.filteredRecipes.sort((a, b) => {
        if (order === 'asc') {
          return a.cookingTime - b.cookingTime; // Low to High
        } else {
          return b.cookingTime - a.cookingTime; // High to Low
        }
      });
    }
  }

  editRecipe(key: string) {
    this.router.navigate(['/recipe-form/' + key]);
  }

  removeRecipe(key: string) {
    if (window.confirm('Are you sure you want to delete this?')) {
      this.recipeService.deleteRecipe(key);
    }
  }

  viewRecipe(key: string) {
    this.router.navigate(['/recipe-details/' + key]);
  }
}
