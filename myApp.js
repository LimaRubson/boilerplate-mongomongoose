require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

// Exportar o modelo Person apenas após a conexão com o banco de dados ser estabelecida
const db = mongoose.connection;
db.once('open', () => {
  console.log('Conexão com o banco de dados estabelecida');

  // Exportar o modelo Person aqui
  exports.PersonModel = Person;
});

const createAndSavePerson = (done) => {
  // Crie uma instância de documento usando o modelo Person
  const personInstance = new Person({
    name: 'John Doe', // Substitua 'John Doe' pelo nome desejado
    age: 25,          // Substitua 25 pela idade desejada
    favoriteFoods: ['Pizza', 'Burger'] // Substitua o array pelos alimentos favoritos desejados
  });

  // Chame o método save() no documento
  personInstance.save((err, data) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Se tudo correr bem, chame o callback com os dados do documento
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  // Use o método create() no modelo Person para criar muitas pessoas
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Se tudo correr bem, chame o callback com os dados do documento
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  // Use o método find() no modelo Person para encontrar pessoas pelo nome
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Se tudo correr bem, chame o callback com os dados encontrados
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  // Use o método findOne() no modelo Person para encontrar uma pessoa pelo alimento
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Se tudo correr bem, chame o callback com os dados da pessoa encontrada
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  // Use o método findById() no modelo Person para encontrar uma pessoa pelo _id
  Person.findById(personId, (err, data) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Se tudo correr bem, chame o callback com os dados da pessoa encontrada
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  // Use o método findById() no modelo Person para encontrar uma pessoa pelo _id
  Person.findById(personId, (err, person) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Adicione "hamburger" à lista de favoriteFoods
    person.favoriteFoods.push("hamburger");

    // Marque o campo favoriteFoods como modificado
    person.markModified('favoriteFoods');

    // Salve a pessoa atualizada
    person.save((err, updatedPerson) => {
      if (err) {
        // Se houver um erro ao salvar, chame o callback com o erro
        return done(err);
      }

      // Se tudo correr bem, chame o callback com os dados da pessoa atualizada
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  // Use o método findOneAndUpdate() no modelo Person para encontrar e atualizar uma pessoa pelo nome
  Person.findOneAndUpdate(
    { name: personName }, // Condição de busca
    { age: 20 }, // Atualização: defina a idade como 20
    { new: true }, // Opções: retorna o documento atualizado
    (err, updatedPerson) => {
      if (err) {
        // Se houver um erro, chame o callback com o erro
        return done(err);
      }

      // Se tudo correr bem, chame o callback com os dados da pessoa atualizada
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  // Use o método findByIdAndRemove() no modelo Person para encontrar e remover uma pessoa pelo _id
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Se tudo correr bem, chame o callback com os dados da pessoa removida
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // Use o método remove() no modelo Person para excluir pessoas com o nome fornecido
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) {
      // Se houver um erro, chame o callback com o erro
      return done(err);
    }

    // Se tudo correr bem, chame o callback com o resultado da operação
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Construir a consulta usando a cadeia de métodos
  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      if (err) {
        // Se houver um erro, chame o callback com o erro
        return done(err);
      }

      // Se tudo correr bem, chame o callback com os dados da consulta
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

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
