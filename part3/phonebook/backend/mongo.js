const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)


// not enough argument
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} 

const password = process.argv[2]
const url = `mongodb+srv://fullstackopen:${password}@cluster0.f6hvuwy.mongodb.net/?appName=Cluster0`
    
    // show all
if (process.argv.length === 3) {
    mongoose.connect(url, { family: 4 })
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} 

// add new
    else if (process.argv.length === 5) {
        mongoose.connect(url, { family: 4 })

        const newPerson = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        newPerson.save().then(result => {
            console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
            mongoose.connection.close()
        })
    }






