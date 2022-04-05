const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const _dummyBooks = [
  { name: 'Meditations', genre: 'Philosophy', id: '1' },
  { name: 'The Discourses of Epictetus', genre: 'Philosophy', id: '2' },
  { name: 'Philosophiae Naturalis Principia Mathematica', genre: 'Physics', id: '3' },
  { name: 'Dragon Egg', genre: 'Science Fiction', id: '4' },
  { name: 'Atomic Habits', genre: 'Self Improvement', id: '5' },
];

const _dummyAuthors = [
  { name: 'Marcus Aurelius', id: '1' },
  { name: 'Arrian', id: '2' },
  { name: 'Isaac Newton', id: '3' },
  { name: 'Robert L. Forward', id: '4' },
  { name: 'James Clear', id: '5' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }, // we need to pass an ID as argument so that we know which book it is
      },
      resolve (parent, args) {
        // here we implement code to get data from DB or other source
        const { id } = args; // we can get id from args since this has been defined above
        return _dummyBooks.find(x => x.id === id);
      },
    },

    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve (parent, args) {
        const{ id } = args;
        return _dummyAuthors.find(x => x.id === id);
      },
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
