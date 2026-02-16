import React, { useState } from "react";

import FormField from "../../components/FormField";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setFeedbackMessage("");
    setFeedbackType("");

    let isValid = true;

    if (!email) {
      setEmailError("Por favor, digite seu e-mail.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("E-mail inválido.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Por favor, digite sua senha.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres.");
      isValid = false;
    }

    if (!isValid) {
      setFeedbackMessage("Por favor, corrija os erros no formulário.");
      setFeedbackType("error");
      return;
    }

    fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setFeedbackMessage("Login realizado com sucesso! Redirecionando...");
          setFeedbackType("success");

          localStorage.setItem("token", data.token);

          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        } else {
          setFeedbackMessage(data.message || "Credenciais inválidas.");
          setFeedbackType("error");
        }
      })
      .catch((error) => {
        console.error(error);
        setFeedbackMessage("Erro ao conectar com o servidor.");
        setFeedbackType("error");
      });
  };

  return (
    <div className="container-fluid d-flex flex-column-reverse flex-xl-row justify-content-end min-vh-100 p-0">
      <div className="align-items-center col-xl-6 d-flex flex-column justify-content-center p-5 text-forest-green">
        <article
          className="bg-white login p-5 rounded-4 w-100"
          style={{ maxWidth: "452px" }}
        >
          <h2 className="fw-bold mb-3 pt-3 text-center">Login</h2>

          <p className="mb-4 text-center">
            Faça seu login para acessar a área administrativa.
          </p>

          <form className="d-flex flex-column gap-3 pb-3" onSubmit={handleSubmit}>
            <FormField
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />

            <FormField
              label="Senha"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />

            <button className="btn btn-lime-green mt-2 pe-4 ps-4 text-white" type="submit">
              Logar
            </button>

            {feedbackMessage && (
              <p className={`text-center ${feedbackType === "success" ? "text-success" : "text-danger"}`}>
                {feedbackMessage}
              </p>
            )}
          </form>
        </article>
      </div>

      <div className="align-items-center col-xl-6 d-flex justify-content-center overflow-hidden position-relative">
        <img
          alt="Furniture"
          className="h-100 img-fluid login-image object-fit-cover w-100"
          src="/images/login.png"
        />

        <div className="bg-dark h-100 opacity-50 position-absolute start-0 top-0 w-100"></div>
      </div>
    </div>
  );
}

export default Login;
