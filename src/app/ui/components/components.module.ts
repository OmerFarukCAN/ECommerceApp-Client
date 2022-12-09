import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ProductsModule, HomeModule, CartModule],
  exports: [CommonModule, ProductsModule, HomeModule, CartModule],
})
export class ComponentsModule {}
