import React, { useEffect, useRef, useState, useMemo } from "react";
import SearchBar from "../../components/SearchBar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const itemsPerPage = 15;
  const modalRef = useRef();
  const modalInstance = useRef(null);

  // Normaliza status
  const normalizeStatus = (status) =>
    String(status || "").trim().toLowerCase();

  // Busca os agendamentos ao carregar o componente.
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Usuário não autenticado");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/admin/agendamentos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Erro ao buscar dados");
        }

        setAppointments(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setError(err.message);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, []);

  // Cria instancia do modal
  useEffect(() => {
    if (modalRef.current && window.bootstrap) {
      modalInstance.current = new window.bootstrap.Modal(modalRef.current);
    }
    return () => modalInstance.current?.dispose();
  }, []);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    modalInstance.current?.show();
  };

  const confirmAppointment = async () => {
    if (!selectedAppointment) return;
    const { id } = selectedAppointment;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/agendamentos/${id}/confirmar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, status: "confirmado" } : apt
        )
      );

      modalInstance.current?.hide();
    } catch (err) {
      alert(err.message || "Erro ao confirmar agendamento");
    }
  };

  // Filtro + Ordenação para mostrar pendentes primeiro
  const filteredAppointments = useMemo(() => {
    const filtered = appointments.filter((apt) => {
      const status = normalizeStatus(apt.status);
      const filterValue = normalizeStatus(statusFilter);
      
      const statusMatch = filterValue === "todos" ? true : status === filterValue;
      const searchMatch = (apt.name || "").toLowerCase().includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });

    // Ordenação para garantir que pendentes apareçam na página 1
    return filtered.sort((a, b) => {
      const sA = normalizeStatus(a.status);
      const sB = normalizeStatus(b.status);
      if (sA === "pendente" && sB !== "pendente") return -1;
      if (sA !== "pendente" && sB === "pendente") return 1;
      return new Date(a.date) - new Date(b.date);
    });
  }, [appointments, statusFilter, search]);
  
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(start, start + itemsPerPage);

  const goToPage = (num) => {
    if (num < 1 || num > totalPages) return;
    setCurrentPage(num);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search]);

  if (error) return <p className="text-danger">Erro: {error}</p>;

  return (
    <>
      <h3 className="fw-bold mb-3">Agendamentos</h3>

      <div className="align-items-center d-flex flex-wrap gap-3 justify-content-between mb-3">
        <SearchBar value={search} onChange={setSearch} />

        <div className="align-items-center d-flex gap-3">
          <label htmlFor="status-filter">Filtrar por</label>
          <select
            className="form-select w-auto"
            id="status-filter"
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
          >
            <option value="todos">Todos</option>
            <option value="pendente">Pendentes</option>
            <option value="confirmado">Confirmados</option>
          </select>
        </div>
      </div>

      {/* Layout Mobile */}
      <div className="d-md-none">
        {paginatedAppointments.map((apt) => {
          const status = normalizeStatus(apt.status);
          return (
            <div className="border-0 card mb-3" key={apt.id}>
              <div className="card-body">
                <h5 className="mb-2">{apt.name}</h5>
                <p>
                  <strong className="fw-medium">Data:</strong>{" "}
                  {apt?.date && new Date(apt.date).toLocaleDateString("pt-BR")} às {apt.time}
                </p>
                <p>
                  <strong className="fw-medium">Procedimento:</strong> {apt.procedure}
                </p>
                <p>
                  <strong className="fw-medium">Status:</strong>{" "}
                  <span className={`badge fw-medium ${status === "pendente" ? "bg-warning text-dark" : "bg-success"}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </p>
                {status === "pendente" && (
                  <button className="btn btn-sm btn-lime-green text-white mt-4" onClick={() => openModal(apt)} type="button">
                    Confirmar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Layout Desktop */}
      <div className="bg-white d-md-block d-none p-3 rounded-4 table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Cliente</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Procedimento</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments.map((apt) => {
              const status = normalizeStatus(apt.status);
              return (
                <tr key={apt.id}>
                  <td>{apt.name}</td>
                  <td>{apt.date && new Date(apt.date).toLocaleDateString("pt-BR")}</td>
                  <td>{apt.time}</td>
                  <td>{apt.procedure}</td>
                  <td>
                    <span className={`badge fw-medium ${status === "pendente" ? "bg-warning text-dark" : "bg-success"}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {status === "pendente" && (
                      <button className="btn btn-sm btn-lime-green text-white" onClick={() => openModal(apt)} type="button">
                        Confirmar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-end mt-3">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Anterior</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => goToPage(i + 1)} type="button">{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Próximo</button>
            </li>
          </ul>
        </nav>
      )}

      {/* Modal */}
      <div aria-hidden="true" className="modal fade" ref={modalRef} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            {selectedAppointment && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">Agendamento</h5>
                  <button className="btn-close" data-bs-dismiss="modal" type="button" />
                </div>
                <div className="modal-body">
                  <p>
                    <strong className="fw-medium">Cliente:</strong> {selectedAppointment.name} <br />
                    <strong className="fw-medium">Procedimento:</strong> {selectedAppointment.procedure} <br />
                    <strong className="fw-medium">Data:</strong> {selectedAppointment?.date && new Date(selectedAppointment.date).toLocaleDateString("pt-BR")} às {selectedAppointment.time}
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-light" data-bs-dismiss="modal" type="button">Cancelar</button>
                  <button className="btn btn-lime-green text-white" onClick={confirmAppointment} type="button">Confirmar</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;