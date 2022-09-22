import {onChildChanged, onChildRemoved, ref} from "firebase/database";
import {database} from "./firebase";

onChildChanged(ref(database, 'a_ricciardi/pazienti/-N73OkmiZ-XEvoFiuWfy/'), snapshot => {
    console.log(snapshot.val())
})