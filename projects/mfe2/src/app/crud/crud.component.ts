import { Component, ElementRef, NgModule, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit {
  
  public datas: any[] = [];
  public post: any;
  public updatedPost: any = {};
  public loading = true;
  public showInput = false;
  public selectedDataId: number | null = null;
  public titleError: string | null = null;
  public bodyError: string | null = null;

  @ViewChild('titleInput') titleInput!: ElementRef;
  @ViewChild('bodyInput') bodyInput!: ElementRef;
  @ViewChild('modalUpdate') modalUpdate!: TemplateRef<any>;

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
        this.datas = data;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }



  addData() {

    this.titleInput.nativeElement.value = '';
    this.bodyInput.nativeElement.value = '';
    this.showInput = false;
  }

  submitData() {
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


    const newData = {
      title: this.titleInput.nativeElement.value,
      body: this.bodyInput.nativeElement.value,
      userId: 1,
    };

    this.http.post('https://jsonplaceholder.typicode.com/posts', newData).subscribe(
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

  private modalService = inject(NgbModal);
	closeResult = '';
  openUpdateModal(dataId: number) {
    this.selectedDataId = dataId;
    console.log(dataId)

    const modalRef = this.modalService.open(this.modalUpdate, { ariaLabelledBy: 'modal-basic-title' });
  }

  submitDataUpdate(modal : NgbModalRef) {
    const title = this.updatedPost.title;
    const body = this.updatedPost.body;

    if (!title || !body) {
      this.titleError = !title ? 'Title is required.' : null;
      this.bodyError = !body ? 'Body is required.' : null;
      return;
    }

    // Reset errors
    this.titleError = null;
    this.bodyError = null;

    if (this.selectedDataId) {
      const updateData = {
        title: this.updatedPost.title,
        body: this.updatedPost.body,
        userId: 1,
      };
  
      this.http.put(`https://jsonplaceholder.typicode.com/posts/${this.selectedDataId}`, updateData)
        .subscribe(
          (response) => {
            console.log('Data berhasil diupdate:', response);
            this.refreshData();
            modal.dismiss()

          },
          (error) => {
            console.error('Error mengupdate data', error);
          }
        );
  

      this.updatedPost.title = '';
      this.updatedPost.body = '';
      this.showInput = false;
      this.selectedDataId = null; 
    } else {
      this.addData();
    }
  }

  refreshData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      (data: any) => {
        this.datas = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteTodo(dataId: number) {
    this.http.delete(`https://jsonplaceholder.typicode.com/posts/${dataId}`,{ observe: 'response' })
      .subscribe(
        (response) => {
          console.log(`Data ID ${dataId} berhasil dihapus`+ `Status :` + response.status);
          // Remove the deleted todo from the local array
          this.datas = this.datas.filter(data => data.id !== dataId);
        },
        (error) => {
          console.error(error `${dataId}`);
        }
      );
  }


}
