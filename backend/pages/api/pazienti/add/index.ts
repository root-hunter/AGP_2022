import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from '../../../../firebase/firebase'
import {ref, child, get, push, remove, DatabaseReference} from "firebase/database";

export type FormReactData = {
    codiceFiscale: string
    nome: string
    cognome: string
    eta: string
    dataNascita: string
    luogoResidenza: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    const form: FormReactData = req.body.form

    if(form){
        const queryString: string = `a_ricciardi/pazienti/`
        const pazientiRef: DatabaseReference = ref(database, queryString)

        push(pazientiRef, form)
            .then((v) => {
                get(v)
                    .then(v => res.status(200)
                    .json({status: true, data: v.val(), key: v.key})
                )
                    .catch(e => {
                        console.log(e)
                        res.status(500)
                            .json({status: false})
                    })
            })
            .catch(reason => {
                console.log(reason)
                res.status(500)
                    .json({status: false, error: reason})
            })
    }else {
        res.status(404)
            .redirect('/_error')
    }
}
