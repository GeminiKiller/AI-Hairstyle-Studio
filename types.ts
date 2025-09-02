export interface Hairstyle {
  id: string;
  name: string;
  previewImage: string;
  prompt: string;
  gender: 'female' | 'male' | 'unisex';
}

export interface GenerationHistoryItem {
  id: string;
  generatedImage: string;
  hairstyle: Hairstyle;
}
