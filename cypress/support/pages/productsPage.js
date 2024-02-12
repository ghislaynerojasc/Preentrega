
export class ProductsPage {

    constructor() {
        this.closeModalButton = '#closeModal';
    };

    clickSelectproduct(producto) {
        return cy.get(`[name^="${producto}"]`).click();
    };

    clickClosemodal() {
        cy.get(this.closeModalButton).click();
    };
};