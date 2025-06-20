export interface Book {
  id: string;
  title: string;
  authorId: string;
  publishedDate: string;
  lastRead: string;
}

export interface Author {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  bookId: string;
  author: string;
  content: string;
}
