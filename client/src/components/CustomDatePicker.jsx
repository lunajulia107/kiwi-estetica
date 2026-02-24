import React, { useState, useEffect, useRef } from 'react';

// CustomDatePicker é um componente de seleção de data personalizado que suporta desabilitar datas passadas e datas específicas, além de ser responsivo para telas menores. 
// Ele exibe um calendário interativo para seleção de datas e formata a data no formato brasileiro (DD/MM/YYYY).
const CustomDatePicker = ({ selectedDate, onDateChange, disabledDates = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date());
    const datePickerRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Alterna a visibilidade do calendário.
    const toggleCalendar = () => setIsOpen(!isOpen);

    // Verifica se uma data específica deve ser desabilitada (datas passadas ou datas na lista de desabilitadas).
    const isDisabled = (isoDateString) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dateToCheck = new Date(isoDateString + 'T00:00:00');
        dateToCheck.setHours(0, 0, 0, 0);

        if (dateToCheck < today) {
            return true;
        }
        return disabledDates.includes(isoDateString);
    };  

    // Manipula a seleção de uma data no calendário, atualizando o estado e chamando a função de callback com a data selecionada.
    const handleDateSelect = (date) => {
        const isoStr = date.toISOString().split('T')[0];
        if (isDisabled(isoStr)) {
            return;
        }
        setCurrentDate(date);
        onDateChange(isoStr);
        setIsOpen(false);
    };

    // Manipula a mudança de mês no calendário, atualizando o estado para refletir o novo mês selecionado.
    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setCurrentDate(prev => new Date(prev.getFullYear(), newMonth, 1));
    };

    // Manipula a mudança de ano no calendário, atualizando o estado para refletir o novo ano selecionado.
    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentDate(prev => new Date(newYear, prev.getMonth(), 1));
    };

    const prevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const days = [];
        const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={`day-name-${i}`} className="day-name fw-medium py-2 text-center text-forest-green" style={{ width: 'calc(100%/7)' }}>
                    {dayNames[i]}
                </div>
            );
        }

        const offset = firstDay;
        for (let i = 0; i < offset; i++) {
            days.push(
                <div key={`empty-${i}`} className="d-inline-block day text-center text-forest-green" style={{ width: 'calc(100%/7)' }} />
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDate = new Date(year, month, day);
            const isoStr = dayDate.toISOString().split('T')[0];
            const isSelected = selectedDate === isoStr;
            const isToday = dayDate.toDateString() === new Date().toDateString();
            const isDisabledDay = isDisabled(isoStr);

            days.push(
                <button
                    type="button"
                    key={day}
                    className={`align-items-center border-0 btn btn-sm d-flex flex-grow-0 justify-content-center m-0 p-0
                        ${isSelected ? 'btn-brown text-white' : (isToday ? 'btn-lavender' : 'bg-white text-forest-green')}
                        ${isDisabledDay ? 'disabled-day' : ''} `}
                    style={{
                        width: 'calc(100%/7)', height: '32px', border: '1px solid #dee2e6',
                        backgroundColor: isDisabledDay ? '#f0f0f0' : undefined,
                        cursor: isDisabledDay ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => handleDateSelect(dayDate)}
                    disabled={isDisabledDay}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    const formatDateBR = (isoDate) => {
        if (!isoDate) return '';
        try {
            const [year, month, day] = isoDate.split('-');
            return `${day}/${month}/${year}`;
        } catch (error) {
            return '';
        }
    };

    // Converte uma string de data no formato brasileiro (DD/MM/YYYY) para o formato ISO (YYYY-MM-DD), 
    // validando a data e verificando se ela deve ser desabilitada.
    const parseDateBR = (dateString) => {
        const match = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (!match) return '';

        const [_, day, month, year] = match;
        const [d, m, y] = [parseInt(day, 10), parseInt(month, 10), parseInt(year, 10)];

        if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12) return '';

        const testDate = new Date(y, m - 1, d);
        if (testDate.getFullYear() !== y || testDate.getMonth() !== m - 1 || testDate.getDate() !== d) return '';

        const isoDate = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        if (isDisabled(isoDate)) return '';

        return isoDate;
    };

    // Manipula a mudança no campo de entrada de data, formatando a entrada no formato brasileiro e atualizando o estado com a data selecionada, 
    // validando a data e verificando se ela deve ser desabilitada.
    const handleInputChange = (e) => {
        let value = e.target.value;
        let cleanValue = value.replace(/\D/g, '');

        if (cleanValue.length > 2) value = cleanValue.substring(0, 2) + '/' + cleanValue.substring(2);
        if (cleanValue.length > 4) value = value.substring(0, 5) + '/' + cleanValue.substring(4);
        if (value.length > 10) value = value.substring(0, 10);

        onDateChange(parseDateBR(value));
    };

    const handleNativeDateChange = (e) => onDateChange(e.target.value);

    const years = [];
    const currentYearControl = new Date().getFullYear();
    for (let i = currentYearControl - 1; i <= currentYearControl + 5; i++) {
        years.push(i);
    }

    const months = [
        { value: 0, label: 'Janeiro' }, { value: 1, label: 'Fevereiro' },
        { value: 2, label: 'Março' }, { value: 3, label: 'Abril' },
        { value: 4, label: 'Maio' }, { value: 5, label: 'Junho' },
        { value: 6, label: 'Julho' }, { value: 7, label: 'Agosto' },
        { value: 8, label: 'Setembro' }, { value: 9, label: 'Outubro' },
        { value: 10, label: 'Novembro' }, { value: 11, label: 'Dezembro' },
    ];

    // Em telas menores que 400px de largura, renderiza um input nativo do tipo "date" para melhor usabilidade em dispositivos móveis, 
    // enquanto em telas maiores, renderiza o calendário personalizado.
    if (windowWidth < 400) {
        return (
            <input
                type="date"
                className="form-control"
                value={selectedDate || ''}
                onChange={handleNativeDateChange}
                min={new Date().toISOString().split('T')[0]}
            />
        );
    }

    // Renderiza o campo de entrada de data e, se o calendário estiver aberto, renderiza o calendário personalizado para seleção de datas.
    return (
        <div className="position-relative" ref={datePickerRef}>
            <input
                type="text"
                className="form-control"
                placeholder="00/00/0000"
                value={formatDateBR(selectedDate)}
                onChange={handleInputChange}
                onClick={toggleCalendar}
                aria-label="Select date"
            />

            {isOpen && (
                <div className="bg-white border mt-1 mt-2 p-2 position-absolute rounded shadow" style={{ maxWidth: '300px', zIndex: 1050 }}>
                    <div className="align-items-center d-flex fw-semibold justify-content-between mb-2 text-capitalize">
                        <button type="button" className="btn btn-lavender btn-sm" onClick={prevMonth} aria-label="Mês anterior">&lt;</button>
                        <select
                            className="border-0 form-select form-select-sm"
                            value={currentDate.getMonth()}
                            onChange={handleMonthChange}
                            style={{ maxWidth: '96px' }}
                            aria-label="Selecione o mês"
                        >
                            {months.map(m => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                        <select
                            className="border-0 form-select form-select-sm"
                            value={currentDate.getFullYear()}
                            onChange={handleYearChange}
                            style={{ maxWidth: '88px' }}
                            aria-label="Selecione o ano"
                        >
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                        <button type="button" className="btn btn-lavender btn-sm" onClick={nextMonth} aria-label="Próximo mês">&gt;</button>
                    </div>
                    <div className="d-flex flex-wrap">
                        {renderCalendar()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDatePicker;