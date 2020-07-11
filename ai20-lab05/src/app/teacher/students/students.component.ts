import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Student } from '../../student.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Observable, from } from 'rxjs';
import { toArray } from 'rxjs/operators';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})



export class StudentsComponent implements OnInit {

  
  newStudent: Student;
  displayedColumns: string[] = ['select', 'id', 'name', 'firstName'];
  selection :SelectionModel<Student>;
  dataSource: MatTableDataSource<Student>;
  myControl = new FormControl();
  filteredStudents : Student[];

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  private _students = null;
  private _allStudents = null;
  

  @Input()
  set students(students: Student[]){
    this._allStudents = students;
    this.filteredStudents = this._allStudents;
  };
  @Input() 
  set enrolledStudents( enrolledStudents: Student[] ) {    
     this._students = enrolledStudents;
     this.dataSource = new MatTableDataSource<Student>(this._students)
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     
  }

  @Output() addEmitter = new EventEmitter<Student>();
  @Output() deleteEmitter = new EventEmitter<Student[]>();

 

  ngOnInit(): void {
    this.selection = new SelectionModel<Student>(true, []); // Multiple selection set to true, initial selection set to []
    this.newStudent = null;   
    this.filteredStudents = this.students
  }


  toggleForCheckbox(row: Student) {
    this.selection.toggle(row);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }


  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  deleteStudents(event: Event) {
    this.deleteEmitter.emit(this.selection.selected)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.selection.clear()
    this.myControl.reset()
  }

  displayFn(student: Student): string {
    return student && student.name ? student.firstName + ' ' + student.name + ' (' + student.id + ')' : '';
  }
  

  myFilter(event: Event) {

    console.log(this.filteredStudents)
    if (this.myControl.value != null) {
      const filterValue = this.myControl.value.toLowerCase();

      this.filteredStudents = this._allStudents.filter(option => option.name.toLowerCase().includes(filterValue) || option.firstName.toLowerCase().includes(filterValue)
        || option.id.toLowerCase().includes(filterValue));
    }
    
  }

  retrieveStudent(student: Student) {
    this.newStudent = student;
  }

  add() {
    
    if ((this.newStudent != null) && (this.dataSource.data.find(s => s.id == this.newStudent.id) == undefined)) {
      this.newStudent.courseId = 1;
      this.addEmitter.emit(this.newStudent);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }
}
