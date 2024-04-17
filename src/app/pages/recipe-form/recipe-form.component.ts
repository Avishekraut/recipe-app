import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../core/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent {
  recipeForm!: FormGroup;

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {
    this.recipeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required]),
      ingredients: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  

  onSubmit() {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
    } else {
      this.recipeForm.markAllAsTouched();
    }
  }
}
