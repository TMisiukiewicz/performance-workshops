const fs = require('fs');
const { faker } = require('@faker-js/faker');

const authors = Array.from({ length: 3000 }, (_, i) => ({
  id: (i + 1).toString(),
  name: faker.person.fullName(),
}));

fs.writeFileSync(__dirname + '/authors.json', JSON.stringify(authors, null, 2));

console.log('Mock data generated: authors.json');
