import { motion } from "framer-motion";

/* ===== animação SOMENTE da experiência ===== */
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
            <header>
              <h2 className="fs-1 fw-medium text-forest-green mb-4">
                Profissional <br />
                <span className="fw-bold">Taís Bonilha</span>
              </h2>
            </header>

            <p className="lead fw-normal mb-4 text-forest-green">
              Esteticista e massoterapeuta dedicada a oferecer cuidados personalizados que valorizam a saúde, a beleza e o bem-estar. 
              Possuo experiência em clínicas renomadas, onde aperfeiçoei técnicas com compromisso e excelência.
              Abri meu próprio espaço para oferecer um <strong>atendimento mais humanizado e individualizado</strong>.
            </p> 
          </div>
        </div>
      </motion.section>

      <section
        className="bg-forest-green py-5 ps-4 pe-4 ps-lg-0 pe-lg-0 text-light"
        aria-label="Formações Acadêmicas"
      >
        <div className="container">
          <div className="align-items-center row py-4">
            <div className="col-12 col-xxl-3 mb-4 mb-xl-0">
              <h2 className="fs-2 fw-bold text-white mb-4">
                Formações <br />
                Acadêmicas 
              </h2> 
            </div>

            <article className="col-12 col-xl-3 col-xxl-3 mb-4 mb-xl-0 border-start border-light border-opacity-10">
              <h4 className="fw-bold mb-0 ps-lg-3">Técnica em Estética e Cosmetologia</h4>
              <p className="mb-0 mt-1 ps-lg-3 small text-lime-green">Centro Universitário Senac</p>
            </article>

            <article className="col-12 col-xl-3 col-xxl-3 mb-4 mb-xl-0 border-start border-light border-opacity-10">
              <h4 className="fw-bold mb-0 ps-lg-3">Tecnóloga em Massoterapia</h4>
              <p className="mb-0 mt-1 ps-lg-3 small text-lime-green">Universidade São Judas Tadeu</p>
            </article>

            <article className="col-12 col-xl-3 col-xxl-3 mb-4 mb-xl-0 border-start border-light border-opacity-10">
              <h4 className="fw-bold mb-0 ps-lg-3">Acupuntura e Terapias Holísticas</h4>
              <p className="mb-0 mt-1 ps-lg-3 small text-lime-green">Instituto IBRAM</p>
            </article>
          </div>
        </div>
      </section>

      <motion.section
        className="container mb-5 mt-5 py-5 position-relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <div className="align-items-center d-flex flex-column flex-lg-row gap-5 position-relative z-1">
          <div className="align-items-start col-lg-6 d-flex flex-column gap-3 text-start">
            <header>
              <h2 className="fs-1 fw-semibold text-forest-green">
                Nosso <span className="fw-bold">Espaço</span> 
              </h2>
            </header>

            <p className="lead fw-normal mb-4 text-forest-green">
              Planejado para proporcionar conforto, segurança e bem-estar desde o primeiro momento. 
              Cada detalhe foi pensado para oferecer uma experiência única e personalizada, 
              onde você pode relaxar e se cuidar com tranquilidade e privacidade.
            </p> 

            <a
              className="btn btn-lime-green fs-5 pe-4 ps-4 rounded-pill text-white"
              href="/sobre-nos"
            >
              Saiba mais
            </a>
          </div>

          <div className="col-lg-6 overflow-hidden position-relative rounded-4">
            <div className="bg-dark bg-opacity-25 h-100 position-absolute start-0 top-0 w-100 rounded-4 z-1"></div>
            <img
              alt="Mulher com sombra no rosto"
              className="img-fluid position-relative w-100"
              src="/images/sobre-nos/spa.png"
            />
          </div>  
        </div>
      </motion.section> 

      {/* ===== ÚNICA SEÇÃO ALTERADA ===== */}
      <section className="d-flex flex-column gap-3 py-5">
        <div className="align-items-start container d-flex flex-column gap-3 text-start">
          <h2 className="fs-1 fw-semibold text-forest-green">
            Experiência <br /> <span className="fw-bold">Profissional</span>
          </h2>

          <p className="badge bg-forest-green fs-6 fw-normal pe-3 ps-3 rounded-4">
            by Taís Bonilha
          </p>
        </div>

        <motion.div
          className="container container-sm-fluid mt-4 px-0"
          variants={experienceContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: true }}
        >
          <div className="g-3 row">
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="col-12 col-md-6 col-lg-4"
                variants={experienceCard}
              >
                <div className="bg-white h-100 p-3 rounded-4 text-forest-green">
                  <img
                    alt={service.title}
                    className="rounded-4"
                    src={service.imageUrl}
                    style={{ objectFit: 'cover', height: '456px' }}
                  />

                  <h5 className="card-title fw-bold mb-1 mt-4 text-uppercase">
                    {service.title}
                  </h5>
                  <p className="fw-normal mb-4 text-start">
                    {service.paragraph}
                  </p> 
                </div> 
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

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
              Um momento de cuidado, equilíbrio e autoestima.
            </h2>
          </div>

          <div className="align-items-center col-12 col-lg-6 d-flex justify-content-start justify-content-lg-end z-1">
            <a
              href="/agendar"
              className="align-items-center btn btn-lg btn-lime-green d-flex gap-2 mt-3 rounded-pill text-white"
            >
              Meu momento
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

export default Sobre;
