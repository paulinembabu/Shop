import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductItemComponent } from './shared/components/catalog/product-item/product-item.component';
import { CartItemComponent } from './shared/components/cart/cart-item/cart-item.component';
import { CartComponent } from './shared/components/cart/cart/cart.component';
import { CheckoutComponent } from './shared/components/cart/checkout/checkout.component';
import { CategoryService } from './shared/services/categories/category.service';
import { ProductService } from './shared/services/products/product.service';
import { CheckoutService } from './shared/services/cart/checkout.service';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { SliderComponent } from './shared/components/slider/slider.component';
import { ProductGridItemComponent } from './shared/components/catalog/product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from './shared/components/catalog/product-list-item/product-list-item.component';
import {LocalStorageService, StorageService} from './shared/services/storage/storage.service';
import {CartService} from './shared/services/cart/cart.service';
import {FormsModule} from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { BsModalModule } from 'ng2-bs3-modal';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { GooglePlaceModule } from 'angular2-google-place';
import { CurrencyPipe } from '@angular/common';

const routes: Routes = [
/*    { path: '', redirectTo: 'home', pathMatch: 'full' },*/
    { path: '',  component: HomeComponent },
    { path: 'categories/:id', component: CategoryComponent },
    { path: 'search', component: CategoryComponent },
    { path: 'contact-us',  redirectTo: 'home', pathMatch: 'full'},
    { path: '*',  redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductItemComponent,
    CartItemComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    CategoryComponent,
    SliderComponent,
    ProductGridItemComponent,
    ProductListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ScrollToModule.forRoot(),
    BsModalModule,
    OwlModule,
    NguiAutoCompleteModule,
    GooglePlaceModule
  ],
  exports: [
    RouterModule
  ],
  providers: [CategoryService, ProductService, CheckoutService, CartService, LocalStorageService, CurrencyPipe,
      {provide: StorageService, useClass: LocalStorageService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
