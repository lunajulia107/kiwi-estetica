import React from "react";
import { motion } from "framer-motion";
import ServicesCarousel from "../components/ServicesCarousel.jsx";
import CustomersCarousel from "../components/CustomersCarousel.jsx";

const Home = () => {
  return (
    <>
      <motion.section
        className="mb-5 position-relative"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.7 }}
        style={{
          backgroundImage: "url('/images/home/mulher-cacheada-desktop2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "672px",
        }}
      >
        <div className="bg-dark bg-opacity-25 h-100 position-absolute start-0 top-0 w-100"></div>

        <div className="p-3 position-absolute text-white top-50 translate-middle-y w-100">
          <div className="container text-center text-xl-start">
            <div className="align-items-center align-items-xl-start col-xl-6 d-flex flex-column gap-3">
              <h1 className="display-4 fw-medium">
                <span className="fw-bold">Cuidar</span> de si é revelar sua{" "}
                <span className="fw-bold">beleza única</span>
              </h1>
              <p className="fw-normal lead">
                Tratamentos naturais que realçam sua beleza complementados por
                terapias que promovem equilíbrio e cuidado.
              </p>

              <button
                className="align-items-center btn btn-lime-green d-flex fs-5 gap-2 mt-3 rounded-pill text-white"
                type="button"
              >
                Cuide-se hoje
                <span
                  className="align-items-center bg-white d-inline-flex justify-content-center rounded-circle text-lime-green"
                  style={{
                    width: "32px",
                    height: "32px",
                    transform: "rotate(-45deg)",
                  }}
                >
                  <i className="bi bi-arrow-right-short fs-4"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="position-relative py-5"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container align-items-center d-flex flex-column gap-3 text-center">
          <h2 className="fs-1 fw-semibold text-forest-green">
            Conheça o nosso <span className="fw-bold">SPA</span>
          </h2>
          <p className="lead fw-normal text-forest-green">
            Um espaço dedicado a valorizar sua{" "}
            <span className="fw-semibold">autoestima</span> e renovar sua energia,
            com tratamentos e terapias{" "}
            <span className="fw-semibold">revitalizantes</span>.
          </p>
 
          <div className="bg-forest-green d-flex flex-column-reverse flex-xl-row gap-3 justify-content-between mt-4 overflow-hidden p-4 position-relative rounded-4 w-100">
            <div className="position-absolute start-0 top-0 w-100 h-100 bg-dark bg-opacity-25 z-1"></div>

            <div className="align-items-start d-flex flex-column gap-3 p-4 position-relative text-start text-white" style={{ zIndex: 2 }}>
              <h3 className="fs-2 fw-semibold">
                Celebre sua autoestima <br /> em cada momento
              </h3>

              <p>Agende seu momento e valorize-se ainda mais com a gente.</p>

              <div className="d-flex flex-column gap-2">
                <p className="align-items-center d-flex gap-2">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span>Centro Comercial, 138 - Alphaville, SP</span>
                </p>
                <p className="align-items-center d-flex gap-2">
                  <i className="bi bi-clock-fill"></i>
                  <span>Seg a Sáb: 9h às 18h</span>
                </p>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-lg-start mt-3">
                <a
                  className="btn btn-lime-green d-flex flex-row fs-5 gap-2 rounded-pill text-white"
                  href="/agendar"
                >
                  Meu momento
                  <span
                    className="align-items-center bg-white d-inline-flex justify-content-center pe-3 ps-3
                    rounded-circle text-lime-green"
                    style={{
                      width: "32px",
                      height: "32px",
                      transform: "rotate(-45deg)",
                    }}
                  >
                    <i className="bi bi-arrow-right-short fs-4"></i>
                  </span>
                </a>
                <a
                  className="btn btn-border-lime-green fs-5 pe-3 ps-3 rounded-pill text-lime-green"
                  href="/catalogo"
                >
                  Ver opções
                </a>
              </div>
            </div>

            <div className="col-12 col-lg-6 position-relative">
              <img
                alt="Fachada da clínica com flores rosa e vermelhas"
                className="img-fluid rounded-4 w-100"
                src="/images/home/spa.png"
              />
            </div>
          </div>
        </div>
      </motion.section>
 
      <motion.section
        className="container mb-5 mt-5 py-5 position-relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="align-items-center d-flex flex-column flex-lg-row gap-5 position-relative z-1">
          <div className="col-lg-6 overflow-hidden position-relative rounded-4">
            <div className="bg-dark bg-opacity-25 h-100 position-absolute start-0 top-0 w-100 rounded-4 z-1"></div>
            <img
              alt="Mulher com sombra no rosto"
              className="img-fluid position-relative"
              src="/images/tais.png"
            />
          </div>

          <div className="align-items-start col-lg-6 d-flex flex-column gap-3 text-start">
            <h2 className="fs-1 fw-semibold text-forest-green">
              Kiwi <span className="fw-bold">Estética</span>
            </h2>

            <p className="lead fw-normal mb-4 text-forest-green">
              Mais do que estética, a Kiwi foi criada para que você se cuide
              respeitando sua pele e seu corpo. Por trás de cada detalhe, está{" "}
              <strong className="fw-semibold">Taís Bonilha</strong>, uma profissional
              que une técnica e sensibilidade.
            </p>

            <div>
              <a
                className="btn btn-lime-green d-flex flex-row fs-5 gap-2 pe-3 ps-3 rounded-pill text-white"
                href="/sobre-nos"
              >
                Saiba mais
                <span
                  className="align-items-center bg-white d-inline-flex justify-content-center pe-3 ps-3
                  rounded-circle text-lime-green"
                  style={{
                    width: "32px",
                    height: "32px",
                    transform: "rotate(-45deg)",
                  }}
                >
                  <i className="bi bi-arrow-right-short fs-4"></i>
                </span> 
              </a>
            </div>
          </div>
        </div>
      </motion.section>
 
      <ServicesCarousel />

      <CustomersCarousel />
 
      <motion.section 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: "-24px" }}
        className="container mt-5 section-home" 
      >
        <div className="bg-forest-green d-flex flex-row flex-xl-row gap-4 p-5 position-relative rounded-4 overflow-hidden">
          <div className="background-circles"></div>
          <div className="col-12 col-lg-6 z-1">
            <h2 className="fs-1 fw-bold mb-4 text-start text-white">
              Descubra o equilíbrio que sua pele e mente merecem.
            </h2>
          </div>

          <div className="align-items-center col-12 col-lg-6 d-flex justify-content-start justify-content-lg-end z-1">
            <a
              href="/agendar"
              className="align-items-center btn btn-lg btn-lime-green d-flex gap-2 mt-3 rounded-pill text-white"
            >
              Quero descobrir
              <span
                className="align-items-center bg-white d-inline-flex justify-content-center rounded-circle text-lime-green"
                style={{ 
                  width: '32px',
                  height: '32px',
                  transform: 'rotate(-45deg)',
                }}
              >
                <i className="bi bi-arrow-right-short fs-4"></i>
              </span>
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;
