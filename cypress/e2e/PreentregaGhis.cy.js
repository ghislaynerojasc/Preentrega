/// <reference types= "cypress" />

import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import { OnlineShopPage } from "../support/pages/onlineShopPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe("Page Object model", () => {
    let data;
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const onlineShopPage = new OnlineShopPage();
    const shoppingCartPage = new ShoppingCartPage();
    
    before(() => {
        cy.fixture('datos').then(datosFixture => {
            data = datosFixture
        });
    });

    beforeEach(() => {
        cy.visit('')
        cy.get('#registertoggle').dblclick();
        loginPage.escribirUsuario(Cypress.env().usuario)
        loginPage.escribirContraseña(Cypress.env().password)
        loginPage.clickLogIn();
        homePage.clickOnlineShopLink();
    });

    it('Elegir 1 productos a eleccion y agregarlo 2 veces Elegir otro producto a eleccion y agregarlo 1 vez', () => {
        onlineShopPage.clickSelectproductone(data.productos.producto1.nombreproducto);
        onlineShopPage.clickClosemodal();
        onlineShopPage.clickSelectproductone(data.productos.producto1.nombreproducto);
        onlineShopPage.clickClosemodal();
        onlineShopPage.clickSelectproductone(data.productos.producto2.nombreproducto);
        onlineShopPage.clickClosemodal();
        shoppingCartPage.clickShoppingCartLink()
        //Verificar el nombre y precio, precio total y cantidad de los dos productos.
        shoppingCartPage.obtenerProducto(data.productos.producto1.nombreproducto).should('exist');
        shoppingCartPage.obtenerNombreProducto(data.productos.producto1.nombreproducto).should('include.text', data.productos.producto1.nombreproducto);
        shoppingCartPage.obtenerPrecioProducto(data.productos.producto1.nombreproducto).should('include.text', data.productos.producto1.preciouni);
        shoppingCartPage.obtenerCantidadProducto(data.productos.producto1.nombreproducto).should('include.text', data.productos.producto1.cantidad);
        shoppingCartPage.obtenerPrecioTotal(data.productos.producto1.nombreproducto).should('include.text', data.productos.producto1.cantidad*data.productos.producto1.preciouni);
        shoppingCartPage.obtenerProducto(data.productos.producto2.nombreproducto).should('exist');
        shoppingCartPage.obtenerNombreProducto(data.productos.producto2.nombreproducto).should('include.text', data.productos.producto2.nombreproducto);
        shoppingCartPage.obtenerPrecioProducto(data.productos.producto2.nombreproducto).should('include.text', data.productos.producto2.preciouni);
        shoppingCartPage.obtenerCantidadProducto(data.productos.producto2.nombreproducto).should('include.text', data.productos.producto2.cantidad);
        shoppingCartPage.obtenerPrecioTotal(data.productos.producto2.nombreproducto).should('include.text', data.productos.producto2.cantidad*data.productos.producto2.preciouni);;
    });

});