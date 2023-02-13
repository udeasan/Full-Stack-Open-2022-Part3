const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('The password is missing')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://san:${password}@fullstackdb.okk7gbp.mongodb.net/phoneDB?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
}, { collection: 'persons' });

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then((result) => {
      if (result.length > 0) {
        console.log('Phonebook:');
        result.forEach((person) => {
          console.log(person.name, ' ', person.number);
        })
      } else {
        console.log('The Phonebook is empty');
      }
    })
    .finally(() => {
      mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
  const person = new Person({
    id: 1,
    name: process.argv[3],
    number: process.argv[4]
  })
  person
    .save()
    .then((result) => {
      console.log('Added', result.name, 'number', result.number, 'to the Phonebook!');
    })
    .finally(() => {
      mongoose.connection.close()
    })
}

