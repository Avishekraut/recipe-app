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
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.recipeForm.valid) {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.router.navigate(['/']);
    } else {
      this.recipeForm.markAllAsTouched();
    }
  }
}
