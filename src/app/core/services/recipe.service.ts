import { Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { IRecipe } from './models/common.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private dbPath = '/recipes';

  recipesRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.recipesRef = db.list(this.dbPath);
  }

  getAllRecipes() {
    return this.recipesRef;
  }

  getRecipe(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addRecipe(recipe: IRecipe) {
    return this.recipesRef.push(recipe);
  }
  updateRecipe(key: string, recipe: IRecipe) {
    this.recipesRef.update(key, recipe);
  }
  deleteRecipe(key: string) {
    this.recipesRef.remove(key);
  }
}
