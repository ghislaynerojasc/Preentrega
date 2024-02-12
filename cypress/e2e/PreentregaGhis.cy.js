/// <reference types= "cypress" />

import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { ReciptPage } from "../support/pages/reciptPage";

describe("Entrega Final", () => {
    let data;
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const reciptPage = new ReciptPage();
    const baseUrl = 'https://pushing-it.onrender.com';
    
    before(() => {
        cy.fixture('datos').then(datosFixture => {
            data = datosFixture;
        });

        cy.visit('');
        //Hacer una peticion HTTP que registre un nuevo usuario
        cy.request({
            method: "POST",
            url: `${baseUrl}/api/register`,
            body:
            {
                username: 'PushingIT' + Math.floor(Math.random() * 1000),
                password: '123456!',
                gender:'Female',
                year: '1980',
                month: '10',
                day: '22'
            },
        }).then(respuesta => {
            cy.log(respuesta)
            expect(respuesta.status).to.be.equal(201);
            expect(`${respuesta.body.newUser.username}`).exist;
            // Hacer una peticion HTTP que se loguee con el usuario registrado --> se hizo en commands la request
            cy.loginWithAPI(`${respuesta.body.newUser.username}`,'123456!');
            cy.reload();
            });
        homePage.clickOnlineShopLink();
    });

    it('Elegir 1 productos a eleccion y agregarlo 2 veces Elegir otro producto a eleccion y agregarlo 1 vez', () => {
        productsPage.clickSelectproduct(data.productos.producto1.nombreproducto);
        productsPage.clickClosemodal();
        productsPage.clickSelectproduct(data.productos.producto1.nombreproducto);
        productsPage.clickClosemodal();
        productsPage.clickSelectproduct(data.productos.producto2.nombreproducto);
        productsPage.clickClosemodal();
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
        shoppingCartPage.obtenerPrecioTotal(data.productos.producto2.nombreproducto).should('include.text', data.productos.producto2.cantidad*data.productos.producto2.preciouni);
        shoppingCartPage.clickShowTotalPrice();
        shoppingCartPage.obtenerShowTotalPrice().should('include.text', (data.productos.producto1.cantidad*data.productos.producto1.preciouni)+(data.productos.producto2.cantidad*data.productos.producto2.preciouni));
        shoppingCartPage.clickCheckoutLink();
        checkoutPage.completarFormularioPago(data.checkout.nombre,data.checkout.apellido,data.checkout.tarjeta);
        reciptPage.obtenerNombreApellidoRecibo().should('include.text', data.checkout.nombre).and('include.text', data.checkout.apellido);
        reciptPage.obtenerProductosRecibo(data.productos.producto1.nombreproducto).should('include.text', data.productos.producto1.nombreproducto);
        reciptPage.obtenerProductosRecibo(data.productos.producto2.nombreproducto).should('include.text', data.productos.producto2.nombreproducto);
        reciptPage.obtenerTarjetaRecibo().should('include.text', data.checkout.tarjeta);
        reciptPage.obtenerCostoTotalRecibo().should('include.text', (data.productos.producto1.cantidad*data.productos.producto1.preciouni)+(data.productos.producto2.cantidad*data.productos.producto2.preciouni));
    });

    after(() => {
        let usuario;
        //Hacer una peticion HTTP que elimine el usuario registrado
        usuario = window.localStorage.getItem('username');
        cy.request({
            method: "DELETE",
            url: `${baseUrl}/api/deleteuser/${usuario}`
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).to.be.equal(202);
        });
         //Hacer una peticion HTTP que verifique que el usuario fue eliminado
        cy.request({
            method: "GET",
            url: `${baseUrl}/api/user/${usuario}`,failOnStatusCode:false
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).to.be.equal(404);
        });
    });
});
