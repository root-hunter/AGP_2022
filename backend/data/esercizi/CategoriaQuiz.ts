import {Quiz, QuizData, TypeQuiz, QuizBehavior, OnFunction} from "./Quiz";
import {TypeCategoriaEsercizio} from "./RootEsercizi";
import {get, push, ref} from "firebase/database";
import {database} from "../../firebase/firebase";

export type CategoriaQuizData<A, R> = {
    arrayQuiz: Array<TypeQuiz<A, R>>
    categoria: TypeCategoriaEsercizio,
}

export type TypeCategoriaQuiz<A, R> = CategoriaQuizData<A, R> & QuizBehavior<A, R>

export class CategoriaQuiz<A, R> implements TypeCategoriaQuiz<A, R>{
    arrayQuiz: Array<Quiz<A, R>>;
    categoria: TypeCategoriaEsercizio;
    onCheck: OnFunction<A, R> = null;

    static getFromFirebase<A, R>(categoria: TypeCategoriaEsercizio, onCheck:OnFunction<A, R>, callback: (categoriaQuiz: CategoriaQuiz<A, R> | null) => void): Quiz<A, R> | void{
        //TODO RITORNO TIPO A SECONDA DELLA CATEGORIA
        get(ref(database, `a_ricciardi/esercizi/${categoria}/`))
            .then(v =>{
                const arrayQuiz = Object.entries(v.val())
                    .map(v => {
                        (v[1] as any).key = v[0]
                        //TODO SET BEHAVIOR
                        return new Quiz<A, R>(v[1] as TypeQuiz<A, R>)
                    }) as Array<Quiz<A, R>>

                callback(new CategoriaQuiz<A, R>({
                    categoria: categoria,
                    arrayQuiz: arrayQuiz,
                    onCheck: onCheck
                }))
            })
            .catch(e =>{
                console.log(e)
                callback(null)
            })
    }

    constructor(opt: TypeCategoriaQuiz<A, R>) {
        this.categoria = opt.categoria

        if(opt.onCheck instanceof Function) this.onCheck = opt.onCheck

        this.arrayQuiz = opt.arrayQuiz.map(v => new Quiz<A, R>({
            titolo: v.titolo,
            risposteEsatte: v.risposteEsatte,
            possibiliRisposte: v.possibiliRisposte,
            livello: v.livello,
            terapista: v.terapista,
            pazienti: v.pazienti,
            categoria: this.categoria,
            key: v.key,
            onCheck: opt.onCheck
        }))
    }

    checkRisposta(quizId: number, answare: R): boolean{
        return this.arrayQuiz[quizId].checkRisposta(answare)
    }

    toJSON(){
        const data: any = {}

        for(let k = 0; k < this.arrayQuiz.length; ++k){
            data[this.arrayQuiz[k].key!] = this.arrayQuiz[k].toJSON()
        }

        return data
    }
}

CategoriaQuiz.getFromFirebase<string, string>('prova', (quiz, answare) => {
    return quiz.possibiliRisposte[0].data === answare
}, categoriaQuiz =>
    console.log(categoriaQuiz?.arrayQuiz[0].checkRisposta("Frutti Autunnali"))
)
