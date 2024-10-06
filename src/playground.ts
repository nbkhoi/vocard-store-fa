import OpenAI from "openai";
import { generateDefinitions } from "./libs/WordDefinitionGenerator";
const openai = new OpenAI();
function main() {
  // get word from user input
    const word = 'apple';
    generateDefinitions(word).then(definitions => {
        console.log(definitions);
    });
}
main();