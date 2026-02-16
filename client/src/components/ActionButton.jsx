import { useNavigate } from "react-router-dom";

const ActionButton = ({ text, to, variant = "solid", className = "" }) => {
  const navigate = useNavigate();
 
  const baseClass = "align-items-center btn d-flex fs-5 gap-2 justify-content-center pe-3 ps-3 rounded-pill";
   
  const variantClass =
    variant === "solid"
      ? "btn-lime-green text-white"
      : "btn-border-lime-green text-lime-green";

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className={`${baseClass} ${variantClass} ${className}`}
      type="button"
    >
      {text}
      {variant === "solid" && (
        <span
          className="align-items-center bg-white d-inline-flex justify-content-center rounded-circle text-lime-green"
          style={{
            width: "32px",
            height: "32px",
            transform: "rotate(-45deg)",
          }}
        >
          <i className="bi bi-arrow-right-short fs-4"></i>
        </span>
      )}
    </button>
  );
};

export default ActionButton;