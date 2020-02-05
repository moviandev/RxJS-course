import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { interval, of, fromEvent } from 'rxjs';
import { take, map, filter, mergeMap, switchMap } from 'rxjs/operators';
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
  replaySubject$: ReplaySubject<number>;

  ngOnInit() {
    this.observable$ = new Observable<any>(observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.complete();
    });

    this.observable$.subscribe(
      v => console.log('Observable ==> ', v),
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

    this.replaySubject$ = new ReplaySubject<number>();
    this.replaySubject$.subscribe(x =>
      console.log('First subscribe  ==> Replay ', x),
    );
    this.replaySubject$.next(1);
    this.replaySubject$.next(2);
    this.replaySubject$.next(3);

    this.replaySubject$.subscribe(v =>
      console.log('second subscribe ==> ReplaySub ', v),
    );
    this.replaySubject$.next(3);

    const numbers$ = interval(10);

    numbers$
      .pipe(
        take(5),
        map(x => x * 1),
        filter(x => x % 2 === 1),
      )
      .subscribe(v => console.log('Operator take$ ==> ', v));

    const numbers2$ = interval(1000);
    const letters$ = of('a', 'b', 'c', 'd', 'e');

    letters$
      .pipe(
        mergeMap(x =>
          numbers2$.pipe(
            take(5),
            map(i => i + x),
          ),
        ),
      )
      .subscribe(x => console.log('MERGEMAP ==> ', x));

    const numbers3$ = interval(1000);
    const letters1$ = of('a', 'b', 'c', 'd', 'e');

    letters1$
      .pipe(
        switchMap(x =>
          numbers3$.pipe(
            take(5),
            map(i => i + x),
          ),
        ),
      )
      .subscribe(x => console.log('SWITCHMAP ==> ', x));

    fromEvent(document, 'click').subscribe(x =>
      console.log('FROM EVENT ==> ', x),
    );
  }

  ngOnDestroy() {
    this.observable$.unsubscribe();
    this.subject$.unsubscribe();
    this.behaviorSubject$.unsubscribe();
    this.replaySubject$.unsubscribe();
  }
}
