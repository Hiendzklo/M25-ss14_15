import { NextResponse } from 'next/server';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function GET() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await response.json();
  return NextResponse.json(posts);
}
