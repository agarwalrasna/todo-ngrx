import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DELETE_TODO, GET_TODOS } from '../../store/todo.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditTodoDialogComponent } from '../add-edit-todo-dialog/add-edit-todo-dialog.component';
import { ModalService } from '../service/modal.service';
import { Utility } from '../../utility';
import { ConfirmationDailogComponent } from '../confirmation-dailog/confirmation-dailog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks: any[] = [];
  public dateFormat = 'MMM d, y';
  public task$: Observable<any> = this.store.pipe()
    .pipe(map(state => state.todos)
    );

  constructor(private readonly store: Store<any>, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.task$.subscribe((data) => {
      localStorage.setItem('todo', JSON.stringify(data.todo));
      this.tasks = JSON.parse(localStorage.getItem('todo'));
    });
    this.store.dispatch({type: GET_TODOS});
  }

  onEdit(task): void {
    const dailogData = {
      isUpdate: true,
      data: task
    };
    this.modalService.show(AddEditTodoDialogComponent, Utility.getDialogConfig(dailogData, 'lg', false, false))
      .subscribe((result) => {
        if (result && !result.dismissed) {
          this.store.dispatch({type: GET_TODOS});
        }
      });
  }

  addTask(): void {
    this.modalService.show(AddEditTodoDialogComponent, Utility.getDialogConfig(null, 'lg', false, false))
      .subscribe((result) => {
        if (result && !result.dismissed) {
          this.store.dispatch({type: GET_TODOS});
        }
      });
  }

  onDel(id: string): void {
    this.modalService.show(ConfirmationDailogComponent, Utility.getDialogConfig(null, 'sm', false, false))
      .subscribe((result) => {
        if (result && !result.dismissed) {
          this.store.dispatch({type: DELETE_TODO, payload: id});
          this.store.dispatch({type: GET_TODOS});
        }
      });
  }
}
