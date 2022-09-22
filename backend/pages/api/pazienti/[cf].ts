import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from '../../../firebase/firebase'
import { ref, child, get } from "firebase/database";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    const cf = req.query.cf
    const pazientiRef = child(ref(database), 'a_ricciardi/pazienti/')

    get(pazientiRef)
        .then(value => {
        const result = Object.values(value.val())
            .map((v, index) => {
                // @ts-ignore
                v.uid = Object.keys(value.val())[index]
                return v
            })
            // @ts-ignore
            .filter(v => v.codiceFiscale === cf)

        if(result.length > 0){
            res.status(200)
                .json(result[0] as Object)
        }else{
            res.status(500).end()
        }
    })
        .catch(reason => {
            console.log(reason)
            res.status(500).end()
        })
}
