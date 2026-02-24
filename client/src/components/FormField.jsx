// FormField componente para inputs, selects e textareas com suporte a erros e estilos personalizados.
const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  as = "input",
  options = [],
  placeholder,
  type = "text",
  className = "",
  ...props
}) => {
  const baseClass = `border form-control p-2 ${
    as === "select" ? "form-select" : ""
  } ${error ? "is-invalid" : ""} ${className}`;

  const renderField = () => {
    // SELECT
    if (as === "select") {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClass}
          {...props}
        >
          <option value="">
            {placeholder || "Selecione uma opção"}
          </option>

          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    // TEXTAREA
    if (as === "textarea") {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClass}
          placeholder={placeholder}
          {...props}
        />
      );
    }

    // INPUT (default)
    return (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={baseClass}
        placeholder={placeholder}
        {...props}
      />
    );
  };

  // Renderiza o campo com label e mensagem de erro, se houver.
  return (
    <div>
      {label && (
        <label className="form-label mb-2 text-forest-green" htmlFor={name}>
          {label}
        </label>
      )}

      {renderField()}

      {error && <p className="text-danger mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
