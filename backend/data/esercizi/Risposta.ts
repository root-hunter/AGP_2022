export type TypeRisposta<R> = {
    data: R,
    corretta: boolean
}
export class Risposta<R> implements TypeRisposta<R>{
    data: R
    corretta: boolean

    constructor(opt: TypeRisposta<R>) {
        this.data = opt.data
        this.corretta = opt.corretta
    }
}
