import Col from "react-bootstrap/Col";
import "./Card.css";
import StarIcon from "@/assets/images/starXS.png";
export const Card = ({ book }) => {
  const { ISBN, cover, title } = book;
  return (
    <Col className="my-3" xs={12} md={6} xl={4}>
      <img
        className="w-100 h-100 min-h-img"
        src={cover}
        loading="lazy"
        alt={`Cover of book ${title}`}
      />
      <div className="btitle">
        <div className="absol">
          <button onClick={() => console.log(ISBN, title)} className=" btn">
            <img src={StarIcon} className="" alt="Book was read" />
          </button>
        </div>
        <div>
          <button className="btn" title="Add to readed books"></button>
        </div>
        <div className="btitle__overlay">
          <h3 className="">{title}</h3>
        </div>
      </div>
    </Col>
  );
};
