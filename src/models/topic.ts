import { Edm } from "@azure/data-tables";

export interface Topic {
    partitionKey: string;
    rowKey: string;
    module: string;
    title: string;
    cardCount: number;
}