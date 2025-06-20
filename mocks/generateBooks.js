const fs = require('fs');
const {faker} = require('@faker-js/faker');

const bigData = Array.from({ length: 5000 }, (_, i) => ({
  id: i.toString(),
  title: faker.book.title(),
  authorId: faker.number.int({ min: 1, max: 3000 }).toString(),
  publishedDate: faker.date.between({ from: '1900-01-01', to: '2023-12-31' }).toISOString(),
  lastRead: faker.date.between({ from: '2020-01-01', to: '2024-12-31' }).toISOString(),
}));

fs.writeFileSync(__dirname + '/books.json', JSON.stringify(bigData, null, 2));

console.log('Mock data generated: books.json');
