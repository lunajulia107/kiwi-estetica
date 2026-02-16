const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointments');
const { Op } = require('sequelize');

// ================= CRIAR AGENDAMENTO =================
router.post('/', async (req, res) => {
    console.log('Dados recebidos:', req.body);

    const { name, phone, category, procedure, date, time } = req.body;

    if (!name || !phone || !category || !procedure || !date || !time) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const existingConfirmedAppointment = await Appointment.findOne({
            where: {
                date,
                time,
                status: 'confirmado'
            }
        });

        if (existingConfirmedAppointment) {
            return res.status(409).json({
                message: 'Este horário já está agendado e confirmado por outra pessoa. Por favor, escolha outro.'
            });
        }

        const existingPendingAppointment = await Appointment.findOne({
            where: {
                date,
                time,
                status: 'pendente'
            }
        });

        if (existingPendingAppointment) {
            return res.status(409).json({
                message: 'Este horário está em processo de agendamento. Por favor, escolha outro horário ou tente mais tarde.'
            });
        }

        const newAppointment = await Appointment.create({
            name,
            phone,
            category,
            procedure,
            date,
            time,
            status: 'pendente'
        });

        const professionalNumber = process.env.WHATSAPP_PROFESSIONAL_NUMBER;
        const message = `Olá, tenho um agendamento:
                            Nome: ${name}
                            Celular: ${phone}
                            Categoria: ${category}
                            Procedimento: ${procedure}
                            Data: ${date}
                            Horário: ${time}`;

        const urlWhatsApp = `https://wa.me/${professionalNumber}?text=${encodeURIComponent(message)}`;

        res.status(201).json({
            message: 'Agendamento registrado como pendente. Por favor, confirme via WhatsApp.',
            whatsappLink: urlWhatsApp,
            appointmentId: newAppointment.id
        });

    } catch (error) {
        console.error('Erro ao agendar:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao tentar agendar.' });
    }
});

// ================= HORÁRIOS OCUPADOS =================
router.get('/horarios-ocupados', async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'A data é um parâmetro obrigatório.' });
    }

    try {
        const occupiedAppointments = await Appointment.findAll({
            where: {
                date,
                status: {
                    [Op.in]: ['confirmado', 'pendente']
                }
            },
            attributes: ['time'],
            group: ['time'],
            raw: true
        });

        const occupiedHorarios = occupiedAppointments.map(a => a.time);

        res.json({ horariosOcupados: occupiedHorarios });

    } catch (error) {
        console.error('Erro ao buscar horários ocupados:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar horários.' });
    }
});

// ================= DATAS COMPLETAMENTE OCUPADAS =================
router.get('/datas-completamente-ocupadas', async (req, res) => {
    const totalAvailableHours = [
        '08:00', '09:00', '10:00', '11:00',
        '13:00', '14:00', '15:00', '16:00', '17:00'
    ].length;

    try {
        const results = await Appointment.sequelize.query(`
            SELECT DATE_FORMAT(data, '%Y-%m-%d') AS data_formatada
            FROM appointments
            WHERE status IN ('confirmado', 'atendido', 'pendente')
            GROUP BY data
            HAVING COUNT(DISTINCT horario) = :totalHorariosDisponiveis;
        `, {
            replacements: { totalHorariosDisponiveis: totalAvailableHours },
            type: Appointment.sequelize.QueryTypes.SELECT
        });

        const busyDates = results.map(row => row.data_formatada);

        res.json({ busyDates });

    } catch (error) {
        console.error('Erro ao buscar datas completamente ocupadas:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar datas ocupadas.' });
    }
});

module.exports = router;
