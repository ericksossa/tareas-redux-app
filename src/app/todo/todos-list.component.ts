import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { Todo } from './model/todo.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {
  filtro: string;
  todos: Todo[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(resp => {
      this.todos = resp.todos;
      this.filtro = resp.filtro;
    });
  }

}
