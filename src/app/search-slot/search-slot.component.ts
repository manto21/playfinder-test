import { ChangeDetectorRef, Component} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { HumanizeDuration, HumanizeDurationLanguage } from "humanize-duration-ts";
import * as moment from "moment";
import { Observable, Subscription } from "rxjs";
import { ISlot } from "../models/search.model";
import * as fromSlots from '../store/slots/selectors/search-slot.selectors';

@Component({
    selector: "app-search-slot",
    templateUrl: "./search-slot.component.html",
    styleUrls: ["./search-slot.component.scss"],
})
export class SearchSlotComponent {
    public results: ISlot[];
    public page: number = 1;

    results$: Observable<ISlot[]>;
    slotId: string;

    public langService: HumanizeDurationLanguage =
        new HumanizeDurationLanguage();
    public humanizer: HumanizeDuration = new HumanizeDuration(this.langService);
    
    constructor(
        private router: ActivatedRoute,
        private store: Store<{ slots: ISlot[] }>,
        private cdr: ChangeDetectorRef
    ) 
    {
        this.results$ = this.store.select(fromSlots.selectSlotsEntities);
        this.slotId = this.router.snapshot.paramMap.get('id');
    }

    public subscription: Subscription;

    ngOnInit(): void {
        this.results$.subscribe(results => {
            if (results.length) {
                this.results = results.filter(item => this.slotId == item.id);
                console.log('Result : ', this.results);
                this.cdr.detectChanges();
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
