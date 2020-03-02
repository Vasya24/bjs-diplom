"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data =>
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
            console.log("Всё хорошо! :)");
        } else {
            userForm.setLoginErrorMessage("Ой! Неверный логин!");
        }
    });

userForm.registerFormCallback = data =>
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
            console.log("Всё хорошо! :)")
        } else {
            userForm.setRegisterErrorMessage("Возникла ошибка! :(");
        }
    });