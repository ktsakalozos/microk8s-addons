import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoadingComponent } from './loading/loading.component';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [NavigationComponent, LoadingComponent],
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CoreModule,
    CommonModule,
    LayoutModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    NavigationComponent,
    FlexLayoutModule,
    LoadingComponent
  ]
})
export class SharedModule {
}