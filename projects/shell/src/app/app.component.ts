import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shell';

  toggle(){
    const element = document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }
}
