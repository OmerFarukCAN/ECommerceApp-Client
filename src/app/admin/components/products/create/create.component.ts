import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ProductService } from "../../../../services/common/models/product.service";
import { Create_Product } from "../../../../contracts/create__product";
import { BaseComponent, SpinnerState } from "../../../../base/base.component";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService, MessageType, Position } from "../../../../services/admin/alertify.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(productName: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerState.BallScale);
    const create_Product: Create_Product = new Create_Product();
    create_Product.productName = productName.value;
    create_Product.stock = parseInt(stock.value);
    create_Product.price = parseFloat(price.value);

    // --> Ameleus yontem ile client tabanlı validation, Reactive Form ile daha sonra duzeltecegiz
    // if (!productName.value) {
    //   this.alertify.message("Please enter a product name!", {
    //     dismissOthers: true,
    //     messageType: MessageType.Error,
    //     position: Position.TopRight
    //   });
    //   return;
    // }

    // --> Bir sekilde client validation asılırsa o zaman backend'e gidip bir validation islemi yaptık.
    this.productService.create(create_Product, () => {
      this.hideSpinner(SpinnerState.BallSpin);
      this.alertify.message("Product added successfuly", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdProduct.emit(create_Product);
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    });
  }
}
