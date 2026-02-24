// IconRow componente que recebe um ícone, filhos e um componente opcional para renderizar o conteúdo. 
// Ele exibe o ícone ao lado do conteúdo usando flexbox para alinhamento.
const IconRow = ({ icon, children, as: Component = "span", ...props }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <i className={icon}></i>
      <Component {...props}>{children}</Component>
    </div>
  );
};

export default IconRow;
