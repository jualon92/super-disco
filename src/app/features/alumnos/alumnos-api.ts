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

  // uses mockapi.io to mock API calls  https://mockapi.io/
  // Remember to use Allow CORS extension in the browser
  getAlumnosWithMockAPI(): Observable<Student[]> {
    return this.http.get<Student[]>(`https://688974824c55d5c739526aa1.mockapi.io/`).pipe(delay(1000));
  }
  

  deleteAlumno(student: Student): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/${student.dni}`).pipe(delay(1000));
  }
  
}
