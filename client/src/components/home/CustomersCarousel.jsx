import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
 
import customersData from '../../json/customersData.json';
import CarouselButton from '../CarouselButton';

function CustomersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalTime = 5000;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === customersData.length - 1 ? 0 : prevIndex + 1
      );
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`bi bi-star${i < rating ? "-fill" : ""} fs-5 text-warning`}
        aria-label={i < rating ? "Estrela preenchida" : "Estrela vazia"}
      ></span>
    ));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? customersData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === customersData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleCustomers = () => {
    const visible = [];
    const numCards = customersData.length;
    const cardsToShow = 3;

    if (numCards <= cardsToShow) {
      return customersData;
    }

    for (let i = 0; i < cardsToShow; i++) {
      visible.push(customersData[(currentIndex + i) % numCards]);
    }
    return visible;
  };

  return (
    <motion.section
      className="align-items-center container d-flex flex-column gap-3 pe-0 ps-0 py-5"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <header className="align-items-start container d-flex flex-column gap-3 text-forest-green text-start">
        <h2 className="fs-1 fw-semibold">
          O que nossos <span className="fw-bold">clientes</span> dizem
        </h2>

        <div className="d-flex flex-row justify-content-between w-100">
          <p className="fw-normal lead">
            Confira os relatos de quem <span className="fw-semibold">já experimentou</span> nossos cuidados.
          </p>
          {/* Botões de navegação do carrossel */}
          <nav
            aria-label="Navegação do carrossel de depoimentos"
            className="align-items-center d-flex flex-row gap-2 justify-content-between"
          >
            <CarouselButton 
              ariaLabel="Anterior" 
              onClick={goToPrevious} 
              iconClass="bi bi-chevron-left" 
            />
            <CarouselButton 
              ariaLabel="Próximo" 
              onClick={goToNext} 
              iconClass="bi bi-chevron-right" 
            />
          </nav>
        </div>
      </header>

      {/* Carrossel de depoimentos dos clientes */}
      <div className="container-fluid mt-4 overflow-hidden">
        <div className="flex-nowrap justify-content-center row">
          {getVisibleCustomers().map((customer) => (
            <article key={customer.id} className="col-12 col-lg-4 mb-4">
              <div className="bg-pale-sage border-0 card h-100 p-2 rounded-4">
                <div className="card-body d-flex flex-column">
                  <div className="align-items-center d-flex gap-3 mb-3 mt-2">
                    {customer.image ? (
                      <img
                        src={customer.image}
                        alt={customer.name}
                        className="object-fit-cover rounded-circle"
                        style={{ filter: "brightness(75%)", height: "48px", width: "48px" }}
                      />
                    ) : (
                      <div
                        className="align-items-center bg-forest-green d-flex justify-content-center me-3 rounded-circle text-white"
                        style={{ fontSize: "1.5rem", height: "48px", width: "48px" }}
                      >
                        {customer.initial}
                      </div>
                    )}

                    <div className="d-flex flex-column gap-1">
                      <h5 className="fw-semibold text-forest-green">{customer.name}</h5>
                      <div className="align-items-center d-flex flex-row gap-2">
                        {renderStars(customer.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="card-text text-forest-green">"{customer.quote}"</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default CustomersCarousel;