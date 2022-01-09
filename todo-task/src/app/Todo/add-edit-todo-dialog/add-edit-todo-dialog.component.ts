import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../service/modal.service';
import { Utility } from '../../utility';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ADD_TODO, UPDATE_TODO } from '../../store/todo.reducer';

@Component({
  selector: 'app-add-edit-todo-dialog',
  templateUrl: './add-edit-todo-dialog.component.html',
  styleUrls: ['./add-edit-todo-dialog.component.css']
})
export class AddEditTodoDialogComponent implements OnInit {
  editForm;
  public task$: Observable<any> = this.store.pipe()
    .pipe(map(state => state.todos.todo)
    );
  public task: any[] = [];

  constructor(public modalRef: NgbActiveModal, @Inject(MODAL_DATA) private readonly modalData,
              private readonly store: Store<any>) {
  }

  ngOnInit(): void {
    console.log(this.modalData);
    this.task$.subscribe((data) => {
      this.task = JSON.parse(JSON.stringify(data));
    });
    if (this.modalData?.isUpdate) {
      this.editForm = new FormGroup({
        id: new FormControl(this.modalData.data.id, Validators.required),
        task: new FormControl(this.modalData.data.task, Validators.required),
        date: new FormControl(Utility.toNgbDateStruct(this.modalData.data.date), Validators.required),
        status: new FormControl(this.modalData.data.status, Validators.required)
      });
    } else {
      this.editForm = new FormGroup({
        id: new FormControl(Math.random().toFixed(2), Validators.required),
        task: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)
      });
    }
  }

  onSubmit(): any {
    if (this.modalData?.isUpdate) {
      const data = this.editForm.value;
      for (const valueKey in this.editForm.value) {
        if (this.editForm.value.hasOwnProperty(valueKey)) {
          switch (valueKey) {
            case 'date': {
              if (this.editForm.value[valueKey]) {
                data.date = Utility.formatDate(this.editForm.value[valueKey]);
              }
              break;
            }
          }
        }
      }
      this.task.forEach((val) => {
        if (val.id === this.modalData.data.id) {
          val.date = data.date;
          val.status = data.status;
          val.task = data.task;
        }
      });
      this.store.dispatch({type: UPDATE_TODO, payload: this.task});
      this.modalRef.close(true);
    } else {
      const data = this.editForm.value;
      for (const valueKey in this.editForm.value) {
        if (this.editForm.value.hasOwnProperty(valueKey)) {
          switch (valueKey) {
            case 'date': {
              if (this.editForm.value[valueKey]) {
                data.date = Utility.formatDate(this.editForm.value[valueKey]);
              }
              break;
            }
          }
        }
      }
      this.store.dispatch({type: ADD_TODO, payload: data});
      this.modalRef.close();
    }
  }
}

