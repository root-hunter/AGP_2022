import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from '../../../../../firebase/firebase'
import {ref, child, get, push, set, DatabaseReference} from "firebase/database";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    const terapista = req.query.terapista
    const paziente = req.query.paziente

    if(terapista && paziente){
        const queryString: string = `a_ricciardi/terapisti/${terapista}/pazientiassociati/`
        const pazientiAssociatiRef: DatabaseReference = ref(database, queryString)

        const queryString2: string = `a_ricciardi/terapisti/${terapista}/numeroPazienti/`
        const numeroPazientiRef: DatabaseReference = ref(database, queryString2)

        get(pazientiAssociatiRef).then(pazientiAssociati =>{
            const array = Object.values(pazientiAssociati.val())
            const matchArray: Array<any> = array.filter(v => (v as any).codiceFiscale === paziente)

            if(matchArray.length > 0){
                res.status(500)
                    .json({status: false})
            }else{
                push(pazientiAssociatiRef, {codiceFiscale: paziente})
                    .then((v) => {
                        get(v)
                            .then(v => {
                                set(numeroPazientiRef, array.length+1)
                                    .then(_ =>{
                                        res.status(200)
                                            .json({status: true, data: v.val(), key: v.key})
                                    })
                                    .catch(e =>{
                                        console.log(e)
                                        res.status(500)
                                            .json({status: false})
                                    })
                            })
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
            }
        })

    }else {
        res.status(404)
            .redirect('/_error')
    }
}
