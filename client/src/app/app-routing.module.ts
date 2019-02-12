import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameViewComponent } from 'src/app/game-view/game-view.component';
import { AppComponent } from 'src/app/app.component';
import { LobbyComponent } from 'src/app/lobby/lobby.component';

const routes: Routes = [
  { path: 'lobby', component: LobbyComponent},
  { path: 'game', component: GameViewComponent},
  { path: '', redirectTo: '/lobby', pathMatch: 'full'},
  { path: '**', component: AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
