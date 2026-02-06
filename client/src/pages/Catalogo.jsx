import React, { useState } from "react";
import { motion } from "framer-motion";

const procedures = [
  {
    image: "/images/catalogo/hidratacao-facial.png",
    icon: "",
    category: "Facial",
    procedure: "hidratacao-facial",
    title: "Hidratação Facial",
    indication: "Pele ressecada, sem viço ou com aspecto cansado.",
    description:
      "Reposição de água e nutrientes essenciais, melhorando a elasticidade e o brilho natural da pele. Uso de máscaras hidratantes, séruns e massagens suaves.",
    price: "150,00",
  },
  {
    image: "/images/catalogo/limpeza-pele.png",
    icon: "",
    category: "Facial",
    procedure: "limpeza-de-pele",
    title: "Limpeza de Pele",
    indication: "Controle de oleosidade, acne e remoção de cravos.",
    description:
      "Remove impurezas, células mortas e desobstrui os poros. Inclui limpeza, esfoliação, extração de cravos, máscara calmante e hidratação.",
    price: "120,00",
  },
  {
    image: "/images/catalogo/revitalizacao-facial.png",
    icon: "",
    category: "Facial",
    procedure: "revitalizacao-facial-com-vitamina-c",
    title: "Revitalização Facial com Vitamina C",
    indication: "Pele opaca, manchas claras ou sinais iniciais de envelhecimento.",
    description:
      "Aplicação tópica de vitamina C para ação esfoliante, clareadora, uniformização do tom da pele e estímulo natural à produção de colágeno.",
    price: "180,00",
  },  
  {
    image: "/images/catalogo/drenagem-linfatica.png",
    icon: "",
    category: "Corporal",
    procedure: "drenagem-linfatica",
    title: "Drenagem Linfática",
    indication: "Retenção de líquidos, inchaço e melhora da circulação.",
    description:
      "Técnica de massagem com movimentos rítmicos suaves que estimulam o sistema linfático, auxiliando na eliminação de toxinas e redução de inchaços.",
    price: "165,00",
    duration: "Sessão de 1h",
  },
  {
    image: "/images/catalogo/esfoliacao-corporal.png",
    icon: "",
    category: "Corporal",
    procedure: "esfoliacao-corporal",
    title: "Esfoliação Corporal",
    indication:
      "Renovação da pele e preparação para outros tratamentos (hidratação e bronzeamento).",
    description:
      "Remove células mortas e impurezas, deixando a pele mais macia, uniforme e com aparência saudável. Geralmente realizada com creme esfoliante e partículas naturais.",
    price: "100,00",
  },
  {
    image: "/images/catalogo/massagem-relaxante.png",
    icon: "",
    category: "Corporal",
    procedure: "massagem-relaxante",
    title: "Massagem Relaxante",
    indication: "Estresse, tensão muscular e fadiga física.",
    description:
      "Alivia tensões com movimentos suaves e contínuos, promovendo relaxamento, bem-estar e melhora da qualidade do sono.",
    price: "165,00",
    duration: "Sessão de 30min",
  },
  {
    image: "/images/catalogo/acupuntura.png",
    icon: "",
    category: "Terapia",
    procedure: "acupuntura",
    title: "Acupuntura",
    indication: "Alívio de dores, estresse, ansiedade, insônia e problemas musculares.",
    description:
      "Técnica da medicina tradicional chinesa que utiliza agulhas finas em pontos específicos para estimular o equilíbrio energético e melhorar funções do corpo.",
    price: "200,00",
    duration: "Sessão de 1h",
  },
  {
    image: "/images/catalogo/massoterapia.png",
    icon: "",
    category: "Terapia",
    procedure: "massoterapia",
    title: "Massoterapia",
    indication:
      "Relaxamento muscular, alívio de tensões, melhora da circulação e bem-estar físico e mental.",
    description:
      "Conjunto de técnicas de massagem que atuam terapeuticamente no corpo. Pode incluir métodos relaxantes, terapêuticos, modeladores ou esportivos.",
    price: "120,00",
    duration: "Sessão de 1h",
  },
  {
    image: "/images/catalogo/ventosaterapia.png",
    icon: "",
    category: "Terapia",
    procedure: "ventosaterapia",
    title: "Ventosaterapia",
    indication:
      "Dores musculares, pontos de tensão, celulite, retenção de líquidos e osteoartrite.",
    description:
      "Ajuda a aliviar dores, reduzir tensões, estimular a eliminação de toxinas e pode melhorar o aspecto da pele.",
    price: "220,00",
    duration: "Sessão de 1h",
  },
]; 

const uniqueCategories = [
  "Todos",
  ...Array.from(new Set(procedures.map((proc) => proc.category))),
];

const FlipCard = ({ procedure }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ perspective: "1000px", width: "100%", height: "100%", minHeight: "480px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT */}
        <motion.div
          className="align-items-start bg-white d-flex flex-column h-100 p-3 rounded-4 w-100"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            alt={procedure.title}
            className="bg-opacity-25 card-img-top mb-3 rounded-4"
            src={procedure.image}
            style={{ filter: "brightness(75%)", maxHeight: "250px", objectFit: "cover", width: "100%" }}
          />
          <p className="badge bg-brown fw-medium rounded-4">{procedure.category}</p>
          <h5 className="mt-2 text-forest-green">{procedure.title}</h5>
          <p className="flex-grow-1 mt-2 text-forest-green">{procedure.indication}</p>

          <div className="align-items-center d-flex justify-content-between mt-3 w-100">
            <div>
              <h6 className="fs-5 fw-bolder text-forest-green">R$ {procedure.price}</h6>
              {procedure.duration && (
                <small className="fw-medium text-forest-green">{procedure.duration}</small>
              )}
            </div>

            <a
              className="fw-medium text-decoration-none text-lime-green"
              href={`/agendar?categoria=${encodeURIComponent(procedure.category)}&procedimento=${encodeURIComponent(procedure.procedure || "")}`}
              onClick={(e) => e.stopPropagation()}
            >
              Agendar
            </a>
          </div>
        </motion.div>

        {/* BACK */}
        <motion.div
          className="bg-forest-green d-flex flex-column h-100 p-3 rounded-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        >
          <img
            alt={procedure.title}
            className="card-img-top mb-3 rounded-4"
            src={procedure.icon || procedure.image}
            style={{ filter: "brightness(75%)", maxHeight: "250px", objectFit: "cover", width: "100%" }}
          />
          
          <h5 className="mt-2 text-white">Descrição</h5>
          <p className="flex-grow-1 mt-2 text-white">{procedure.description}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProcedures = procedures.filter((proc) => {
    const titleLower = proc.title.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = titleLower.includes(searchLower);

    const matchesCategory =
      selectedCategory === "Todos" || proc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="align-items-center container d-flex flex-column py-5">
        <h2 className="fs-1 fw-medium py-5 text-center text-forest-green">
          Conheça nossos <br /> <span className="fw-bold">Procedimentos & Terapias</span>
        </h2>

        {/* Category Filters */}
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                selectedCategory === cat
                  ? "btn-lime-green text-white"
                  : "border border-lime-green text-forest-green"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div> 

        <ul className="g-4 list-unstyled row w-100">
          {filteredProcedures.map((procedure, index) => (
            <motion.li
              key={procedure.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-lg-4 col-md-6 col-sm-12"
              style={{ display: "flex", height: "auto" }}
            >
              <FlipCard procedure={procedure} />
            </motion.li>
          ))} 
        </ul>
      </div>

      <motion.section
        className="container mt-5"
        style={{ marginBottom: "-24px" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-forest-green d-flex flex-column flex-xl-row gap-4 p-5 position-relative rounded-4 overflow-hidden">
          <div className="background-circles"></div>

          <div
            className="col-12 col-xl-8 d-flex flex-column gap-3 position-relative"
            style={{ zIndex: 1 }}
          >
            <h2 className="fs-1 text-white">
              Cuidados <br />
              <span className="fw-bold">Pré-Procedimento</span>
            </h2>

            <p className="fw-normal lead text-white">
              Antes do tratamento, informe seu histórico de saúde, alergias ou uso de medicação.
              Evite sol intenso e produtos irritantes na região a ser tratada por 2 dias antes.
            </p>
          </div>

          <ul
            className="col-12 col-xl-4 d-flex flex-wrap gap-3 justify-content-start justify-content-xl-center p-0 position-relative"
            style={{ zIndex: 1 }}
          >
            {[
              { src: "./images/catalogo/certificados/abihpec.png", alt: "Certificado ABIHPEC", label: "ABIHPEC" },
              { src: "./images/catalogo/certificados/anvisa.png", alt: "Certificado ANVISA", label: "ANVISA" },
              { src: "./images/catalogo/certificados/crueltyfree.png", alt: "Certificado Cruelty Free", label: "Cruelty Free" },
              { src: "./images/catalogo/certificados/iso9001.png", alt: "Certificado ISO 9001", label: "ISO 9001" }
            ].map((cert, index) => (
              <li
                key={index}
                className="align-items-center bg-white d-flex flex-column justify-content-center p-3 rounded-4 text-center"
                style={{ width: "140px", height: "100px" }}
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="img-fluid mb-2"
                  style={{ maxHeight: "45px", objectFit: "contain" }}
                />
                <small className="fw-semibold text-forest-green">{cert.label}</small>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </>
  );
};

export default Catalogo;
