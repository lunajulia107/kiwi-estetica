import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import CustomDatePicker from "../components/CustomDatePicker.jsx";
import IconRow from "../components/IconRow.jsx";
import FormField from "../components/FormField.jsx";

const Agendar = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "",
    procedure: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});

  const [availableTimes] = useState([
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ]);

  const [submissionMessage, setSubmissionMessage] = useState({
    text: "",
    type: "",
  });

  const [occupiedTimes, setOccupiedTimes] = useState([]);
  const [fullyBookedDates, setFullyBookedDates] = useState([]);

  const proceduresByCategory = {
    "Procedimentos corporais": [
      "Carboxiterapia",
      "Drenagem Linfática",
      "Lipocavitação",
      "Massagem Modeladora",
      "Massagem Nutritiva e Esfoliante",
      "Massagem Relaxante",
      "Protocolo Redux Duo",
      "Tratamento de Manchas",
    ],
    "Procedimentos faciais": [
      "Limpeza de pele duo",
      "Limpeza de pele normal",
      "Massofilaxia facial",
      "Peelings",
      "Revitalização e nutrição facial",
      "Tratamento para manchas, lábios e olhos",
      "Tratamento rejuvenescedor",
      "Tratamentos com LED Terapêutico",
    ],
    "Terapias complementares": ["Acupuntura", "Cromoterapia"],
  };

  const applyPhoneMask = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? applyPhoneMask(value) : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmissionMessage({ text: "", type: "" });
  };

  const handleDateChange = (isoDate) => {
    setFormData((prev) => ({ ...prev, date: isoDate, time: "" }));
    setErrors((prev) => ({ ...prev, date: "" }));
    setSubmissionMessage({ text: "", type: "" });
  };

  const handleTimeChange = (time) => {
    setFormData((prev) => ({ ...prev, time }));
    setErrors((prev) => ({ ...prev, time: "" }));
    setSubmissionMessage({ text: "", type: "" });
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        message = !value.trim()
          ? "Insira seu nome."
          : !/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,}$/.test(value)
          ? "Nome inválido."
          : "";
        break;

      case "phone":
        message = !value.trim()
          ? "Insira seu celular."
          : !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)
          ? "Formato inválido."
          : "";
        break;

      case "category":
        message = !value ? "Selecione uma categoria." : "";
        break;

      case "procedure":
        message = !value ? "Selecione um procedimento." : "";
        break;

      case "date":
        message = !value ? "Insira uma data." : "";
        break;

      case "time":
        message = !value ? "Selecione um horário." : "";
        break;

      default:
        break;
    }

    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let valid = true;

    for (const key of ["name", "phone", "category", "procedure", "date", "time"]) {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        valid = false;
      }
    }

    setErrors(newErrors);

    if (!valid) {
      setSubmissionMessage({
        text: "Preencha os campos corretamente.",
        type: "danger",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/agendar",
        formData
      );

      window.open(response.data.whatsappLink, "_blank");

      setSubmissionMessage({
        text: response.data.message,
        type: "success",
      });

      setFormData({
        name: "",
        phone: "",
        category: "",
        procedure: "",
        date: "",
        time: "",
      });

      setOccupiedTimes([]);

      if (fetchFullyBookedDates.current) {
        fetchFullyBookedDates.current();
      }
    } catch (err) {
      console.error(err);

      setSubmissionMessage({
        text:
          err.response?.data?.message ||
          "Erro ao agendar. Tente novamente.",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    const fetchOccupiedTimes = async () => {
      if (!formData.date) {
        setOccupiedTimes([]);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/horarios-ocupados?date=${formData.date}`
        );

        setOccupiedTimes(res.data.horariosOcupados);
      } catch {
        setOccupiedTimes([]);
      }
    };

    fetchOccupiedTimes();
  }, [formData.date]);

  const fetchFullyBookedDates = useRef(null);

  useEffect(() => {
    fetchFullyBookedDates.current = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/datas-completamente-ocupadas"
        );
        setFullyBookedDates(res.data.datasOcupadas);
      } catch {
        setFullyBookedDates([]);
      }
    };

    fetchFullyBookedDates.current();
  }, []);

  return (
    <div
      className="text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/mulher-agendando.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="align-items-start d-flex flex-column justify-content-center p-4 w-100">
        <div className="container pb-5 pt-5">
          <div className="gap-5 pb-0 pb-md-5 pt-0 pt-md-5 row">
            <div className="col-lg-7 d-flex flex-column gap-5 justify-content-between">
              <header className="d-flex flex-column gap-2">
                <h1 className="display-4 fw-medium">
                  Você merece esse <span className="fw-bold">momento.</span>
                </h1>

                <p className="fw-normal lead w-75">
                  A Kiwi vai além da estética, é um convite para você florescer,
                  com cuidado, carinho e respeito à sua beleza natural.
                </p>
              </header>

              <div className="d-flex flex-column gap-2">
                <IconRow
                  icon="bi bi-whatsapp"
                  as="a"
                  className="text-decoration-none text-white"
                  href="https://wa.me/5511987654321"
                >
                  (11) 98765-4321
                </IconRow>

                <IconRow icon="bi bi-geo-alt-fill">
                  Centro Comercial, 138 - Alphaville, SP.
                  <br />
                  CEP: 06454-150. Seg à Sáb - Das 9h às 18h.
                </IconRow>

                <IconRow
                  icon="bi bi-envelope-fill"
                  as="a"
                  className="text-decoration-none text-white"
                  href="mailto:kiwiestetica@gmail.com"
                >
                  kiwiestetica@gmail.com
                </IconRow>
              </div>
            </div>

            <article className="col-lg-4">
              <div className="bg-white p-3 p-lg-4 rounded-4">
                <h3 className="fw-bold mb-2 text-center text-forest-green">
                  Agendamento
                </h3>

                <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
                  <FormField
                    label="Nome"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />

                  <FormField
                    label="Celular"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                  />

                  <FormField
                    label="Categoria"
                    name="category"
                    as="select"
                    value={formData.category}
                    onChange={handleChange}
                    error={errors.category}
                    options={Object.keys(proceduresByCategory).sort()}
                  />

                  {formData.category && (
                    <FormField
                      label="Procedimento"
                      name="procedure"
                      as="select"
                      value={formData.procedure}
                      onChange={handleChange}
                      error={errors.procedure}
                      options={
                        proceduresByCategory[formData.category]?.sort() || []
                      }
                    />
                  )}

                  <div>
                    <label className="form-label mb-2 text-forest-green" htmlFor="data">Data</label>
                    <CustomDatePicker
                      selectedDate={formData.date}
                      onDateChange={handleDateChange}
                      disabledDates={fullyBookedDates}
                    />
                    {errors.data && <p className="text-danger mt-1">{errors.data}</p>}
                  </div>

                  <div>
                    <label className="form-label mb-2 text-forest-green">
                      Horário
                    </label>

                    <div className="d-flex flex-wrap gap-2">
                      {availableTimes.map((time, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleTimeChange(time)}
                          disabled={
                            occupiedTimes.includes(time) || !formData.date
                          }
                          className={`btn btn-sm ${
                            formData.time === time
                              ? "btn-brown text-white"
                              : "border text-black"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    {errors.time && (
                      <p className="mt-1 text-danger">{errors.time}</p>
                    )}
                  </div>

                  <div className="d-flex flex-column justify-content-start mb-2">
                    <button className="btn btn-lime-green pe-4 ps-4 text-white">
                      Agendar agora
                    </button>

                    {submissionMessage.text && (
                      <p
                        className={`mt-2 text-center ${
                          submissionMessage.type === "success"
                            ? "text-forest-green"
                            : "text-danger"
                        }`}
                      >
                        {submissionMessage.text}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agendar;


