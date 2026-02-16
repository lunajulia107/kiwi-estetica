import { useState } from "react";
import { motion } from "framer-motion";

const ServiceCard = ({
  service,
  variants,
  height,
  className,
  maxHeight = "525px",
  minHeight = "300px",
  pageLink = "catalogo",
  linkText = "Mais detalhes"
}) => {
  return (
    <motion.article
      className={className ? `${className}` : ""}
      height={height}
      key={service.id}
      variants={variants}
    >
      <div className="align-items-start bg-white d-flex flex-column h-100 p-3 rounded-4 text-forest-green w-100">
        <figure className="mb-3 w-100">
          <img
            alt={service.title}
            className="card-img-top rounded-4"
            src={service.imageUrl}
            style={{
              maxHeight: maxHeight,
              minHeight: minHeight,
              objectFit: "cover",
              width: "100%",
            }}
          />
        </figure>

        <header className="w-100">
          {service.category && (
            <span className="badge bg-brown fw-medium mb-2 rounded-4">
              {service.category}
            </span>
          )}
          <h3 className="fs-5 mt-2 text-forest-green">{service.title}</h3>
        </header>

        {service.paragraph && (
          <p className="fw-normal mt-2 text-forest-green text-start">
            {service.paragraph}
          </p>
        )}

        {service.indication && (
          <p className="mt-2 text-forest-green italic small">
            <strong>Indicação:</strong> {service.indication}
          </p>
        )}

        <footer className="align-items-center d-flex justify-content-between mt-auto pt-3 w-100">
          <div>
            {service.price && (
              <p className="fs-5 fw-bolder mb-0 text-forest-green">
                R$ {service.price}
              </p>
            )}

            {service.duration && (
              <small className="fw-medium text-forest-green">
                {service.duration}
              </small>
            )}
          </div>

          <a
            className="fw-medium text-decoration-none text-lime-green"
            href={`/${pageLink}#${service.category?.toLowerCase().replace(/\s+/g,"-") || ""}#${service.procedure || ""}`} 
          >
            {linkText}
          </a>
        </footer>
      </div>
    </motion.article>
  );
};

const FlipCard = ({ service, pageLink, linkText }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      role="button"
      style={{
        height: "100%",
        minHeight: "480px",
        perspective: "1000px",
        width: "100%",
      }}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        style={{
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          width: "100%",
        }}
        transition={{ duration: 0.6 }}
      >
        {/* FRONT */}
        <div
          style={{
            backfaceVisibility: "hidden",
            cursor: "pointer",
            height: "100%",
            position: "absolute",
            width: "100%",
          }}
        >
          <ServiceCard className="h-100" service={service} pageLink={pageLink} linkText={linkText} />
        </div>

        {/* BACK */}
        <div
          style={{
            backfaceVisibility: "hidden",
            cursor: "pointer",
            height: "100%",
            position: "absolute",
            transform: "rotateY(180deg)",
            width: "100%",
          }}
        >
          <article className="bg-forest-green d-flex flex-column h-100 p-3 rounded-4 text-white">
            {service.imageUrl && (
              <figure className="mb-3 w-100">
                <img
                  alt={service.title}
                  className="card-img-top rounded-4"
                  src={service.imageUrl}
                  style={{
                    filter: "brightness(75%)",
                    maxHeight: "525px",
                    minHeight: "300px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </figure>
            )}
            <h4 className="h5 mt-2">Descrição</h4>
            <p className="flex-grow-1 mt-2">{service.description}</p>
            <small className="opacity-75 text-center">
              Clique para voltar
            </small>
          </article>
        </div>
      </motion.div>
    </div>
  );
};

export { ServiceCard, FlipCard };