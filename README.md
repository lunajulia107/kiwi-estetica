# 🥝 Projeto: Kiwi Estética - Site

Site desenvolvido para a **Kiwi Estética SPA** com o objetivo de apresentar tratamentos naturais e terapias integrativas que promovem bem-estar, equilíbrio e autocuidado.
A plataforma também inclui um sistema administrativo para gerenciamento de agendamentos.

---

## 📌 Sobre o Projeto

Aplicação **fullstack** composta por:

* **Frontend:** React
* **Backend:** Node.js + Express
* **Banco de Dados:** MySQL
* **Estilização:** Sass

---

## 👤 Área do Cliente

* Visualização de procedimentos por categorias
* Informações do SPA
* Agendamento online

---

## 👩‍💼 Área Administrativa

* Login administrativo seguro
* Dashboard com principais procedimentos e categorias mais solicitadas
* Gerenciamento de agendamentos (pendentes e confirmados)

---

## 🚀 Funcionalidades

* Catálogo de serviços categorizado
* Sistema de agendamento online
* Painel administrativo protegido
* Interface responsiva
* Integração completa frontend + backend
* Envio de confirmação via WhatsApp para cliente e profissional

---

## 🛠 Tecnologias Utilizadas

### Front-end

* **React** — interface dinâmica e componentizada
* **Framer Motion** — animações e transições
* **Axios** — integração com API
* **Sass** — organização e escalabilidade de estilos

### Back-end

* **Node.js** — execução do servidor
* **Express** — estruturação de rotas e API REST
* **MySQL** — persistência de dados estruturados

---

## 🗄 Banco de Dados

O projeto possui um script SQL pronto localizado em:

```
server/db/script.sql
```

Esse arquivo contém toda a estrutura necessária para criação do banco local.

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar repositório

```bash
git clone https://github.com/seu-usuario/kiwi-estetica.git
```

---

### 2️⃣ Instalar dependências

**Client**

```bash
cd client
npm install
```

**Server**

```bash
cd server
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

Criar arquivo `.env` dentro da pasta **server**

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
SECRET_KEY=
WHATSAPP_PROFESSIONAL_NUMBER=
```

---

### 4️⃣ Rodar aplicação

**Back-end**

```bash
cd server
npm run dev
```

**Front-end**

```bash
cd client
npm run start
```

---

## 📸 Fluxos principais

<div align="center">
  <h3>Workflow do Cliente</h3>
  <img src="./client/public/images/fluxo-do-cliente.gif" width="600px">
  <h3>Workflow do Administrado(a)r</h3>
  <img src="./client/public/images/fluxo-do-adm.gif" width="600px">
</div>

---

## &#x20;

## 🤝 Créditos do Projeto

Projeto acadêmico desenvolvido em equipe, com divisão de responsabilidades semelhante a um ambiente profissional. A proposta surgiu da necessidade de facilitar o gerenciamento de agendas, já que ainda é muito comum o uso de métodos manuais, como agendas físicas, o que pode dificultar a organização, visualização e controle de horários.

- 💻 **Desenvolvimento e implementação:** Julia Gomes
- 🎨 **UI Design:** Samara Duarte
- 🔎 **UX Research:** Camila Bonilha
  
---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 💡 Observações

Projeto desenvolvido com foco em:

* Experiência do usuário
* Performance
* Organização de código
