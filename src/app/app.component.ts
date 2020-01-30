import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs-course';
  observable$;
  subject$: Subject<number>;
  behaviorSubject$: BehaviorSubject<number>;

  ngOnInit() {
    this.observable$ = new Observable<any>(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.complete();
    });

    this.observable$.subscribe(
      v => console.log(v),
      err => console.log(err),
      () => console.log('this is the end'),
    );

    this.subject$ = new Subject<number>();
    this.subject$.subscribe(x => console.log('First subscribe ==> ', x));
    this.subject$.next(1);
    this.subject$.next(2);
    this.subject$.next(3);

    this.subject$.subscribe(v => console.log('second subscribe ==> ', v));
    this.subject$.next(3);

    this.behaviorSubject$ = new BehaviorSubject<number>(200);
    this.behaviorSubject$.subscribe(x =>
      console.log('First subscribe  ==> Behavior ', x),
    );
    this.behaviorSubject$.next(1);
    this.behaviorSubject$.next(2);
    this.behaviorSubject$.next(3);

    this.behaviorSubject$.subscribe(v =>
      console.log('second subscribe ==> Behavior ', v),
    );
    this.behaviorSubject$.next(3);
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
    this.subject$.unsubscribe();
  }
}
