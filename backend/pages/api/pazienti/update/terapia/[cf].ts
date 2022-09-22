import type { NextApiRequest, NextApiResponse } from 'next'
import {database} from '../../../../../firebase/firebase'
import {ref, onValue, get, set, update, orderByValue, equalTo, DatabaseReference} from "firebase/database";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Object>
) {
    const paziente = req.query.cf as string
    const idTerapia = req.body.idTerapia
    const tipoTerapia = req.body.tipoTerapia
    const newTerapia = req.body.newTerapia

    if(paziente && idTerapia){
        const queryString: string = `a_ricciardi/pazienti/`
        const pazientiRef: DatabaseReference = ref(database, queryString)

        get(pazientiRef)
            .then(pazientiSnapshot =>{
                const pazienti: Array<any> = pazientiSnapshot.val()
                pazientiSnapshot.forEach(child => {
                  if(paziente === child.val().codiceFiscale){
                      const idPaziente = child.key;
                      console.log(queryString+`${idPaziente}/terapie/${tipoTerapia}/${idTerapia}`)
                      const matchPazienteRef = ref(database, queryString+`${idPaziente}/terapie/${tipoTerapia}/${idTerapia}`)
                      update(matchPazienteRef, newTerapia)
                          .then(v => res.status(200)
                              .json({status: true, data:v}))
                          .catch(e => {
                              console.log(e)
                              res.status(500)
                                  .json({status: false})
                          })
                  }
                })
            })
    }else {
        res.status(404)
            .redirect('/_error')
    }
}
