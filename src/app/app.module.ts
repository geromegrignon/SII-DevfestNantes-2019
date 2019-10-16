import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import {Routes, RouterModule} from '@angular/router';
import { DrumkitComponent } from './components/drumkit/drumkit.component';
import { SlotComponent } from './components/slot/slot.component';
import { HomeComponent } from './home/home.component';
import { TrainingComponent } from './components/training/training.component';
import {SensorGuard} from './guards/sensor.guard';
import { TrainingTwoComponent } from './components/training-two/training-two.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ScoreComponent } from './components/score/score.component';
import { CountdownComponent } from './components/countdown/countdown.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'training', component: TrainingComponent, canActivate: [SensorGuard]},
  {path: 'training-two', component: TrainingTwoComponent, canActivate: [SensorGuard]},
  {path: 'game', component: GameComponent, canActivate: [SensorGuard]},
  {path: 'score', component: ScoreComponent, canActivate: [SensorGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    DrumkitComponent,
    SlotComponent,
    HomeComponent,
    TrainingComponent,
    TrainingTwoComponent,
    ScoreComponent,
    CountdownComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
