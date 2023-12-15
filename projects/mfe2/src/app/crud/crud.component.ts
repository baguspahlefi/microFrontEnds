import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

    public todos: any[] = [];
    li: any;
    lis = [];
    constructor(private http: HttpClient) {
 
    }
    ngOnInit(): void {
        this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
          this.li = data;
          console.log(this.li);
          this.lis = this.li.list;
          console.log(this.lis);
        });
    
        
    }
}
