import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { MatSort } from '@angular/material/sort';
import { Subscription, Observable, concat } from 'rxjs';
import { map, switchMap, concatAll } from 'rxjs/operators';


@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  enrolledStudents: Student[] = [];
  allStudents: Student[] = [];
  private enrolledStudentsSub: Subscription
  private allStudentsSub: Subscription


  ngOnInit(): void {
    this.enrolledStudentsSub = this.studentService.getEnrolled(1).subscribe(student => this.enrolledStudents = student)
    this.allStudentsSub = this.studentService.getAllStudents().subscribe(student => this.allStudents = student)
  }


  addStudent(student: Student) {
    this.studentService.update(student).subscribe(x =>
      this.studentService.getEnrolled(1).subscribe(student => this.enrolledStudents = student)
    );

  }

  deleteStudents(selection: Student[]) {
    this.studentService.updateEnrolled(0, selection).subscribe(x =>
      this.studentService.getEnrolled(1).subscribe(student => this.enrolledStudents = student))

  }


  ngOnDestroy() {
    this.enrolledStudentsSub.unsubscribe();
    this.allStudentsSub.unsubscribe();
  }

}
