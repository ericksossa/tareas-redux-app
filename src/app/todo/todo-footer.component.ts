import { Component, OnInit } from '@angular/core';
import * as fromfiltro from '../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Todo } from './model/todo.model';
import * as fromTodo from './todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  pendientes: number;
  filtroActual: fromfiltro.filtrosValidos;
  filtrosValidos: fromfiltro.filtrosValidos[] = ['all', 'active', 'completed'];
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(nuevoFiltro: fromfiltro.filtrosValidos) {
    const accion = new fromfiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  borrarCompletados() {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch(accion);
  }

}
