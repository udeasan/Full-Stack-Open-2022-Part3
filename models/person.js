const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to MongoDB...')

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(value) {
        return /\d{8,}|\d{1,3}\d-{1}\d{5,}/.test(value)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
}, { collection: 'persons' })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)