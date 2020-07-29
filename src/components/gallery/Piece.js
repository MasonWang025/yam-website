import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import artists from "../../data/artists";
import { visualarts, photos, blm, creativewriting } from "../../data/galleries";

export default function Piece() {
  const notFound = (
    <div className="404 page container text-center display-4">
      <div className="row">
        <div className="col mt-3">
          <span className="theme">404:</span> Not found.
        </div>
      </div>
    </div>
  );
  const pathTokens = useLocation().pathname.split("/");
  const category = pathTokens[2];
  const title = pathTokens[4];

  let data;
  if (category === "visualarts") data = visualarts;
  else if (category === "photography") data = photos;
  else if (category === "blm") data = blm;
  else if (category === "creativewriting") data = creativewriting;

  const piece = data.find((image) => image.imageURL.endsWith(title));
  const artist = artists[piece.artist];
  const otherPiecesByArtist = data.filter((image) => {
    if (image.imageURL !== piece.imageURL) return image.artist === piece.artist;
    return false;
  });

  if (piece)
    return (
      <div className="piece page">
        <div className="main-container container">
          <div className="row d-none d-lg-block">
            <div className="col-12">
              <Link to={`/gallery/${category}`} className="button">
                <i className="fa fa-arrow-left"></i> Back to all
              </Link>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <Link
              to={`/gallery/${category}`}
              className="button d-block d-lg-none"
            >
              <i className="fa fa-arrow-left"></i> Back to all
            </Link>
            <div
              className={
                "col-lg-6 col-12 text-center " +
                (!piece.writing && " text-lg-left")
              }
            >
              <div
                className={
                  "card card-body text-center " +
                  (!piece.writing && " text-lg-left")
                }
              >
                <h1>{piece.title}</h1>
                <h2>
                  By <span className="artist">{piece.artist}</span> (
                  {artist.age})
                </h2>
                <h3>{artist.school}</h3>
                <a
                  href={piece.imageURL}
                  className="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View image <i className="fa fa-external-link-square"></i>
                </a>
                <p className="description">{piece.description}</p>
                {otherPiecesByArtist.length > 0 && (
                  <div className="other">
                    <p className="mb-2">
                      <b>
                        Other pieces by {piece.artist}:
                        <br />
                      </b>
                    </p>
                    {otherPiecesByArtist.map((otherPiece, index) => (
                      <span key={index} className="mb-2 d-inline-block">
                        <Link
                          to={`/gallery/${category}/piece/${
                            otherPiece.imageURL.split("/").slice(-1)[0]
                          }`}
                        >
                          <span className="otherPiece">{otherPiece.title}</span>
                        </Link>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                piece.writing
                  ? "img-col col-12 mt-4"
                  : "img-col col-lg-6 col-12 mt-4 mt-lg-0"
              }
            >
              {piece.writing ? (
                <div className="card px-2 py-4 writing">{piece.writing}</div>
              ) : (
                <a
                  href={piece.imageURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    cloudName="masonwang"
                    publicId={piece.imageURL}
                    className="img-fluid image"
                    style={{ backgroundColor: "#152828" }}
                  />
                </a>
              )}
              {piece.writing && (
                <div className="text-center mt-2">
                  <Link to={`/gallery/${category}`} className="button">
                    <i className="fa fa-arrow-left"></i> Back to all
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else return notFound;
}
