import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  public todos: any[] = [];
  public post: any;
  public updatedPost: any = {};
  public loading = true;
  public showInput = false;
  public selectedTodoId: number | null = null;
  public titleError: string | null = null;
  public bodyError: string | null = null;

  @ViewChild('titleInput') titleInput!: ElementRef;
  @ViewChild('bodyInput') bodyInput!: ElementRef;

  constructor(private http: HttpClient) {}

  toggleInput() {
    this.showInput = !this.showInput;

    if (this.showInput) {
      setTimeout(() => {
        this.titleInput.nativeElement.focus();
      }, 0);
    }
  }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      (data: any) => {
        this.todos = data;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }



  addTodo() {

    this.titleInput.nativeElement.value = '';
    this.bodyInput.nativeElement.value = '';
    this.showInput = false;
  }

  submitTodo() {
    const title = this.titleInput.nativeElement.value;
    const body = this.bodyInput.nativeElement.value;

    if (!title || !body) {
      this.titleError = !title ? 'Title is required.' : null;
      this.bodyError = !body ? 'Body is required.' : null;
      return;
    }

    // Reset errors
    this.titleError = null;
    this.bodyError = null;

    
    const newTodo = {
      title: this.titleInput.nativeElement.value,
      body: this.bodyInput.nativeElement.value,
      userId: 1,
    };

    this.http.post('https://jsonplaceholder.typicode.com/posts', newTodo).subscribe(
      (response) => {
        console.log('Data berhasil ditambah:', response);
        this.post = response;
      },
      (error) => {
        console.error('Error menambah data', error);
      }
    );

    // Reset the input fields and hide them
    this.titleInput.nativeElement.value = '';
    this.bodyInput.nativeElement.value = '';
    this.showInput = false;
  }

  openUpdateModal(todoId: number) {
    this.selectedTodoId = todoId;
  }

  submitTodoUpdate() {
    const title = this.titleInput.nativeElement.value;
    const body = this.bodyInput.nativeElement.value;

    if (!title || !body) {
      this.titleError = !title ? 'Title is required.' : null;
      this.bodyError = !body ? 'Body is required.' : null;
      return;
    }

    // Reset errors
    this.titleError = null;
    this.bodyError = null;

    if (this.selectedTodoId) {
      const updatedTodo = {
        title: this.titleInput.nativeElement.value,
        body: this.bodyInput.nativeElement.value,
        userId: 1,
      };
  
      this.http.put(`https://jsonplaceholder.typicode.com/posts/${this.selectedTodoId}`, updatedTodo)
        .subscribe(
          (response) => {
            console.log('Data berhasil diupdate:', response);
            this.refreshData();
            $(`#basicModal-${this.selectedTodoId}`).modal('hide');
          },
          (error) => {
            console.error('Error mengupdate data', error);
          }
        );
  
  
      this.titleInput.nativeElement.value = '';
      this.bodyInput.nativeElement.value = '';
      this.showInput = false;
      this.selectedTodoId = null; 
    } else {
      this.addTodo();
    }
  }

  refreshData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      (data: any) => {
        this.todos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteTodo(todoId: number) {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${todoId}`,{ observe: 'response' })
      .subscribe(
        (response) => {
          console.log(`Data ID ${todoId} berhasil dihapus`+ `Status :` + response.status);
          // Remove the deleted todo from the local array
          this.todos = this.todos.filter(todo => todo.id !== todoId);
        },
        (error) => {
          console.error(error `${todoId}`);
        }
      );
  }


}
