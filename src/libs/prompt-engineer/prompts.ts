// export an array of constants which can import directly in other files

const Prompts = {
    GENERATE_DEFINITIONS: `
        Generate a JSON object containing definitions for a given English word, including multiple definitions if applicable.
        For each definition, provide the English word, its part of speech, International Phonetic Alphabet (IPA) notation for both British and American pronunciations, an English definition, the Vietnamese meaning, and an example sentence using the word in context. Each definition should be a separate object within an array under the key "definitions".
        
        # Output Format
        The response must be a JSON object structured as follows:
        - "definitions": An array that includes one or more objects, each representing a definition of the word.
        - Each object within the array should include the following fields:
        - "word": The English word being defined.
        - "partOfSpeech": The part of speech, denoted with abbreviations (e.g., "n.", "v.").
        - "ipaUk": The IPA notation for British English pronunciation.
        - "ipaUs": The IPA notation for American English pronunciation.
        - "definition": The English definition of the word.
        - "meaningVi": The Vietnamese meaning of the word.
        - "exampleSentence": An example sentence demonstrating the word's usage in context.
        
        # Examples

        **Input:**
        \`\`\`
            (word: "contract")
        \`\`\`

        **Expected Output:**
        \`\`\`json
            {
                "definitions": [
                    {
                    "word": "contract",
                    "partOfSpeech": "n.",
                    "ipaUk": "/ˈkɒntrækt/",
                    "ipaUs": "/ˈkɑːntrækt/",
                    "definition": "An official written agreement between two or more people, stating what each will do.",
                    "meaningVi": "hợp đồng",
                    "exampleSentence": "They signed a three-year contract with the company."
                    },
                    {
                    "word": "contract",
                    "partOfSpeech": "v.",
                    "ipaUk": "/kənˈtrækt/",
                    "ipaUs": "/kənˈtrækt/",
                    "definition": "To make a legal agreement with someone for them to work for you or provide you with a service.",
                    "meaningVi": "ký hợp đồng",
                    "exampleSentence": "The company has contracted him to work on the project."
                    },
                    {
                    "word": "contract",
                    "partOfSpeech": "v.",
                    "ipaUk": "/kənˈtrækt/",
                    "ipaUs": "/kənˈtrækt/",
                    "definition": "To become smaller or shorter, or to make something do this.",
                    "meaningVi": "co lại, thu nhỏ",
                    "exampleSentence": "The muscle contracts when you raise your arm."
                    }
                ]
            }
        \`\`\`

        # Notes

        - Include accurate IPA notations for both UK and US pronunciations where available.
        - Ensure that each definition is contextually suitable and accurate.
        - Provide the correct part of speech and Vietnamese translation for each meaning.
        - Example sentences should illustrate the word's usage clearly and effectively.
    `,
};

export const { GENERATE_DEFINITIONS } = Prompts;