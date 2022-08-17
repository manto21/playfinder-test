import { AppComponent } from "./app/app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import SearchService from "./services/search.service";
import { SearchComponent } from "./search/search.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SearchFormComponent } from "./search-form/search-form.component";
import { SearchResultsComponent } from "./search-results/search-results.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SearchSlotComponent } from "./search-slot/search-slot.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { searchSlotReducer } from "./store/slots/reducers/search-slot.reducer";
import { SlotEffects } from "./store/slots/effects/search-slot.effects";

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SearchFormComponent,
        SearchResultsComponent,
        SearchSlotComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgbModule,
        StoreModule.forRoot({slots: searchSlotReducer}),
        EffectsModule.forRoot([SlotEffects]),
    ],
    providers: [SearchService],
    bootstrap: [AppComponent],
})
export class AppModule {}
