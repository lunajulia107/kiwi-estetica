import { motion } from "framer-motion";

import InfoSection from "../components/InfoSection"; 
import CTASection from "../components/CTASection";
import ActionButton from "../components/ActionButton";
import { ServiceCard } from "../components/ServiceFlipCard";

/* ===== Animação SOMENTE da experiência ===== */
const experienceContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const experienceCard = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const services = [ 
  {
    id: 1,
    imageUrl: '/images/catalogo/hidratacao-facial.png',
    title: 'Estética Avançada',
    paragraph: 'Especialização em tratamentos faciais e corporais com foco em rejuvenescimento, hidratação profunda e técnicas não invasivas.',
  },
  {
    id: 2,
    imageUrl: '/images/catalogo/drenagem-linfatica.png',
    title: 'Massoterapia',
    paragraph: 'Formação completa em massagens terapêuticas, relaxantes e drenagem linfática, promovendo equilíbrio entre corpo e mente.'
  },
  {
    id: 3,
    imageUrl: '/images/catalogo/aromaterapia.png',
    title: 'Aromaterapia',
    paragraph: 'Capacitação no uso terapêutico de óleos essenciais para auxiliar no bem-estar físico, emocional e energético.'
  }
];

const Sobre = () => {
  return (
    <> 
      <InfoSection
        title={
          <>
            Profissional <br />
            <span className="fw-bold">Taís Bonilha</span>
          </>
        }
        text="Esteticista e massoterapeuta, dedicada a oferecer cuidados personalizados que valorizam saúde, beleza e bem-estar. 
        Com experiência em clínicas renomadas, abri meu próprio espaço para proporcionar um atendimento mais humanizado e individualizado."
        imgSrc="/images/tais.png"
      /> 
      
      <section
        className="bg-forest-green pe-4 pe-lg-0 ps-4 ps-lg-0 py-5 text-light"
        aria-label="Formações Acadêmicas"
      >
        <div className="container">
          <div className="align-items-center py-4 row">
            <div className="col-12 col-xxl-3 mb-4 mb-xl-0">
              <h2 className="fs-2 fw-bold mb-4 text-white">
                Formações <br />
                Acadêmicas 
              </h2> 
            </div>

            <article className="border-light border-opacity-10 border-start col-12 col-xl-3 col-xxl-3 mb-4 mb-xl-0">
              <h4 className="fw-bold mb-0 ps-lg-3">Técnica em Estética e Cosmetologia</h4>
              <p className="mb-0 mt-1 ps-lg-3 small text-lime-green">Centro Universitário Senac</p>
            </article>

            <article className="border-light border-opacity-10 border-start col-12 col-xl-3 col-xxl-3 mb-4 mb-xl-0">
              <h4 className="fw-bold mb-0 ps-lg-3">Tecnóloga em Massoterapia</h4>
              <p className="mb-0 mt-1 ps-lg-3 small text-lime-green">Universidade São Judas Tadeu</p>
            </article>

            <article className="border-light border-opacity-10 border-start col-12 col-xl-3 col-xxl-3 mb-4 mb-xl-0">
              <h4 className="fw-bold mb-0 ps-lg-3">Acupuntura e Terapias Holísticas</h4>
              <p className="mb-0 mt-1 ps-lg-3 small text-lime-green">Instituto IBRAM</p>
            </article>
          </div>
        </div>
      </section>

      <InfoSection
        title="Nosso"
        highlight="Espaço"
        text="Foi planejado para oferecer conforto, segurança e bem-estar. Cada detalhe garante uma experiência única, onde 
        você pode relaxar e se cuidar com tranquilidade e privacidade."
        imgSrc="/images/sobre-nos/spa.png"
        btnText="Quero relaxar"
        btnLink="/agendar"
        reverse={true}
      />
  
      <section className="d-flex flex-column gap-3 py-5">
        <header className="align-items-start container d-flex flex-column gap-3 text-start">
          <h2 className="fs-1 fw-semibold text-forest-green">
            Experiência <br /> <span className="fw-bold">Profissional</span>
          </h2>

          <p className="bg-forest-green d-flex p-2 pe-3 ps-3 rounded-5 text-white">
            by Taís Bonilha
          </p> 
        </header>

        <motion.div
          className="container container-sm-fluid mt-4 px-0"
          variants={experienceContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: true }}
        >
          <div className="g-3 row">
            {services.map((service) => (
               <ServiceCard
                key={service.id}
                service={service}
                variants={experienceCard}
                className="col-12 col-lg-4 col-md-6 mb-4"
                maxHeight="500px"
                minHeight="500px"
              /> 
            ))}
          </div>
        </motion.div>
      </section>

      <CTASection
        title={
          <>
            Um momento de cuidado, <br />
            equilíbrio e autoestima.
          </>
        }
        content={
          <ActionButton
            className="btn-lg mt-3"
            text="Meu momento"
            to="/agendar"
            variant="solid"
          />
        }
      /> 
    </>
  );
};

export default Sobre;