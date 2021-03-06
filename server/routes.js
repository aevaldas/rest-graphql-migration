const express = require('express');
const router = express.Router();
const companyRepository = require('./repositories/companyRepository');
const employeeRepository = require('./repositories/employeeRepository');

router.get('/', (req, res) => res.send('REST -> GraphQL migration'))

router.route('/api/companies')
    .get((req,res) => res.json(companyRepository.getAll()))
    .post((req, res) => res.json(companyRepository.save(req.body)));

router.route('/api/companies/:companyId')
    .get(({params: {companyId}}, res) => res.json(companyRepository.getById(companyId)))
    .delete(({params: {companyId}}, res) => res.json(companyRepository.deleteById(companyId)))

router.get('/api/companies/:companyId/employees',
    ({params: {companyId}}, res) => res.json(employeeRepository.getAllByCompanyId(companyId)))

router.route('/api/employees')
    .get((req,res) => res.json(employeeRepository.getAll()))
    .post((req, res) => res.json(employeeRepository.save(req.body)));

router.route('/api/employees/:employeeId')
    .get(({params: {employeeId}}, res) => res.json(employeeRepository.getById(employeeId)))
    .delete(({params: {employeeId}}, res) => res.json(employeeRepository.deleteById(employeeId)));

module.exports = router;
