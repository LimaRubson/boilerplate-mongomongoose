# MongoDB and Mongoose Challenges

This is the boilerplate for the MongoDB and Mongoose lessons. Instructions for completing these lessons start at https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/

# My collaboration in the project:

This code is an implementation of a set of basic CRUD (Create, Read, Update, Delete) operations using Mongoose, which is a library for object modeling in MongoDB for Node.js. Here are explanations for each part of the code:

## Database Connection:
```javascript
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
```
 - #### Loads environment variables from the .env file.
 - #### Connects to the MongoDB database using the URI provided in process.env.MONGO_URI.

## Schema and Model Definition:
```javascript
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});

const Person = mongoose.model('Person', personSchema);
```

 - #### Defines a schema personSchema with fields name, age, and favoriteFoods.
 - #### Creates a model Person based on the schema.

 ## CRUD Operations:

#### - createAndSavePerson: Creates and saves an instance of a person in the database.
#### - createManyPeople: Creates multiple people at once in the database.
#### - findPeopleByName: Finds people by name in the database.
#### - findOneByFood: Finds a person by their favorite food in the database.
#### - findPersonById: Finds a person by ID in the database.
#### - findEditThenSave: Finds a person by ID, adds a favorite food, and saves it in the database.
#### - findAndUpdate: Finds and updates a person by name in the database.
#### - removeById: Removes a person by ID from the database.
#### - removeManyPeople: Removes multiple people by name from the database.
#### - queryChain: Builds a query using method chaining to find people with a specific favorite food.

## Export Models and Functions:
```javascript
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
```

- #### Exports the Person model and CRUD functions for use in other modules.
