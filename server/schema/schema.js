const graphql = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const _dummyBooks = [
  { name: 'Meditations', genre: 'Philosophy', id: '1', authorId: '1' },
  { name: 'The Discourses of Epictetus', genre: 'Philosophy', id: '2', authorId: '2' },
  { name: 'Letters from a Stoic', genre: 'Philosophy', id: '3', authorId: '3' },
  { name: 'On the Shortness of Life', genre: 'Philosophy', id: '4', authorId: '3' },
  { name: 'On the Firmness of the Wise Person', genre: 'Philosophy', id: '5', authorId: '3' },
  { name: 'Philosophiae Naturalis Principia Mathematica', genre: 'Physics', id: '6', authorId: '4' },
  { name: 'Dragon Egg', genre: 'Science Fiction', id: '7', authorId: '5' },
  { name: 'Atomic Habits', genre: 'Self Improvement', id: '8', authorId: '6' },
];

const _dummyAuthors = [
  { name: 'Marcus Aurelius', id: '1' },
  { name: 'Arrian', id: '2' },
  { name: 'Seneca the Younger', id: '3' },
  { name: 'Isaac Newton', id: '4' },
  { name: 'Robert L. Forward', id: '5' },
  { name: 'James Clear', id: '6' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({ // it should wrapped in a function so that we can use AuthorType (which has not yet been defined)
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      // here the resolve function gets the Author object corresponding to the parent book
      resolve (parent, args) {
        const { authorId } = parent; // parent is the book returned
        return _dummyAuthors.find(a => a.id === authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      // here the resolve function gets Book objects corresponding to the parent author
      resolve (parent, args) {
        const { id } = parent; // parent is the author returned
        return _dummyBooks.filter(b => b.authorId === id);
      },
    },
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

    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => _dummyBooks,
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => _dummyAuthors,
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
