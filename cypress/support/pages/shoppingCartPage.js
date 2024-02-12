export class ShoppingCartPage {

    constructor() {
        this.shoppingCartLink = '[data-cy="goShoppingCart"]'; 
        this.checkoutLink = '#goCheckout';
        this.productoNombre = '//*[@id="productName"]'; 
        this.showTotalPrice = '#price';
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
        return cy.contains(producto).siblings("p#unitPrice");
    };

    obtenerCantidadProducto(producto) {
        return cy.contains(producto).siblings("p#productAmount");
    };
    obtenerPrecioTotal(producto) {
        return cy.contains(producto).siblings("p#totalPrice");
    };
    
    clickShowTotalPrice() {
        cy.contains('button', 'Show total price').click();
    };
    obtenerShowTotalPrice() {
        return cy.get(this.showTotalPrice);
    };

    clickCheckoutLink() {
        cy.get(this.checkoutLink).click();
    };

};