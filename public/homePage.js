"use strict"

// import { response } from "express";

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();


logoutButton.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
            console.log("Всё хорошо! :)");
        } else {
            console.log("Возникла ошибка :(");
        }
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        console.log("Всё хорошо! :)")
    } else {
        console.log("Возникла ошибка :(");
    }
});

let rateBoard = function() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
            console.log("Всё хорошо! :)");
        } else {
            console.log("Возникла ошибка :(");
        }
    });
};

rateBoard();
setInterval(rateBoard, 60000);

moneyManager.addMoneyCallback = data =>
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response, data);
            FavoritesWidget.setMessage(!response.success, "Баланс пополнен");
        } else {
            FavoritesWidget.setMessage(response.success, "Ошибочка вышла!")
        }
    });

moneyManager.conversionMoneyCallback = data =>
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            FavoritesWidget.setMessage(!response.success, "Конвертация выполнена!");
        } else {
            FavoritesWidget.setMessage(respone.success, "Ошибочка вышла!");
        }
    });

const FavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        FavoritesWidget.clearTable();
        FavoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        console.log("Всё хорошо! :)");
    } else {
        console.log("Возникла ошибка :(")
    }
});

FavoritesWidget.addUserCallback = data =>
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            FavoritesWidget.clearTable();
            FavoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            FavoritesWidget.setMessage(!response.success, "Добавили пользователя!");
        } else {
            FavoritesWidget.setMessage(response.success, "Ошибочка вышла!");
        }
    });

FavoritesWidget.removeUserCallback = data =>
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            FavoritesWidget.clearTable();
            FavoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            FavoritesWidget.setMessage(!response.success, "Удалили пользователя!");
        } else {
            FavoritesWidget.setMessage(response.success, "Ошибочка вышла!");
        }
    });