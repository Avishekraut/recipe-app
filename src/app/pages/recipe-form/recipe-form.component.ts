import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../core/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from '../../core/services/models/common.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;
  recipeId = '';
  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.recipeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.recipeId = params['id'];
        this.getRecipe(this.recipeId);
      },
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['/']);
    } else {
      this.recipeForm.markAllAsTouched();
    }
  }

  getRecipe(key: string) {
    this.recipeService
      .getRecipe(key)
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          let recipe = data.payload.toJSON() as IRecipe;
          this.recipeForm.setValue(recipe);
        },
      });
  }
}
