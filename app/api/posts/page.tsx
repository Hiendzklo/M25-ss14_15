import React from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/posts');
  const posts: Post[] = await response.json();

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
