import React, { useState, useEffect, useRef } from "react";

// SearchBar componente com funcionalidade de debounce para otimizar a busca por nome. 
// O debounce evita que a função de busca seja chamada a cada tecla digitada,
// esperando um intervalo de 500ms após a última digitação para executar a busca.
const SearchBar = ({ value, onChange }) => {
  const [valueInput, setValueInput] = useState(value || "");
  const debounceTimeout = useRef(null);

  useEffect(() => { 
    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      onChange(valueInput);
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [valueInput, onChange]);

  const clearSearch = () => {
    setValueInput("");
    onChange("");
  };

  return (
    <form 
      className="input-group w-auto" 
      role="search" 
      onSubmit={(e) => e.preventDefault()}
    >
      <span className="input-group-text" id="search-icon">
        <i aria-hidden="true" className="bi bi-search" /> 
      </span>

      {/* O campo de entrada de pesquisa é acessível, com aria-label para descrever sua função e aria-describedby para associar o ícone de pesquisa. */}
      {/* O botão de limpar pesquisa também é acessível, com aria-label para indicar sua função. A busca é atualizada com debounce para melhorar a performance. */}
      <input
        aria-describedby="search-icon"
        aria-label="Pesquisar por nome"
        className="form-control"
        onChange={(e) => setValueInput(e.target.value)}
        placeholder="Pesquisar por nome..."
        type="search"
        value={valueInput}
      />

      {valueInput && (
        <button
          aria-label="Limpar pesquisa"
          className="btn btn-outline-secondary"
          onClick={clearSearch}
          type="button"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </form>
  );
};

export default SearchBar;