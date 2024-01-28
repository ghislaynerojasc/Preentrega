export class ShoppingCartPage {

    constructor() {
        this.shoppingCartLink = '[data-cy="goShoppingCart"]'; 
        this.productoNombre = '//*[@id="productName"]'; 
        this.productoPrecio = '//*[@id="unitPrice"]'; 
        this.productoCantidad = '//*[@id="productAmount"]'; 
        this.precioTotal = '//*[@id="totalPrice"]'; 
    };

    clickShoppingCartLink() {
        cy.get(this.shoppingCartLink).contains("Go to shopping cart").click();
    };

    obtenerProducto(producto) {
        return cy.contains('li', producto);
    };

    obtenerNombreProducto(producto) {
        return cy.xpath(this.productoNombre).contains('p#productName', producto);
    };

    obtenerPrecioProducto(producto) {
        return cy.xpath(this.productoPrecio).contains('p#unitPrice', producto);
    };

    obtenerCantidadProducto(producto) {
        return cy.xpath(this.productoCantidad).contains('p#productAmount', producto);
    };
    obtenerPrecioTotal(cantidad,precio) {
        return cy.xpath(this.precioTotal).contains('p#totalPrice', cantidad*precio);
    };
   
};