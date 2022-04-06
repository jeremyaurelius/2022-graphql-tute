// This file describes the Schema for GraphQL

const graphql = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');

// const _dummyBooks = [
//   { name: 'Meditations', genre: 'Philosophy', id: '1', authorId: '1' },
//   { name: 'The Discourses of Epictetus', genre: 'Philosophy', id: '2', authorId: '2' },
//   { name: 'Letters from a Stoic', genre: 'Philosophy', id: '3', authorId: '3' },
//   { name: 'On the Shortness of Life', genre: 'Philosophy', id: '4', authorId: '3' },
//   { name: 'On the Firmness of the Wise Person', genre: 'Philosophy', id: '5', authorId: '3' },
//   { name: 'Philosophiae Naturalis Principia Mathematica', genre: 'Physics', id: '6', authorId: '4' },
//   { name: 'Dragon Egg', genre: 'Science Fiction', id: '7', authorId: '5' },
//   { name: 'Atomic Habits', genre: 'Self Improvement', id: '8', authorId: '6' },
// ];

// const _dummyAuthors = [
//   { name: 'Marcus Aurelius', id: '1' },
//   { name: 'Arrian', id: '2' },
//   { name: 'Seneca the Younger', id: '3' },
//   { name: 'Isaac Newton', id: '4' },
//   { name: 'Robert L. Forward', id: '5' },
//   { name: 'James Clear', id: '6' },
// ];

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
        console.log('[app/server] getting related author', authorId);
        // return _dummyAuthors.find(a => a.id === authorId);
        return Author.findById(authorId);
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
        console.log('[app/server] getting related books', id);
        // return _dummyBooks.filter(b => b.authorId === id);
        return Book.find({ authorId: id });
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
        console.log('[app/server] getting book', id);
        // return _dummyBooks.find(x => x.id === id);
        return Book.findById(id);
      },
    },

    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve (parent, args) {
        const { id } = args;
        console.log('[app/server] getting author', id);
        // return _dummyAuthors.find(x => x.id === id);
        return Author.findById(id);
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        console.log('[app/server] getting all books');
        // return _dummyBooks;
        return Book.find({}); // return all books
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve: (parent, args) => {
        console.log('[app/server] getting all authors');
        // return _dummyAuthors;
        return Author.find({}); // return all authors
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
        name: { type: GraphQLString },
        age: { type: GraphQLInt, defaultValue: null },
      },
      async resolve (parent, args) {
        console.log('[app/server] adding author', args);
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        const result = await author.save(); // returns Promise that resolves new Author object
        console.log('[app/server] added author', result);
        return result;
      }
    },

    /**
     * addAuthor operation creates a new object of type Author, accepting arguments of name and age
     */
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        console.log('[app/server] adding book', args);
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        const result = await book.save();
        console.log('[app/server] added book', result);
        return result;
      }
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
