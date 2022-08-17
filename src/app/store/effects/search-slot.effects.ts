import { ApiParams, Result } from '../../models/search.model';
import { props, Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, Observable } from 'rxjs';
import { map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import SearchService from '../../services/search.service';
import { CoreActionsUnion } from '../../search-slot.actions';
import { returnSlots } from '../../search-slot.actions';

@Injectable()
export class SlotEffects {
    // loadSlots$: Observable<Action> = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType('[Slots] Get Slots'),
    //         mergeMap((action) =>
    //             this.searchService.getResults(action.api_params).pipe(
    //                 map((result: Result) =>
    //                     returnSlots({ payload: result.data })
    //                 )
    //                 //   catchError((error: Error) => {
    //                 //     return of(ToDoActions.ErrorToDoAction(error));
    //                 //   })
    //             )
    //         )
    //     )
    // );

    constructor(
        private actions$: Actions<CoreActionsUnion>,
        private searchService: SearchService
    ) {}
}
