
export class OnlineShopPage {

    constructor() {
        this.closeModalButton = '#closeModal';
    };

    clickSelectproductone(producto) {
        return cy.get(`[name^="${producto}"]`).click();
    };

    clickClosemodal() {
        cy.get(this.closeModalButton).click();
    };
};