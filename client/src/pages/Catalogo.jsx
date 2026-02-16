import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import servicesData from "../json/servicesData.json";
import { FlipCard } from "../components/ServiceFlipCard.jsx";
import CTASection from "../components/CTASection.jsx";

const normalize = (str) =>
  str
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

const labelize = (slug) =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

const readHashes = () => {
  if (typeof window === "undefined") return [];
  return window.location.hash.split("#").filter(Boolean).map(normalize);
};

const categories = [
  "todos",
  ...Array.from(
    new Set(servicesData.map((s) => normalize(s.category)))
  ).sort(),
];

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  useEffect(() => {
    const syncFromUrl = () => {
      const hashes = readHashes();
      const category = hashes[0] || "todos";
      const slug = hashes[1];

      setSelectedCategory(category);

      if (slug) {
        setTimeout(() => {
          const el = document.getElementById(slug);
          if (el)
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
      }
    };

    syncFromUrl();
    window.addEventListener("hashchange", syncFromUrl);
    return () => window.removeEventListener("hashchange", syncFromUrl);
  }, []);

  const updateUrl = (category, slug = null) => {
    const hash = slug ? `${category}#${slug}` : category;
    window.location.hash = hash;
  };

  const filtered = servicesData.filter((proc) => {
    const matchesSearch = normalize(proc.title).includes(
      normalize(searchTerm)
    );

    const matchesCategory =
      selectedCategory === "todos" ||
      normalize(proc.category) === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="align-items-center container d-flex flex-column py-4">
        <h2 className="fs-1 fw-medium py-5 text-center text-forest-green">
          Conheça nossos <br />
          <span className="fw-bold">Procedimentos & Terapias</span>
        </h2>

        <nav className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                selectedCategory === cat
                  ? "btn-lime-green text-white"
                  : "border border-lime-green text-forest-green"
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                updateUrl(cat);
              }}
              type="button"
            >
              {cat === "todos" ? "Todos" : labelize(cat)}
            </button>
          ))}
        </nav>

        <div className="g-3 mb-4 row w-100">
          {filtered.map((proc, index) => {
            const slug = proc.slug || normalize(proc.title);

            return (
              <motion.div
                key={slug}
                id={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-12 col-lg-4 col-md-6 mb-4"
                style={{ height: "572px" }}
              >
                <div
                  onClick={() => updateUrl(selectedCategory, slug)}
                  style={{ height: "100%" }}
                >
                  <FlipCard
                    service={proc}
                    pageLink="agendar"
                    linkText="Agendar"
                  />
                </div>
              </motion.div>
            );
          })}
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
          <div className="d-flex flex-wrap gap-3 justify-content-start justify-content-xl-center m-0 p-0">
            {[
              { src: "./images/certificados/abihpec.png", label: "ABIHPEC" },
              { src: "./images/certificados/anvisa.png", label: "ANVISA" },
              { src: "./images/certificados/crueltyfree.png", label: "Cruelty Free" },
              { src: "./images/certificados/iso9001.png", label: "ISO 9001" }
            ].map((c, i) => (
              <div
                key={i}
                className="align-items-center bg-white d-flex flex-column justify-content-center p-3 rounded-4 text-center"
                style={{ width: "140px", height: "100px" }}
              >
                <img
                  src={c.src}
                  alt={c.label}
                  className="img-fluid mb-2"
                  style={{ maxHeight: "45px", objectFit: "contain" }}
                />
                <small className="fw-semibold text-forest-green">
                  {c.label}
                </small>
              </div>
            ))}
          </div>
        }
      />
    </>
  );
};

export default Catalogo;
