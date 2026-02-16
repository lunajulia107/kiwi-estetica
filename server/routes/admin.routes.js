const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op, fn, col, literal } = require('sequelize'); 
const moment = require('moment');

const Admin = require('../models/Admin');
const auth = require('../auth/adminAuth'); 
const Appointments = require('../models/Appointments'); 

// ================= LOGIN =================
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } });

        if (!admin || !(await bcrypt.compare(password, admin.senha))) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }

        const token = jwt.sign(
            { id: admin.id },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
});

// ================= USUÁRIO LOGADO =================
router.get('/usuario-logado', auth, async (req, res) => {
    try { 
        const admin = await Admin.findByPk(req.adminId, {
            attributes: ['nome', 'email', 'cargo']
        }); 

        if (!admin) {
            return res.status(404).json({ mensagem: 'Administrador não encontrado' });
        }

        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao buscar dados do administrador' });
    }
});

// ================= DASHBOARD =================
router.get('/dashboard', auth, async (req, res) => {
    try {
        const today = moment().format('YYYY-MM-DD');
        const now = moment().format('HH:mm:ss');

        const next = await Appointments.findOne({
            where: {
                date: today,
                time: { [Op.gte]: now },
                status: 'confirmado'
            },
            order: [['time', 'ASC']]
        });

        const totalToday = await Appointments.count({
            where: { date: today }
        });

        const pending = await Appointments.count({
            where: { date: today, status: 'pendente' }
        });

        const confirmed = await Appointments.count({
            where: { date: today, status: 'confirmado' }
        });

        const fixedCategories = [
            'procedimentos faciais',
            'procedimentos corporais',
            'terapias complementares'
        ];

        const countsCategories = await Promise.all(
            fixedCategories.map(category =>
                Appointments.count({ where: { date: today, category } })
            )
        );

        const procedures = await Appointments.findAll({
            attributes: [
                'procedimento',
                [fn('COUNT', col('procedimento')), 'quantidade']
            ],
            group: ['procedimento'],
            order: [[literal('quantidade'), 'DESC']],
            limit: 5,
            raw: true
        });

        const response = {
            nextClient: next ? next.name : null,
            totalToday,
            pendingAppointments: pending,
            confirmedAppointments: confirmed,
            categoryAppointments: {
                labels: fixedCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1)),
                values: countsCategories
            },
            topProcedures: {
                labels: procedures.map(p => p.procedimento),
                values: procedures.map(p => Number(p.quantidade))
            }
        };

        res.json(response);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar dados do dashboard' });
    }
});

// ================= AGENDAMENTOS =================
router.get('/agendamentos', auth, async (req, res) => {
    try {
        const appointments = await Appointments.findAll({
            order: [['date', 'ASC'], ['time', 'ASC']],
            attributes: [
                'id',
                'name',
                'phone',
                'category',
                'procedure',
                'date',
                'time',
                'status'
            ],
            raw: true
        });

        if (!appointments.length) {
            return res.status(200).json({
                status: 'sucesso',
                message: 'Nenhum agendamento encontrado',
                data: []
            });
        }

        res.status(200).json({
            status: 'sucesso',
            total: appointments.length,
            data: appointments
        });
    } catch (err) { 
        console.error(err);
        res.status(500).json({
            status: 'erro',
            message: 'Erro ao buscar agendamentos'
        });
    }
});

// ================= CONFIRMAR AGENDAMENTO =================
router.put('/agendamentos/:id/confirmar', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointments.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        if (appointment.status !== 'pendente') {
            return res.status(400).json({ message: 'Agendamento não está pendente' });
        }

        appointment.status = 'confirmado';
        await appointment.save();

        res.json({
            message: 'Agendamento confirmado com sucesso',
            appointment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao confirmar agendamento' });
    }
});

module.exports = router;
