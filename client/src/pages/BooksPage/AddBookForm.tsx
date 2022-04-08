import './AddBookForm.css';
import { useState, FormEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { pickBy } from 'lodash-es';
import { addBookMutation } from 'src/queries/add-book-mutation';
import { getAuthorsQuery, AuthorsQueryData } from 'src/queries/get-authors-query';
import { getBooksQuery } from 'src/queries/get-books-query';

export interface AddBookFormProps {
}

export default function AddBookForm(props: AddBookFormProps) {

  const { loading, error, data } = useQuery<AuthorsQueryData>(getAuthorsQuery);

  const [addBookFunction, addBookResult] = useMutation(addBookMutation, {
    refetchQueries: [
      getBooksQuery, // after mutation is done, we re-fetch data using this query
    ],
  });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  console.log('[client/AddBook] rendering', {
    loading,
    error,
    data,
    addBookResult,
    state: { name, genre, authorId }
  });

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawBook = pickBy({ name, genre, authorId }, x => x); // we need to remove all empty properties
    console.log('[client/AddBook] submitting', rawBook);

    // TODO: add validation here
    if (addBookResult.loading) {
      return;
    }

    addBookResult.reset(); // reset errors

    const result = await addBookFunction({
      variables: rawBook,
    });
    console.log('[client/AddBook] result', result);
    return result;
  };

  const displayAuthorOptions = () => {
    if (loading) {
      return <option disabled>Loading Authors...</option>;
    }
    if (!data) { return; }
    return data?.authors.map((a) => {
      return <option value={ a.id } key={ a.id }>{ a.name }</option>;
    });
  }

  return (
    <div className="fixed-banner">
      <div className="fixed-banner-contents">

        <div className="fixed-banner-toolbar">
          <h2 className="mt-0 mb-0">Add a Book</h2>
          <button className="btn btn-icon-light" type="button">
            x
          </button>
        </div>

        <form id="add-book" onSubmit={submitForm}>
          <div className="field">
            <label>Book name</label>
            <input type="text" onChange={ (e) => setName(e.target.value) } />
          </div>
          <div className="field">
            <label>Genre</label>
            <input type="text" onChange={ (e) => setGenre(e.target.value) } />
          </div>
          <div className="field">
            <label>Author</label>
            <select onChange={ (e) => setAuthorId(e.target.value) }>
              <option value="">Select author</option>
              { displayAuthorOptions() }
            </select>
          </div>
          <button className="btn btn-lg btn-primary mt-2" type="submit" disabled={ addBookResult.loading }>
            { addBookResult.loading ? 'Please wait...' : 'Add Book' }
          </button>

          { addBookResult.error &&
            <small className="mt-2 color-danger">
              Error adding book: [{ addBookResult.error.name }] { addBookResult.error.message }
            </small>
          }
        </form>
      </div>
    </div>
  );
}