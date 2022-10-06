import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BookmarkManagerComponent } from './bookmark-manager/bookmark-manager.component';

const routes: Routes = [
  {path: '' , component:BookmarkManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
