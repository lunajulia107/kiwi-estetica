import { motion } from "framer-motion";

import ActionButton from "../components/ActionButton.jsx";
import IconRow from "../components/IconRow.jsx";
import InfoSection from "../components/InfoSection.jsx";
import ServicesCarousel from "../components/home/ServicesCarousel.jsx";
import CustomersCarousel from "../components/home/CustomersCarousel.jsx";
import CTASection from "../components/CTASection.jsx";

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

        <header className="p-3 position-absolute text-white top-50 translate-middle-y w-100">
          <div className="container text-center text-xl-start">
            <div className="align-items-center align-items-xl-start col-xl-6 d-flex flex-column gap-3">
              <h1 className="display-4 fw-medium">
                <span className="fw-bold">Cuidar</span> de si é revelar sua{" "}
                <span className="fw-bold">beleza única</span>
              </h1>
              <p className="fw-normal lead mb-3">
                Tratamentos naturais que realçam sua beleza complementados por
                terapias que promovem equilíbrio e cuidado.
              </p>

              <ActionButton text="Cuide-se hoje" to="/agendar" />  
            </div>
          </div>
        </header>
      </motion.section>

      <motion.section
        className="position-relative py-5"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="align-items-center container d-flex flex-column gap-3 text-center">
          <h2 className="fs-1 fw-semibold text-forest-green">
            Conheça o nosso <span className="fw-bold">SPA</span>
          </h2>
          <p className="fw-normal lead text-forest-green">
            Um espaço dedicado a valorizar sua{" "}
            <span className="fw-semibold">autoestima</span> e renovar sua energia,
            com tratamentos e terapias{" "}
            <span className="fw-semibold">revitalizantes</span>.
          </p>
 
          <div className="bg-forest-green d-flex flex-column-reverse flex-xl-row gap-3 justify-content-between mt-4 overflow-hidden p-4 position-relative rounded-4 w-100">
            <div className="bg-dark bg-opacity-25 h-100 position-absolute start-0 top-0 w-100 z-1"></div>

            <div className="align-items-start d-flex flex-column gap-3 p-4 position-relative text-start text-white" style={{ zIndex: 2 }}>
              <h3 className="fs-2 fw-semibold">
                Celebre sua autoestima <br /> em cada momento
              </h3>

              <p>Agende seu momento e valorize-se ainda mais com a gente.</p>

              <address className="d-flex flex-column gap-2">
                <IconRow icon="bi bi-geo-alt-fill">Centro Comercial, 138 - Alphaville, SP</IconRow>
                <IconRow icon="bi bi-clock-fill">Seg a Sáb: 9h às 18h</IconRow>  
              </address>

              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-lg-start mt-3"> 
                <ActionButton text="Meu momento" to="/agendar" />  
                <ActionButton text="Ver opções" to="/catalogo" variant="outline" />  
              </div>
            </div>

            <div className="col-12 col-lg-6 position-relative">
              <img
                alt="Espaço do SPA Kiwi Estética."
                className="img-fluid rounded-4 w-100"
                src="/images/home/spa.png"
              />
            </div>
          </div>
        </div>
      </motion.section>
 
      <InfoSection
        title="Kiwi"
        highlight="Estética"
        text="Mais do que estética, a Kiwi foi criada para que você se cuide respeitando sua pele e seu corpo."
        imgSrc="/images/tais.png"
        imgAlt="Foto da Taís Bonilha, fundadora da Kiwi Estética."
        btnText="Cuide-se"
        btnLink="/agendar"
      /> 

      <ServicesCarousel />

      <CustomersCarousel />
 
      <CTASection
        title={
          <>
            Descubra o equilíbrio <br />
            que sua pele e mente merecem
          </>
        }
        content={
          <ActionButton
            className="btn-lg mt-3"
            text="Quero descobrir"
            to="/agendar"
            variant="solid"
          />
        }
      /> 
    </>
  );
};

export default Home;