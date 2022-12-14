import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription  } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  // public intervalSubs: Subscription;

  constructor(){
  //  this.retornarObservable().pipe(
  //     retry()
  //   )
  //   .subscribe({
  //     next: value => console.log('Subs:', value), 
  //     error: err => console.warn('Error', err),
  //     complete: () => console.info('Obs terminado')
  //   }
  //   )

    //  this.intervalSubs = this.retornaIntervalo()
    //   .subscribe(
    //     (valor) => {
    //        console.log(valor)
    //     }
    //   )

  }
  ngOnDestroy(): void {
    // this.intervalSubs.unsubscribe()
  }

  retornaIntervalo():Observable<number>{
    return  interval(500)
                      .pipe(
                        map( valor =>  valor + 1 ),
                        filter ( valor => ( valor % 2 === 0)? true : false),
                        // take(10),
                        )
   
  }

  retornarObservable(){

    return new Observable<number>( observer => {
      
      let i = -1;

     const intervalo =  setInterval( () => {

        i++
        observer.next(i)

      if ( i === 4){
        clearInterval(intervalo)
        observer.complete()
      }

    }, 1000 )
    }) 
  }
}
