const Joi = require('@hapi/joi');
const companies = require('../mocks/companies');
const employees = require('../mocks/employees');

const doesCompanyIdExist = (value, helper) => {
    if (!companies.find(company => company.id == value)) {
        throw new Error(`Company with id: ${value} not found`);
    }

    return value;
}

function validateEmployee(employee) {
    const schema = Joi.object({
        companyId: Joi.number().custom(doesCompanyIdExist).required(),
        name: Joi.string().min(3).required(),
        jobName: Joi.string().min(3).required(),
    });

    const result = schema.validate(employee);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
}


function getAll() {
    return employees;
}

function getAllByCompanyId(companyId) {
    return employees.filter(item => item.companyId == companyId);
}

function getNewId() {
    const lastEmployee = employees[employees.length - 1] || { id: 0 };
    const lastEmployeeId = lastEmployee.id;

    return lastEmployeeId + 1;
}

function save(employee) {
    validateEmployee(employee);

    const newEmployee = {id: getNewId(), companyId: employee.companyId, name: employee.name, jobName: employee.jobName};
    employees.push(newEmployee);

    return newEmployee;
}

function getById(employeeId) {
    const employee = employees.find(item => item.id == employeeId);

    if (!employee) {
        throw new Error(`Employee with id: ${employeeId} not found`);
    }

    return employee;
}

function deleteById(employeeId) {
    const employeeIndex = employees.findIndex(item => item.id == employeeId);

    if (employeeIndex == -1) {
        throw new Error(`Employee with id: ${employeeId} not found`);
    }

    return employees.splice(employeeIndex, employeeIndex + 1)[0];
}

module.exports = {
    getAll,
    getAllByCompanyId,
    save,
    getById,
    deleteById,
};