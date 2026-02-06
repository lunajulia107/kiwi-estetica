import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    initial: "A",
    name: "Alice Rocha",
    rating: 5,
    quote:
      "A limpeza de pele fez toda a diferença pra mim! Estou começando a cuidar mais do meu rosto e adorei a forma como explicaram tudo com clareza e carinho. Me senti super bem acolhida!",
    image: "/images/home/usuarios/alice.png",
  },
  {
    id: 2,
    initial: "C",
    name: "Camila Gutierre",
    rating: 5,
    quote:
      "Tudo muito prático e moderno, exatamente como eu precisava! Desde o agendamento até o procedimento, senti que cada detalhe foi pensado para facilitar nossa rotina. Nota 10!",
    image: "/images/home/usuarios/camila.png",
  },
  {
    id: 3,
    initial: "G",
    name: "Gustavo Rocha",
    rating: 4,
    quote:
      "Com a correria do trabalho, encontrei aqui um momento só meu. Fiz uma massagem relaxante e saí leve, renovado! O ambiente ajuda muito a desligar e cuidar do corpo e da mente.",
    image: "/images/home/usuarios/gustavo.png",
  },
  {
    id: 4,
    initial: "S",
    name: "Samara Duarte",
    rating: 5,
    quote:
      "Procuro sempre cuidar da minha pele e também relaxar. Fiz microagulhamento e uma massagem na mesma semana e me senti transformada! Atendimento completo e super cuidadoso.",
    image: "/images/home/usuarios/samara.png",
  },
  {
    id: 5,
    initial: "T",
    name: "Tereza Cristina",
    rating: 5,
    quote:
      "Fui muito bem acolhida e me senti segura durante todo o atendimento. As informações foram claras e me passaram total confiança. Adorei o resultado e já indiquei para amigas!",
    image: "/images/home/usuarios/tereza.png",
  },
];

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalTime = 5000;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`bi fs-5 text-warning ${i < rating ? "bi-star-fill" : "bi-star"}`}
      ></span>
    ));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    const numCards = testimonials.length;
    const cardsToShow = 3;

    if (numCards <= cardsToShow) {
      return testimonials;
    }

    for (let i = 0; i < cardsToShow; i++) {
      visible.push(testimonials[(currentIndex + i) % numCards]);
    }
    return visible;
  };

  return (
    <motion.section
      className="container d-flex flex-column align-items-center gap-3 pe-0 ps-0 py-5"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container d-flex flex-column align-items-start gap-3 text-start text-forest-green">
        <h2 className="fs-1 fw-semibold">
          O que nossos <span className="fw-bold">clientes</span> dizem
        </h2>

        <div className="d-flex flex-row justify-content-between w-100">
          <p className="fw-normal lead">
            Confira os relatos de quem{" "}
            <span className="fw-semibold">já experimentou</span> nossos cuidados.
          </p>
          <div className="d-flex flex-row align-items-center gap-2 justify-content-between">
            <button
              aria-label="Anterior"
              className="btn btn-border-lime-green d-none d-lg-flex p-2 pb-1 pt-1 rounded-circle text-lime-green"
              onClick={goToPrevious}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              aria-label="Próximo"
              className="btn btn-border-lime-green d-none d-lg-flex p-2 pb-1 pt-1 rounded-circle text-lime-green"
              onClick={goToNext}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4 overflow-hidden">
        <div className="row flex-nowrap justify-content-center">
          {getVisibleTestimonials().map((testimonial) => (
            <div key={testimonial.id} className="col-12 col-lg-4 mb-4">
              <div className="bg-pale-sage border-0 card h-100 p-2 rounded-4">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mt-2 mb-3">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="me-3 rounded-circle object-fit-cover"
                        style={{ filter: "brightness(75%)", width: "48px", height: "48px" }}
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center me-3 rounded-circle bg-forest-green text-white"
                        style={{ width: "48px", height: "48px", fontSize: "1.5rem" }}
                      >
                        {testimonial.initial}
                      </div>
                    )}

                    <div className="d-flex flex-column gap-1">
                      <h5 className="fw-semibold text-forest-green">{testimonial.name}</h5>
                      <div className="d-flex flex-row align-items-center gap-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="card-text text-forest-green">"{testimonial.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default TestimonialCarousel;
