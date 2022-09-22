import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from '../../../firebase/firebase'
import { ref, child, get, remove, onChildChanged, onChildRemoved } from "firebase/database";




export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    const pazienti = child(ref(database), `a_ricciardi/pazienti/`)

    get(pazienti)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const keys = Object.keys(snapshot.val())
                const tmp = Object.values(snapshot.val())
                    .map((v, index) => {
                    // @ts-ignore
                    v.id = keys[index];
                    return v
                })
                res.status(200).json(tmp)
            } else {
                res.status(500).end()
            }
    }).catch((error) => {
        console.log(error)
        res.status(500).end()
    });
}
