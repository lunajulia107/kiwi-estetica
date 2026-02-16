const IconRow = ({ icon, children, as: Component = "span", ...props }) => {
  return (
    <div className="d-flex align-items-center gap-2">
      <i className={icon}></i>
      <Component {...props}>{children}</Component>
    </div>
  );
};

export default IconRow;
