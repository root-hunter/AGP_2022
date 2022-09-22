import {
    EsercizioAppartenenza,
    EsercizioCombinazioniLettere,
    EsercizioEsistenzaParole,
    EsercizioFinaliParole
} from '../data/FactoryCategoriaQuiz';
import {CategoriaQuiz} from "../data/CategoriaQuiz";
import {Quiz} from "../data/Quiz";

describe('Testing EsercizioAppartenenza', () => {
    test('Verifica risposta corretta', () => {
        const testEsercizioAppartenenza = new EsercizioAppartenenza({
            categoria: "appartenenza",
            quesiti: new CategoriaQuiz({
                pazienti: null,
                livello: 1,
                terapista: null,
                titolo: "Pere",
                rispostaEsatta: {
                    data: "Frutti Autunnali",
                    corretta: true
                },
                risposte: [{
                    data: "Frutti Autunnali",
                    corretta: true
                }]
            })
        })
        expect(testEsercizioAppartenenza.arrayCategorie.checkRisposta(0, "Frutti Autunnali")).toBe(true);
    });


    let test = new Quiz({
        livello: 1,
        pazienti: null,
        titolo: "Pere",
        terapista: null,
        categoria: "appartenenza",
        rispostaEsatta: {
            data: "Frutti Autunnali",
            corretta: true
        },
        risposte: [{
            data: "Frutti Autunnali",
            corretta: true
        }]
    })


    test.pushToFirebase()
    test('Verifica risposta errata', () => {
        const testEsercizioAppartenenza = new EsercizioAppartenenza({
            categoria: "appartenenza",
            quesiti: new CategoriaQuiz({
                livello: 1,
                pazienti: null,
                titolo: "Pere",
                terapista: null,
                rispostaEsatta: {
                    data: "Frutti Autunnali",
                    corretta: true
                },
                risposte: [{
                    data: "Frutti Autunnali",
                    corretta: true
                }]
            })
        })
        expect(testEsercizioAppartenenza.checkRisposta(0, "Frutti")).toBe(false);
    });

    test('Verifica Esercizio combinazioni di parole', () => {
        const testEsercizioCombinazioni = new EsercizioCombinazioniLettere({
            categoria: "appartenenza",
            quesiti: new CategoriaQuiz({
                pazienti: null,
                titolo: "Pere",
                livello: 3,
                terapista: null,
                rispostaEsatta: {
                    data: "Frutti Autunnali",
                    corretta: true
                },
                risposte: [{
                    data: "A",
                    corretta: true
                },
                    {
                        data: "A",
                        corretta: true
                    },
                    {
                        data: "A",
                        corretta: true
                    }]
            })
        })

        expect(testEsercizioCombinazioni.checkRisposta(0, "aaa")).toBe(true);
    });

    test('Verifica Esercizio combinazioni di parole', () => {
        const r = new EsercizioEsistenzaParole({
            categoria: "appartenenza",
            quesiti: new CategoriaQuiz<string, string>({
                pazienti: [],
                terapista: "3",
                titolo: "Quiz 1",
                livello: 3,
                rispostaEsatta: null,
                risposte: [{
                    data: "Ciao",
                    corretta: true
                }]
            })
        })

        expect(r.checkRisposta(0, "Ciao")).toBe(true);
    });

    test('Verifica Esercizio combinazioni di parole', () => {
        const r = new EsercizioFinaliParole({
            categoria: "appartenenza",
            quesiti: new CategoriaQuiz<string, string>({
                pazienti: [],
                terapista: "3",
                titolo: "Quiz 1",
                livello: 2,
                rispostaEsatta: [{
                    data: "vittoria",
                    corretta: true
                },{
                    data: "felice",
                    corretta: true
                }],
                risposte: [{
                    data: "vitto",
                    corretta: true,
                }, {
                    data: "feli",
                    corretta: true
                }]
            })
        })

        expect(r.checkRisposta(0, 'felice')).toBe(true);
    });
});

