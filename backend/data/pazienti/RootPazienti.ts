
export interface RootPazientiBehavior {
    toJSON: () => RootPazientiData
}

export type RootPazientiData = {
    codiceFiscale: string,
    nome: string,
    cognome: string,
    dataNascita: string,
    cittaResidenza: string,

}

export type TypeRootPazienti = RootPazientiData & RootPazientiBehavior

