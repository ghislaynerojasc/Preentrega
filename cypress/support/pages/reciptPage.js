export class ReciptPage {

    constructor() {
        this.nameText = '#name';
        this.numberCard = 'span#creditCard';
        this.totalPrice = '#totalPrice';
    };

    obtenerNombreApellidoRecibo() {
        return cy.get(this.nameText);
    };

    obtenerProductosRecibo(producto) {
        return cy.contains('p',producto);
    };

    obtenerTarjetaRecibo() {
        return cy.get(this.numberCard);
    };

    obtenerCostoTotalRecibo() {
        return cy.get(this.totalPrice);
    };
};