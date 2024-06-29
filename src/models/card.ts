export interface Card {
    partitionKey: string;
    rowKey: string;
    module: string;
    topic: string;
    word: string;
    partOfSpeech: string;
    IPA: string;
    meaningVi: string;
    exampleSentence: string;
}