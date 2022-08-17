import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import SearchService from "../services/search.service";
import { FormInputs, ApiParams, ISlot } from "../models/search.model";
import { Store } from "@ngrx/store";

import * as fromSlots from '../store';

@Component({
    selector: "app-search-form",
    templateUrl: "./search-form.component.html",
    styleUrls: ["./search-form.component.scss"],
})
export class SearchFormComponent implements OnInit {
    constructor(
        public fb: FormBuilder,
        public searchService: SearchService,
        public router: Router,
        public route: ActivatedRoute,
        private store: Store<{ slots: ISlot[] }>
    ) {}

    public pitch_id: number;
    public start_date: string;
    public end_date: string;

    public start_date_object: NgbDateStruct;
    public end_date_object: NgbDateStruct;

    public form_inputs: FormInputs;
    public api_params: ApiParams;

    public searchForm: any;

    public startDateString: string;
    public endDateString: string;

    public correctDates: boolean = true;

    ngOnInit(): void {
        this.setParamsFromUrl();
        this.start_date_object = this.createDateObject(this.start_date);
        this.end_date_object = this.createDateObject(this.end_date);
        this.setFormInputs();
        this.setInitialApiParams();
        this.initialiseForm();
        this.populateFromUrl();
    }

    public setParamsFromUrl(): void {
        this.pitch_id = this.route.snapshot.params.pitch_id
            ? parseInt(this.route.snapshot.params.pitch_id)
            : null;
        this.start_date = this.route.snapshot.params.start_date
            ? this.route.snapshot.params.start_date
            : null;
        this.end_date = this.route.snapshot.params.end_date
            ? this.route.snapshot.params.end_date
            : null;
    }

    public populateFromUrl(): void {
        this.pitch_id && this.start_date && this.end_date
            ? this.onSubmit(this.form_inputs, true)
            : null;
    }

    public setFormInputs(): void {
        this.form_inputs = {
            pitch_id: this.pitch_id,
            start_date_object: this.start_date_object,
            end_date_object: this.end_date_object,
        };
    }

    public setInitialApiParams(): void {
        this.api_params = {
            pitch_id: this.pitch_id ? this.pitch_id : null,
            start_date: this.start_date ? this.start_date : null,
            end_date: this.end_date ? this.end_date : null,
        };
    }

    public initialiseForm(): void {
        this.searchForm = this.fb.group({
            pitch_id: [this.form_inputs.pitch_id, Validators.required],
            start_date_object: [
                this.form_inputs.start_date_object,
                Validators.required,
            ],
            end_date_object: [
                this.form_inputs.end_date_object,
                Validators.required,
            ],
        });
    }

    public createDateString(date: NgbDateStruct): string {
        const dateString =
            date.year.toString() +
            "-" +
            date.month.toString() +
            "-" +
            date.day.toString();
        const formattedDate = moment(dateString, "YYYY-M-D").format(
            "YYYY-MM-DD"
        );
        return formattedDate;
    }

    public createDateObject(dateString: string): NgbDateStruct {
        const dateObject = {
            year: dateString ? parseInt(dateString.split("-")[0]) : null,
            month: dateString ? parseInt(dateString.split("-")[1]) : null,
            day: dateString ? parseInt(dateString.split("-")[2]) : null,
        };
        return dateObject;
    }

    public checkEndDate(form_inputs: FormInputs): boolean {
        this.startDateString = this.createDateString(
            form_inputs.start_date_object
        );
        this.endDateString = this.createDateString(form_inputs.end_date_object);
        return this.isDateCorrect();
    }

    public isDateCorrect(): boolean {
        return (
            this.startDateString === this.endDateString ||
            moment(this.startDateString).isBefore(this.endDateString)
        );
    }

    public onSubmit(form_inputs: FormInputs, isValid: boolean) {
        this.setCorrectDates(form_inputs, isValid);
        if (this.correctDates) {
            this.api_params = {
                pitch_id: form_inputs.pitch_id,
                start_date: this.startDateString,
                end_date: this.endDateString,
            };
            this.store.dispatch(
                fromSlots.getSlots({
                    payload: this.api_params,
                }),
            );

            this.setUrl();
        }
    }

    public setCorrectDates(form_inputs: FormInputs, isValid: boolean): void {
        !isValid
            ? (this.correctDates = false)
            : (this.correctDates = this.checkEndDate(form_inputs));
    }

    public setUrl(): void {
        this.router.navigate([
            "/",
            this.api_params.pitch_id,
            this.api_params.start_date,
            this.api_params.end_date,
        ]);
    }
}
