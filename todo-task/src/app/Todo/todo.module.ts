import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTodoDialogComponent } from './add-edit-todo-dialog/add-edit-todo-dialog.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './service/todo.service';
import { TodoRoutingModule } from './todo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './service/modal.service';
import { ConfirmationDailogComponent } from './confirmation-dailog/confirmation-dailog.component';

@NgModule({
  declarations: [AddEditTodoDialogComponent,
    TodoListComponent,
    ConfirmationDailogComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
  ],
  exports: [
    AddEditTodoDialogComponent,
    TodoListComponent
  ],
  providers: [TodoService, ModalService
  ]
})
export class TodoModule {
}
