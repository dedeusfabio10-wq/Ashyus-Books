
export interface Book {
  id: string;
  title: string;
  books2readUrl: string;
  amazonUrl?: string;
  coverUrl: string;
  shortSynopsis: string;
  fullSynopsis: string;
  firstChapterMarkdown: string;
  createdAt: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  linkUrl: string;
  position: 'left' | 'right';
  createdAt: string;
}

export interface Release {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}
