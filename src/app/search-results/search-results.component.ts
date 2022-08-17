import { Component, OnInit } from "@angular/core";
import SearchService from "../services/search.service";
import { ISlot } from "../models/search.model";
import * as moment from "moment";
import {
    HumanizeDurationLanguage,
    HumanizeDuration,
} from "humanize-duration-ts";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromSlots from '../store/slots/selectors/search-slot.selectors';


@Component({
    selector: "app-search-results",
    templateUrl: "./search-results.component.html",
    styleUrls: ["./search-results.component.scss"],
})
export class SearchResultsComponent implements OnInit {
    public results: ISlot[];
    public page: number = 1;

    results$: Observable<ISlot[]>;

    constructor(
        public searchService: SearchService,
        private store: Store<{ slots: ISlot[] }>
    ) 
    {
        this.results$ = this.store.select(fromSlots.selectSlotsEntities);
    }

    public langService: HumanizeDurationLanguage =
        new HumanizeDurationLanguage();
    public humanizer: HumanizeDuration = new HumanizeDuration(this.langService);

    public subscription: Subscription;

    ngOnInit(): void {
        this.results$.subscribe(results => {
            if (results.length) {
                this.results = results;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) this.subscription.unsubscribe();
    }

    public getDuration(start: string, end: string) {
        const duration = moment
            .duration(moment(end).diff(moment(start)))
            .asMilliseconds();
        return this.humanizer.humanize(duration, { serialComma: false });
    }
}
