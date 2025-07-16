import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss'
})
export class DeleteForm implements OnInit {
  @Output() studentDeleted = new EventEmitter<string>();
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onDelete() {
    console.log('Form submitted:', this.studentForm.valid);
    if (this.studentForm.valid) {
      const { dni } = this.studentForm.value;
      console.log("dni", dni)
      this.studentDeleted.emit(dni.toString());
    }
  }
}
