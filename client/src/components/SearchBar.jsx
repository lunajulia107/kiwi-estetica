import React, { useState, useEffect, useRef } from "react";

const SearchBar = ({ busca, setBusca }) => {
  const [valorInput, setValorInput] = useState(busca);
  const debounceTimeout = useRef(null);

  useEffect(() => { 
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setBusca(valorInput);
    }, 500);
    return () => clearTimeout(debounceTimeout.current);
  }, [valorInput, setBusca]);

  const limparBusca = () => {
    setValorInput("");
    setBusca("");
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
      <input
        aria-describedby="search-icon"
        aria-label="Pesquisar por nome"
        className="form-control"
        onChange={(e) => setValorInput(e.target.value)}
        placeholder="Pesquisar por nome..."
        type="search"
        value={valorInput}
      />
      {valorInput && (
        <button
          aria-label="Limpar pesquisa"
          className="btn btn-outline-secondary"
          onClick={limparBusca}
          type="button"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </form>
  );
};

export default SearchBar;