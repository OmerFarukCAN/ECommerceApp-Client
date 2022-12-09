import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { List_Product } from "../../../../contracts/list_product";
import { ProductService } from "../../../../services/common/models/product.service";
import { BaseComponent, SpinnerState } from "../../../../base/base.component";
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService, MessageType, Position } from "../../../../services/admin/alertify.service";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService) {
    super(spinner);
  }

  displayedColumns: string[] = ["productName", "stock", "price", "createdDate", "updatedDate"];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerState.Pacman);
    const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerState.Pacman), errorMessage => this.alertifyService.message(errorMessage, {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight
    }));
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }
}
