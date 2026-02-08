import { useState } from "react";
import { motion } from "framer-motion";

import servicesData from "../json/servicesData.json"; // JSON com procedimentos
import { FlipCard } from "../components/ServiceFlipCard.jsx";
import CTASection from "../components/CTASection.jsx";


// Criando a lista de categorias únicas
const uniqueCategories = [
  "Todos",
  ...Array.from(new Set(servicesData.map((proc) => proc.category))),
];  

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // USAR servicesData no filtro
  const filteredProcedures = servicesData.filter((proc) => {
    const titleLower = proc.title.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = titleLower.includes(searchLower);

    const matchesCategory =
      selectedCategory === "Todos" || proc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="align-items-center container d-flex flex-column py-4">
        <h2 className="fs-1 fw-medium py-5 text-center text-forest-green">
          Conheça nossos <br /> <span className="fw-bold">Procedimentos & Terapias</span>
        </h2>

        {/* Category Filters */}
        <nav aria-label="Filtros de categorias" className="d-flex flex-wrap gap-2 justify-content-center mb-4">
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
        </nav> 

        <div className="g-3 mb-4 row w-100">
          {filteredProcedures.map((procedure, index) => (
            <motion.div
              key={procedure.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} 
              className="col-12 col-lg-4 col-md-6 mb-4"
              style={{ height: "572px" }}
            >
              <FlipCard service={procedure} />
            </motion.div>
          ))} 
        </div> 
      </section>

      <CTASection
        title={
          <>
            Cuidados <br />
            <span className="fw-bold">Pré-Procedimento</span>
          </>
        }
        text="Antes do tratamento, informe seu histórico de saúde, alergias ou uso de medicação. Evite sol intenso e produtos irritantes na região a ser tratada por 2 dias antes."
        content={
          <ul className="d-flex flex-wrap gap-3 justify-content-start justify-content-xl-center m-0 p-0">
            {[
              { src: "./images/certificados/abihpec.png", alt: "Certificado ABIHPEC", label: "ABIHPEC" },
              { src: "./images/certificados/anvisa.png", alt: "Certificado ANVISA", label: "ANVISA" },
              { src: "./images/certificados/crueltyfree.png", alt: "Certificado Cruelty Free", label: "Cruelty Free" },
              { src: "./images/certificados/iso9001.png", alt: "Certificado ISO 9001", label: "ISO 9001" }
            ].map((cert, index) => (
              <li key={index} className="align-items-center bg-white d-flex flex-column justify-content-center p-3 rounded-4 text-center" style={{ width: "140px", height: "100px" }}>
                <img src={cert.src} alt={cert.alt} className="img-fluid mb-2" style={{ maxHeight: "45px", objectFit: "contain" }} />
                <small className="fw-semibold text-forest-green">{cert.label}</small>
              </li>
            ))}
          </ul>
        }
      /> 
    </>
  );
};

export default Catalogo;