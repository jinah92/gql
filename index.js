const { ApolloServer, gql } = require("apollo-server");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    bookId: Int
    title: String
    message: String
    author: String
    url: String
  }

  type Mutation {
    addBook(title: String, message: String, author: String, url: String): Book
    editBook(
      bookId: Int
      title: String
      message: String
      author: String
      url: String
    ): Book
    deleteBook(bookId: Int): Book
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    hello: String
    books: [Book]
    book(bookId: Int): Book
  }
`;

const resolvers = {
  Query: {
    // 데이터 전체조회
    books: () => {
      return JSON.parse(readFileSync(join(__dirname, "books.json")).toString());
    },
    // 특정 데이터만 조회
    book: (parent, args, context, info) => {
      const books = JSON.parse(
        readFileSync(join(__dirname, "books.json")).toString()
      );
      return books.find((book) => book.bookId === args.bookId);
    },
  },
  Mutation: {
    // 데이터 추가
    addBook: (parent, args, context, info) => {
      const books = JSON.parse(
        readFileSync(join(__dirname, "books.json")).toString()
      );
      const maxId = Math.max(...books.map((book) => book.bookId));
      const newBook = { ...args, bookId: maxId + 1 };
      writeFileSync(
        join(__dirname, "books.json"),
        JSON.stringify([...books, newBook])
      );

      return newBook;
    },
    // 데이터 수정
    editBook: (parent, args, context, info) => {
      const books = JSON.parse(
        readFileSync(join(__dirname, "books.json")).toString()
      );

      const newBooks = books.map((book) => {
        if (book.bookId === args.bookId) {
          return args;
        } else {
          return book;
        }
      });

      writeFileSync(join(__dirname, "books.json"), JSON.stringify(newBooks));

      return args;
    },
    // 데이터 삭제
    deleteBook: (parent, args, context, info) => {
      const books = JSON.parse(
        readFileSync(join(__dirname, "books.json")).toString()
      );

      const deleted = books.find((book) => book.bookId);
      const newBooks = books.filter((book) => book.bookId !== args.bookId);

      writeFileSync(join(__dirname, "books.json"), JSON.stringify(newBooks));

      return deleted;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, playground: true });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
