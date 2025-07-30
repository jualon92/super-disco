import { Component } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../../shared/entities';
import { CommonModule, JsonPipe } from '@angular/common';
import { StudentsTable } from "../../students-table/students-table";
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, JsonPipe, StudentsTable],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss'
})
export class Alumnos {
  alumnos! : Student[];
  constructor(private alumnosApi: AlumnosAPI) { }

  ngOnInit() {
    // cuando llegan los datos, hacer esto
    // 
    this.alumnosApi.getAlumnos().subscribe(alumnos => {
       this.alumnos = alumnos;
    });

   
  }

  deleteStudent(student: Student) {
     console.log("Eliminando alumno", student);
     // switch map and ask get alumnos again
     this.alumnosApi.deleteAlumno(student).subscribe(() => {
       this.alumnosApi.getAlumnos().subscribe(alumnos => {
         this.alumnos = alumnos;
       });
     });

     this.alumnosApi.deleteAlumno(student).pipe( 
      //delete termina, volve a preguntar a preguntar
       switchMap(() => this.alumnosApi.getAlumnos())
     ).subscribe(alumnos => {
       this.alumnos = alumnos;
     });
  //    this.alumnos = this.alumnos.filter(alumno => alumno.dni !== student.dni);
  //  get student data again
     
    }
}
