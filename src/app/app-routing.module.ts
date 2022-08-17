import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { SearchComponent } from "./search/search.component";
import { SearchSlotComponent } from "./search-slot/search-slot.component";

const routes: Routes = [
    { path: "", component: SearchComponent },
    { path: ":pitch_id/:start_date/:end_date", component: SearchComponent },
    { path: ":id", component: SearchSlotComponent },
    { path: "**", redirectTo: "" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
