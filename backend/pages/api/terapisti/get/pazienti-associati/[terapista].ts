import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from '../../../../../firebase/firebase'
import {ref, child, get, push, limitToFirst, DatabaseReference} from "firebase/database";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    const terapista = req.query.terapista

    if(terapista){
        const queryString: string = `a_ricciardi/terapisti/${terapista}/pazientiassociati/`
        const pazientiAssociatiRef: DatabaseReference = ref(database, queryString)

        const queryString2: string = `a_ricciardi/pazienti/`
        const pazientiRef: DatabaseReference = ref(database, queryString2)

        get(pazientiAssociatiRef)
            .then(pazientiAssociati =>{
                const arrayPazientiAssociati = Object.values(pazientiAssociati.val())
                const matchArray: Array<any> = arrayPazientiAssociati
                    .map(v => (v as any).codiceFiscale)

                get(pazientiRef)
                    .then(pazientiSnapshot =>{
                        const arrayPazienti = Object.values(pazientiSnapshot.val())
                            //@ts-ignore
                            .filter(_ => matchArray.includes(_.codiceFiscale))

                        if(arrayPazienti.length > 0){
                            res.status(200)
                                .json(arrayPazienti)
                        }else{
                            res.status(500)
                                .json({status: false})
                        }
                    })
            })
    }else {
        res.status(404)
            .redirect('/_error')
    }
}
