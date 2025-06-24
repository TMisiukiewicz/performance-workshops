const fs = require('fs');
const { faker } = require('@faker-js/faker');

const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Biography', 'History', 'Philosophy', 'Poetry'];

const authors = Array.from({ length: 3000 }, (_, i) => ({
  id: (i + 1).toString(),
  name: faker.person.fullName(),
  birthYear: faker.date.between({ from: '1920-01-01', to: '1990-12-31' }).getFullYear(),
  nationality: faker.location.country(),
  primaryGenre: faker.helpers.arrayElement(genres),
  awards: faker.number.int({ min: 0, max: 15 }),
  yearsActive: faker.number.int({ min: 5, max: 50 }),
}));

fs.writeFileSync(__dirname + '/authors.json', JSON.stringify(authors, null, 2));

console.log('Mock data generated: authors.json');
