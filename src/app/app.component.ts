import { Component } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'rxjs-course';

  constructor() {
    const observable$ = new Observable(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.complete();
    });

    observable$.subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('this is the end'),
    );
  }
}
