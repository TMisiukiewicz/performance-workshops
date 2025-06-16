const fs = require('fs');
const { faker } = require('@faker-js/faker');

const comments = [];
let commentId = 1;

for (let bookId = 0; bookId < 5000; bookId++) {
  const numComments = faker.number.int({ min: 1, max: 10 });
  for (let i = 0; i < numComments; i++) {
    comments.push({
      id: commentId.toString(),
      bookId: bookId.toString(),
      author: faker.person.fullName(),
      content: faker.lorem.sentence(),
    });
  }
}

fs.writeFileSync(__dirname + '/comments.json', JSON.stringify(comments, null, 2));

console.log('Mock data generated: comments.json');
