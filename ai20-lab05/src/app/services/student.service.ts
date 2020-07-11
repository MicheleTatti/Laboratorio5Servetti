import { Injectable } from '@angular/core';
import { Student } from '../student.model';
import { of, Observable, throwError, from } from 'rxjs';
import { catchError, map, tap, concatMap, toArray } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students : Student[]
  private DB_PATH = 'http://localhost:3000/students';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){}

  getAllStudents(): Observable<Student[]> { return this.http.get<Student[]>(`${this.DB_PATH}`).pipe(
    tap(_ => console.log('fetched students')),
    catchError(err => {console.error(err); return throwError(`${err.message}`)})
  ); }

  update(student: Student): Observable<Student> { 
    return this.http.put<Student>(`${this.DB_PATH}/${student.id}`, student, this.httpOptions)
  }

  getEnrolled(courseId: number): Observable<Student[]> {  
    return  this.http.get<Student[]>(`${this.DB_PATH}?courseId=${courseId}`)
  }

  updateEnrolled(courseId: number, students: Student[]): Observable<Student[]>{
   return from(students).pipe(concatMap((student) => {
      student.courseId = courseId ;  
      return this.update(student)}), toArray()) 
  }

}
