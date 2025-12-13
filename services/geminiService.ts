import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Book } from '../types';

// Initialize the GoogleGenAI client with the API key from process.env.API_KEY.
// As per guidelines, we assume the environment variable is pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type GeneratedBookData = Omit<Book, 'id' | 'title' | 'books2readUrl' | 'coverUrl' | 'createdAt'>;

export const generateBookDetails = async (title: string): Promise<GeneratedBookData> => {
    const prompt = `Para o livro com o título '${title}', crie um conteúdo para um site de autor. O estilo deve ser dark fantasy elegante. Forneça sua resposta como um objeto JSON VÁLIDO e nada mais, sem formatação extra ou markdown. O objeto JSON deve ter as seguintes chaves: "fullSynopsis" (uma sinopse completa e envolvente com cerca de 3-4 parágrafos), "shortSynopsis" (uma sinopse curta e impactante de no máximo 3 linhas), e "firstChapterMarkdown" (o primeiro capítulo fictício do livro, escrito em markdown, com cerca de 500 palavras, contendo parágrafos e diálogos).`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        fullSynopsis: { type: Type.STRING },
                        shortSynopsis: { type: Type.STRING },
                        firstChapterMarkdown: { type: Type.STRING },
                    },
                    required: ["fullSynopsis", "shortSynopsis", "firstChapterMarkdown"],
                }
            }
        });

        if (!response.text) {
          throw new Error("A resposta da API Gemini está vazia.");
        }
        
        const text = response.text.trim();
        const parsedData: GeneratedBookData = JSON.parse(text);
        return parsedData;

    } catch (error) {
        console.error("Erro ao gerar detalhes do livro:", error);
        throw new Error("Não foi possível gerar os detalhes do livro. Verifique a chave da API e a conexão.");
    }
};