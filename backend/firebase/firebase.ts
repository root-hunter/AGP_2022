import {firebaseConfig} from "./firebase.config";

import type {DatabaseReference} from "firebase/database"
import type {FirebaseApp} from "firebase/app"

import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(app);
