import { Card } from "@/components/Card/Card";
import { library } from "@/db/books.json";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { ModalCustom } from "@/components/ModalCustom/ModalCustom";
const Main = () => {
  /**
   * @type {Array}
   */
  const [books, setBooks] = useState(library);
  const [genres, setGenres] = useState([]);

  const [hasRenderedBooks, setHasRenderedBooks] = useState(false);
  const [hasRenderedGenres, setHasRenderedGenres] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const chargeGenres = async () => {
    const uniqueGenres = new Set();
    library.forEach(({ book }) => {
      console.log(book.genre);
      if (!uniqueGenres.has(book.genre)) uniqueGenres.add(book.genre);
    });

    if (uniqueGenres.size === 0) throw new Error("No hay generos");
    return uniqueGenres;
  };

  useEffect(() => {
    if (localStorage.getItem("books") !== null) {
      setBooks(JSON.parse(localStorage.getItem("books")));
    } else {
      setBooks(library);
      localStorage.setItem("books", JSON.stringify(library));
    }
    setHasRenderedBooks(true);
  }, [hasRenderedBooks]);
  useEffect(() => {
    if (!hasRenderedGenres) {
      // Verificar si aún no se ha renderizado los géneros

      chargeGenres()
        .then(result => {
          result.forEach(genre => {
            setGenres(prev => [...prev, genre]);
            setHasRenderedGenres(true);
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [hasRenderedGenres]);
  const getFilteredArray = name => {
    const filteredBooks = library.filter(({ book }) => {
      return book.genre.toLowerCase() === name.toLowerCase();
    });
    return filteredBooks;
  };
  const filterByGenre = evt => {
    const books = localStorage.getItem("books");
    if (evt.target.value === "all") {
      setBooks([...books]);
    } else {
      setBooks([...getFilteredArray(evt.target.value)]);
    }
  };
  const saveItemLS = bookHelper => {
    if (bookHelper) {
      const bookH = {
        ...bookHelper,
      };
      bookH.ISBN = crypto.randomUUID();
      console.log();
      books.push({ book: bookH });
      localStorage.setItem("books", JSON.stringify(books));
      setBooks([...books]);
    }
  };

  return (
    <main>
      <h1>Lista de libros</h1>

      <Container>
        <Row>
          <Col className="" xs={12} lg={8}>
            <Row>
              <div className="row  my-3 ">
                <div className="col-12 my-3">
                  <ModalCustom saveItemLS={saveItemLS} />
                </div>
                <div className="col col-lg-6">
                  <Form.Label>Filter by page {rangeValue}</Form.Label>
                  <Form.Range
                    value={rangeValue}
                    onChange={evt => setRangeValue(evt.target.value)}
                    min={Math.min(...library.map(({ book }) => book.pages))}
                    max={Math.max(...library.map(({ book }) => book.pages))}
                  />
                </div>
                <div className="col col-lg-6 form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    onChange={evt => filterByGenre(evt)}
                    aria-label="Floating label select example">
                    <option value="all" defaultValue={true}>
                      Select a genre
                    </option>
                    {hasRenderedGenres
                      ? genres.map(genre => (
                          <option key={genre} value={genre}>
                            {genre} {getFilteredArray(genre).length}
                          </option>
                        ))
                      : ""}
                  </select>
                  <label htmlFor="floatingSelect"> Select a genre</label>
                </div>
              </div>
              {hasRenderedBooks &&
                books.map(({ book }) => {
                  return <Card key={book.ISBN} book={book} />;
                })}
            </Row>
          </Col>
          <Col className="d-none d-lg-block" lg={4}></Col>
        </Row>
      </Container>
    </main>
  );
};

export default Main;
