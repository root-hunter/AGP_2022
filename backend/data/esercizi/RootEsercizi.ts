import {CategoriaQuiz, TypeCategoriaQuiz} from "./CategoriaQuiz";

export type TypeCategoriaEsercizio = "appartenenza" | "categorizzazione" | "combinazionilettere" |
    "esistenzaparole" | "finaliparole" |
    "fluenzefonologiche" | "fluenzesemantiche" |
    "fluenzeverbali" | "immaginiEparole" |
    "letteremancanti" | "logica" |
    "mesi" | "musica" |
    "orientamentotemporale" | "racconti" |
    "semantica" | "volti" | "prova" | null


export type TypeFactoryCategoriaQuiz<A, R> = {
    arrayCategorie: Array<TypeCategoriaQuiz<A, R>>,
}

export class RootEsercizi<A, R> implements TypeFactoryCategoriaQuiz<A, R>{
    arrayCategorie: Array<CategoriaQuiz<A, R>> = [];

    constructor(opt: TypeFactoryCategoriaQuiz<A, R>) {
        if(Array.isArray(opt.arrayCategorie)){
            for(let k = 0; k < opt.arrayCategorie.length; ++k){
                this.arrayCategorie.push(new CategoriaQuiz<A, R>(opt.arrayCategorie[k]));
            }
        }
    }
}

let test = new RootEsercizi<string, string>({
    arrayCategorie:[{
        categoria: "appartenenza",
        arrayQuiz:[{
            categoria: "appartenenza",
            terapista: null,
            pazienti: null,
            key: null,
            onCheck: null,
            livello: 3,
            titolo: "Prova",
            risposteEsatte:[{
                data: "Woow",
                corretta: false
            }],
            possibiliRisposte:[{
                data: "boo",
                corretta: false
            }]
        }],
        onCheck: (quiz, answare) => {
            return true
        }
    }]
})

console.log(test.arrayCategorie[0].arrayQuiz[0])