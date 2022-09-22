import {Risposta, TypeRisposta} from "./Risposta";
import {get, push, ref} from "firebase/database";
import {database} from "../../firebase/firebase";
import {TypeCategoriaEsercizio} from "./RootEsercizi";

export type OnFunction<A, R> = ((quiz: Quiz<A, R>, answare: R) => boolean) | null

export interface FirebaseQuery{
    pushToFirebase: () => void
    updateFirebase: () => void
    deleteFromFirebase: () => void
}

export interface QuizBehavior<A, R> {
    onCheck: OnFunction<A, R>
}

export type QuizData<A, R> = {
    titolo: A
    possibiliRisposte: Array<TypeRisposta<R>>
    risposteEsatte: Array<TypeRisposta<R>> | TypeRisposta<R> | null
    livello: number
    terapista: string | null
    pazienti: Array<string> | null
    categoria: TypeCategoriaEsercizio
    key: string | null
}

export type TypeQuiz<A, R> = QuizData<A, R> & QuizBehavior<A, R>

export class Quiz<A, R> implements TypeQuiz<A, R>{
    titolo: A
    possibiliRisposte: Array<Risposta<R>>
    risposteEsatte: Array<Risposta<R>> | Risposta<R> | null
    livello: number
    terapista: string | null
    pazienti: Array<string> | null
    categoria: TypeCategoriaEsercizio
    key: string | null
    onCheck: OnFunction<A, R> = null

    static getFromFirebase<A, R>(categoria: TypeCategoriaEsercizio, uidEsercizio: string): Quiz<A, R> | void{
        get(ref(database, `a_ricciardi/esercizi/${categoria}/${uidEsercizio}/`))
            .then(v =>{
                const quizData = v.val() as TypeQuiz<A, R>
                quizData.key = v.key
                const quiz = new Quiz<A, R>(quizData)

                console.log(quiz)

                return quiz
            })
            .catch(e =>{
                console.log(e)
                return
            })
    }

    constructor(opt: TypeQuiz<A, R>) {
        this.titolo = opt.titolo
        this.livello = opt.livello
        this.terapista = opt.terapista
        this.pazienti = opt.pazienti
        this.categoria = opt.categoria
        this.key = opt.key

        if(opt.onCheck instanceof Function) this.onCheck = opt.onCheck

        if(Array.isArray(opt.risposteEsatte)){
            this.risposteEsatte = opt.risposteEsatte
                .map(v => new Risposta<R>({
                data: v.data,
                corretta: v.corretta
            }))
        }else{
            this.risposteEsatte = opt.risposteEsatte ?  new Risposta<R>({
                data: opt.risposteEsatte.data,
                corretta: opt.risposteEsatte.corretta,
            }) : null
        }

        this.possibiliRisposte = opt.possibiliRisposte
            .map(v => new Risposta<R>({
            data: v.data,
            corretta: v.corretta
        }))
    }

    setOnCheckListener(onCheck: OnFunction<A, R>){
        this.onCheck = onCheck;
    }

    checkRisposta(answare: R): boolean{
        if(this.onCheck instanceof Function){
            return this.onCheck(this, answare)
        }else{
            return false
        }
    }

    pushToFirebase(){
        push(ref(database, `a_ricciardi/esercizi/${this.categoria}/`), this.toJSON())
            .then(value => console.log(value))
            .catch(reason => console.log(reason))
    }

    updateFirebase(){

    }

    toJSON(): QuizData<A, R> | {}{
        const data: any = {}

        data.key = this.key ?? null
        data.possibiliRisposte = this.possibiliRisposte ?? null
        data.risposteEsatte = this.risposteEsatte ?? null
        data.livello = this.livello ?? null
        data.categoria = this.categoria ?? null
        data.titolo = this.titolo
        data.pazienti = this.pazienti ?? null
        data.terapista = this.terapista ?? null

        return data as QuizData<A, R> ?? {}
    }
}




