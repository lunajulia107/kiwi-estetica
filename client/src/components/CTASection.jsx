import { motion } from "framer-motion";

// CTASection componente para chamadas à ação, com animação de entrada e opções de personalização. 
// Utilizado próximo ao rodapé.
const CTASection = ({ title, text, content, bgColor = "bg-forest-green", reverse = false }) => {
  return (
    <motion.section
      className="container mt-5"
      style={{ marginBottom: "-24px" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        className={`${bgColor} d-flex flex-column gap-4 overflow-hidden p-5 position-relative rounded-4 ${reverse ? "flex-xl-row-reverse" : "flex-xl-row"}`}
      >
        <div className="background-circles"></div>

        <div className="col-12 col-xl-8 d-flex flex-column gap-3 position-relative" style={{ zIndex: 1 }}>
          {title && <h2 className="fs-1 fw-bold text-white">{title}</h2>}
          {text && <p className="fw-normal lead text-white">{text}</p>}
        </div>

        {content && (
          <div className="align-items-center col-12 col-xl-4 d-flex justify-content-sm-end justify-content-start position-relative" style={{ zIndex: 1 }}>
            {content}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default CTASection;