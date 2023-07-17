import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("El título es requerido"),
  pages: yup
    .number()
    .required("El número de páginas es requerido")
    .positive("El número de páginas debe ser positivo"),
  genre: yup.string().required("El género es requerido"),
  cover: yup
    .string()
    .required("La URL de la portada es requerida")
    .url("La URL de la portada no es válida"),
  synopsis: yup.string().required("La sinopsis es requerida"),
  year: yup
    .number()
    .required("El año es requerido")
    .min(0, "El año debe ser mayor a 0")
    .max(2030, "El año debe ser menor a 2030")
    .positive("El año debe ser positivo"),
});

export const ModalCustom = ({ saveItemLS }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log(data);
    saveItemLS(data);
    reset();
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add book to the list
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Book form</Modal.Title>
        </Modal.Header>
        <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
          <Modal.Body>
            <div className="my-3">
              <label>Título</label>
              <input
                className="form-control"
                type="text"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
            </div>
            <div className="my-3">
              <label>Número de páginas</label>
              <input
                className="form-control"
                type="number"
                {...register("pages")}
              />
              {errors.pages && (
                <p className="text-danger">{errors.pages.message}</p>
              )}
            </div>
            <div className="my-3">
              <label>Género</label>
              <input
                className="form-control"
                type="text"
                {...register("genre")}
              />
              {errors.genre && (
                <p className="text-danger">{errors.genre.message}</p>
              )}
            </div>
            <div className="my-3">
              <label>URL de la portada</label>
              <input
                className="form-control"
                type="text"
                {...register("cover")}
              />
              {errors.cover && (
                <p className="text-danger">{errors.cover.message}</p>
              )}
            </div>
            <div className="my-3">
              <label>Sinopsis</label>
              <textarea className="form-control" {...register("synopsis")} />
              {errors.synopsis && (
                <p className="text-danger">{errors.synopsis.message}</p>
              )}
            </div>
            <div className="my-3">
              <label>Año</label>
              <input
                className="form-control"
                type="number"
                {...register("year")}
              />
              {errors.year && (
                <p className="text-danger">{errors.year.message}</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="reset"
              variant="secondary"
              onClick={() => {
                reset();
                handleClose();
              }}>
              Close
            </Button>
            <Button className="" type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
