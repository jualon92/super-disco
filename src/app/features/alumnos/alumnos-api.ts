import { Injectable } from '@angular/core';
import { Student } from '../../../shared/entities';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPI {
  baseUrl = "http://localhost:3000";
  constructor(
    private http: HttpClient
  ) { }
  getAlumnos(): Observable<Student[]> {
    //PREFERIR ENUM, hardcodear students o courses
    return this.http.get<Student[]>(`${this.baseUrl}/students`).pipe(delay(1000));
  }

  deleteAlumno(student: Student): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/${student.dni}`).pipe(delay(1000));
  }
  
}
