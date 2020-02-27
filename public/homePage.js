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
            favoritesWidget.setMessage(!response.success, "Баланс пополнен");
        } else {
            favoritesWidget.setMessage(response.success, "Ошибочка вышла!")
        }
    });

moneyManager.conversionMoneyCallback = data =>
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            favoritesWidget.setMessage(!response.success, "Конвертация выполнена!");
        } else {
            favoritesWidget.setMessage(respone.success, "Ошибочка вышла!");
        }
    });

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        console.log("Всё хорошо! :)");
    } else {
        console.log("Возникла ошибка :(")
    }
});

favoritesWidget.addUserCallback = data =>
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(!response.success, "Добавили пользователя!");
        } else {
            favoritesWidget.setMessage(response.success, "Ошибочка вышла!");
        }
    });

favoritesWidget.removeUserCallback = data =>
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(!response.success, "Удалили пользователя!");
        } else {
            favoritesWidget.setMessage(response.success, "Ошибочка вышла!");
        }
    });