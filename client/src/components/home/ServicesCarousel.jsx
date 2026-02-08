import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import servicesData from '../../json/servicesData.json';
import CarouselButton from '../CarouselButton';
import { ServiceCard } from '../ServiceFlipCard';

function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? servicesData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === servicesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleServices = () => {
    const numCards = servicesData.length;
    const cardsToShow = 4;
    const visible = [];

    for (let i = 0; i < cardsToShow; i++) {
      visible.push(servicesData[(currentIndex + i) % numCards]);
    }

    return visible;
  };

  return (
    <motion.section
      className="d-flex flex-column gap-3 py-5"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.4 }}
      transition={{ duration: 0.7 }}
    >
      <div className="align-items-start container d-flex flex-column gap-3 text-start">
        <h2 className="fs-1 fw-semibold text-forest-green">
          Nossos principais <br />
          <span className="fw-bold">Tratamentos & Terapias</span>
        </h2>

        <div className="d-flex flex-row justify-content-between w-100">
          <p className="bg-forest-green d-flex p-2 pe-3 ps-3 rounded-5 text-white">
            by Taís Bonilha
          </p> 
          <div className="align-items-center d-flex flex-row gap-2 justify-content-between">
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
          </div> 
        </div>
      </div>

      <div className="container container-sm-fluid mt-4 overflow-hidden px-0">
        <div className="flex-nowrap row">
          {getVisibleServices()
            .slice(0, 6)
            .map(({ id, title, category, imageUrl, indication, link }) => (
              <ServiceCard
                key={id}
                service={{ id, title, category, imageUrl, indication, link }}
                className="col-12 col-lg-4 col-md-6"
                style={{ transition: "all 0.5s ease" }} 
              />
            ))} 
        </div>
      </div>
    </motion.section>
  );
}

export default ServicesCarousel;