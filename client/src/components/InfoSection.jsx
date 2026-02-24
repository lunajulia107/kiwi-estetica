import { motion } from "framer-motion";
import ActionButton from "./ActionButton";

// InfoSection é um componente reutilizável para exibir seções de informação com uma imagem, texto e um botão de ação opcional. 
// Ele aceita várias props para personalizar seu conteúdo e layout, incluindo a possibilidade de inverter a ordem dos elementos para uma melhor responsividade. 
// O componente também utiliza animações suaves ao entrar na visualização para melhorar a experiência do usuário.
const InfoSection = ({
  title,
  highlight,
  text,
  imgSrc,
  imgAlt,
  btnText,
  btnLink,
  btnVariant = "solid",
  reverse = false,
}) => {
  return (
    <motion.section
      className="container mb-5 mt-5 position-relative py-5"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <div
        className={`align-items-center d-flex flex-column ${
          reverse ? "flex-lg-row-reverse" : "flex-lg-row"
        } position-relative z-1`}
      >
        {/* Container da Imagem */}
        <figure className="col-lg-6 mb-0 overflow-hidden position-relative rounded-4">
          <div className="bg-dark bg-opacity-25 h-100 position-absolute rounded-4 start-0 top-0 w-100 z-1"></div>
          <img
            alt={imgAlt}
            className="img-fluid position-relative w-100"
            src={imgSrc}
          />
        </figure>

        {/* Container de Texto */}
        <article
          className={`align-items-start col-lg-6 d-flex flex-column gap-3 ${
            reverse ? "mt-5 mt-lg-0" : "ms-0 ms-lg-5 mt-5 mt-lg-0"
          } text-start`}
        >
          <header>
            <h2 className="fs-1 fw-semibold text-forest-green">
              {title}{" "}
              {highlight && <strong className="fw-bold">{highlight}</strong>}
            </h2>
          </header>

          <p className="fw-normal lead mb-4 text-forest-green">{text}</p>

          {btnText && btnLink && (
            <nav aria-label="Ação da seção">
              <ActionButton
                text={btnText}
                to={btnLink}
                variant={btnVariant}
              />
            </nav>
          )}
        </article>
      </div>
    </motion.section>
  );
};

export default InfoSection;