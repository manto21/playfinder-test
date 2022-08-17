import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, Validators } from "@angular/forms";
import SearchService from "../services/search.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";

import { SearchFormComponent } from "./search-form.component";
import { SearchComponent } from "../search/search.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

describe("SearchFormComponent", () => {
    const formBuilder: FormBuilder = new FormBuilder();
    let component: SearchFormComponent;
    let fixture: ComponentFixture<SearchFormComponent>;
    let store: MockStore;
    const initialState = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchFormComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([
                    { path: "", component: SearchComponent },
                    {
                        path: ":pitch_id/:start_date/:end_date",
                        component: SearchComponent,
                    },
                ]),
                NgbModule,
                ReactiveFormsModule,
            ],
            providers: [
                { provide: FormBuilder, useValue: formBuilder },
                Validators,
                SearchService,
                provideMockStore({ initialState })
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchFormComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
    });

    it("should create", () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
