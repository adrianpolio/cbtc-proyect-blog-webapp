export interface Comment {
  commentId: number;
  comment: string;
  userId: number;
  userName: string;
  blogId: number; 
}

export interface Blog {
  blogId: number;
  title: string;
  description: string;
  blogDate: string;
  userId: number;
  userName: string;
  comments: Comment[];
}
