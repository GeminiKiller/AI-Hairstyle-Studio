import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64Data: string) => {
  const match = base64Data.match(/^data:(image\/\w+);base64,(.*)$/);
  if (!match) {
    throw new Error('Invalid data URL format');
  }
  const mimeType = match[1];
  const data = match[2];
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
};

export const editImageWithHairstyle = async (
  base64ImageData: string,
  hairstylePrompt: string,
  base64StyleImage?: string,
): Promise<string | null> => {
  try {
    const userImagePart = fileToGenerativePart(base64ImageData);
    // FIX: Add type `any[]` to allow both image and text parts in the array.
    // TypeScript was inferring the type from the first element, causing an error
    // when pushing an object with a different shape.
    const parts: any[] = [userImagePart];

    if (base64StyleImage) {
      const styleImagePart = fileToGenerativePart(base64StyleImage);
      parts.push(styleImagePart);
    }
    
    const finalPrompt = `${hairstylePrompt} IMPORTANT: The output image must have the exact same aspect ratio as the original input image. Do not change the image dimensions.`;
    parts.push({ text: finalPrompt });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts,
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        const mimeType = part.inlineData.mimeType;
        return `data:${mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    return null; 
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
