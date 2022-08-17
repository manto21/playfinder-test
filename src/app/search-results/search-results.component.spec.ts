import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchResultsComponent } from "./search-results.component";
import SearchService from "../services/search.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";

describe("SearchResultsComponent", () => {
    let component: SearchResultsComponent;
    let fixture: ComponentFixture<SearchResultsComponent>;
    let store: MockStore;
    const initialState = {};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchResultsComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [SearchService, provideMockStore({ initialState })],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
    });

    it("should create", () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});