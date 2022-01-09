import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() { }

  getTasks(): any {
    console.log('sdfsdf');
    return JSON.parse(localStorage.getItem('todo'));
    // return this.obs.subscribe(JSON.parse(localStorage.getItem('todo')))
  }

  addTask(task: any): any {
    return '';
  }

  editTask(task: any): any {
    return '';
  }

  deleteTask(taskId: any): any {
    console.log('deleting task:::', taskId);
    return '';
  }
}
