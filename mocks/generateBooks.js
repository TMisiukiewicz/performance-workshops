const fs = require('fs');
const {faker} = require('@faker-js/faker');

const bigData = Array.from({ length: 5000 }, (_, i) => ({
  id: i.toString(),
  title: faker.book.title(),
  authorId: faker.number.int({ min: 1, max: 3000 }).toString(),
}));

fs.writeFileSync(__dirname + '/books.json', JSON.stringify(bigData, null, 2));

console.log('Mock data generated: books.json');
