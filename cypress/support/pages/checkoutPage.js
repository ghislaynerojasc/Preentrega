export class CheckoutPage {

    constructor() {
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
        this.purchaseButton = '[data-cy="purchase"]';
    };

    completarFormularioPago(nombre, apellido,tarjeta) {
        cy.get(this.firstNameInput).type(nombre);
        cy.get(this.lastNameInput).type(apellido);
        cy.get(this.cardNumberInput).type(tarjeta);
        cy.get(this.purchaseButton).click();
    };
};