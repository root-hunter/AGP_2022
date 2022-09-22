"use strict";
exports.__esModule = true;
var database_1 = require("firebase/database");
var firebase_1 = require("./firebase");
(0, database_1.onChildChanged)((0, database_1.ref)(firebase_1.database, 'a_ricciardi/pazienti/-N73OkmiZ-XEvoFiuWfy/'), function (snapshot) {
    console.log(snapshot.val());
});
