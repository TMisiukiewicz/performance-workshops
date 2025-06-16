export interface Book {
  id: string;
  title: string;
  authorId: number;
}

export interface Author {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  bookId: number;
  author: string;
  content: string;
}
