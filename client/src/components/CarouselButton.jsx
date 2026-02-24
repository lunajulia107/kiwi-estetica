// CarouselButton componente que renderiza um botão estilizado para navegação em carrossel.
const CarouselButton = ({ ariaLabel, onClick, iconClass }) => {
  return (
    <button
      aria-label={ariaLabel}
      className="btn d-none d-md-flex p-2 pb-1 pt-1 rounded-circle btn-border-lime-green text-lime-green"
      onClick={onClick}
      type="button"
    >
      <i className={iconClass}></i>
    </button>
  );
};

export default CarouselButton;
