// This file describes the Schema for GraphQL

const graphql = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const dummyBooks = [
  { name: 'Meditations', genre: 'Philosophy', id: '1', authorId: '1' },
  { name: 'The Discourses of Epictetus', genre: 'Philosophy', id: '2', authorId: '2' },
  { name: 'Letters from a Stoic', genre: 'Philosophy', id: '3', authorId: '3' },
  { name: 'On the Shortness of Life', genre: 'Philosophy', id: '4', authorId: '3' },
  { name: 'On the Firmness of the Wise Person', genre: 'Philosophy', id: '5', authorId: '3' },
  { name: 'Philosophiae Naturalis Principia Mathematica', genre: 'Physics', id: '6', authorId: '4' },
  { name: 'Dragon Egg', genre: 'Science Fiction', id: '7', authorId: '5' },
  { name: 'Atomic Habits', genre: 'Self Improvement', id: '8', authorId: '6' },
];
let nextBookID = dummyBooks.length + 1;

const dummyAuthors = [
  { name: 'Marcus Aurelius', id: '1' },
  { name: 'Arrian', id: '2' },
  { name: 'Seneca the Younger', id: '3' },
  { name: 'Isaac Newton', id: '4' },
  { name: 'Robert L. Forward', id: '5' },
  { name: 'James Clear', id: '6' },
];
let nextAuthorID = dummyAuthors.length + 1;

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
        const authorId = parent.authorId + ''; // parent is the book returned
        console.log('[server/app] getting related author', authorId);
        return dummyAuthors.find(a => a.id === authorId);
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
        const id = parent.id + ''; // parent is the author returned
        console.log('[server/app] getting related books', id);
        return dummyBooks.filter(b => b.authorId === id);
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
        const id = args.id + ''; // we can get id from args since this has been defined above
        console.log('[server/app] getting book', id);
        return dummyBooks.find(x => x.id === id);
      },
    },

    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve (parent, args) {
        const id = args.id + '';
        console.log('[server/app] getting author', id);
        return dummyAuthors.find(x => x.id === id);
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        console.log('[server/app] getting all books');
        return dummyBooks;
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        console.log('[server/app] getting all authors');
        return dummyAuthors;
      },
    },

  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    /**
     * addAuthor operation creates a new object of type Author, accepting arguments of name and age
     */
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt, defaultValue: null },
      },
      async resolve (parent, args) {
        console.log('[server/app] adding author', args);
        const author = {
          id: nextAuthorID++ + '',
          name: args.name,
          age: args.age,
        };
        dummyAuthors.push(author);
        console.log('[server/app] added author', author);
        return author;
      }
    },

    /**
     * addAuthor operation creates a new object of type Author, accepting arguments of name and age
     */
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString, defaultValue: null },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        console.log('[server/app] adding book', args);
        const book = {
          id: nextBookID++ + '',
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        };
        dummyBooks.push(book);
        console.log('[server/app] added book', book);
        return book;
      }
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
