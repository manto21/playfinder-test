import { ISlot } from "../../../models/search.model";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs/operators";
import { CoreActionsUnion } from "../actions/search-slot.actions";

import * as SlotsActions from '../actions/search-slot.actions';
import SearchService from "src/app/services/search.service";

@Injectable()
export class SlotEffects {
    @Effect()
    loadSlots$ = this.actions$.pipe(
        ofType(SlotsActions.getSlots),
        switchMap((action) =>
            this.searchService.getResults(action.payload).pipe(
                map((result: ISlot[]) =>
                    SlotsActions.getSlotsSuccess({ payload: result })
                )
            )
        )
    );

    constructor(
        private actions$: Actions<CoreActionsUnion>,
        private searchService: SearchService
    ) {}
}