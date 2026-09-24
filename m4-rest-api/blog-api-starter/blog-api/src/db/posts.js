export const posts = [
  {
    id: 1,
    title: 'My First Blog',
    content: 'This is my first blog',
    createdAt: new Date().toISOString(),
  },
];
let nextId = posts.length;

export function getNextId() {
  nextId++;
  return nextId;
}

export function resetDb() {
  posts.length = 0;
  nextId = posts.length;
}
