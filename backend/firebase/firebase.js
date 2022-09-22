"use strict";
exports.__esModule = true;
exports.database = exports.app = void 0;
var firebase_config_1 = require("./firebase.config");
var app_1 = require("firebase/app");
var database_1 = require("firebase/database");
exports.app = (0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
exports.database = (0, database_1.getDatabase)(exports.app);
