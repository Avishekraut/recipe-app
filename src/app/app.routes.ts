import { Routes } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

export const routes: Routes = [
    {path: '', component: RecipeComponent},
    {path: 'recipe-form', component: RecipeFormComponent},
    {path: 'recipe-form/:id', component: RecipeFormComponent},
    {path: 'recipe-details/:id', component: RecipeDetailsComponent},

];
