import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from '../../../../../firebase/firebase'
import {ref, child, get, runTransaction, remove, DatabaseReference} from "firebase/database";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    const terapistaUid = req.query.terapista
    const cf = req.query.paziente

    if(terapistaUid && cf){
        const queryString: string = `a_ricciardi/terapisti/${terapistaUid}/pazientiassociati/`
        const pazientiRef: DatabaseReference = ref(database, queryString)

        get(pazientiRef)
            .then((v) => {
                const pazientiAssociati = v.val()
                if(Array.isArray(pazientiAssociati)){
                    pazientiAssociati.forEach((v, index) =>{
                        if(v.codiceFiscale === cf){
                            remove(ref(database, queryString+`${index}/`))
                            res.status(200)
                                .json({status: true})
                        }else{
                            res.status(500)
                                .json({status: false})
                        }
                    })
                }else{
                    res.status(500)
                        .json({status: false})
                }
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
