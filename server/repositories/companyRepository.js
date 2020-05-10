const Joi = require('@hapi/joi');
const companies = require('../mocks/companies');

function validateCompany(company) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        address: Joi.string().min(10).required(),
    });

    const result = schema.validate(company);
    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
}

function getAll() {
    return companies;
}

function getNewId() {
    const lastCompany = companies[companies.length - 1] || { id: 0 };
    const lastCompanyId = lastCompany.id;

    return lastCompanyId + 1;
}

function save(company) {
    validateCompany(company);

    const newCompany = {id: getNewId(), title: company.title, address: company.address};
    companies.push(newCompany);

    return newCompany;
}

function getById(companyId) {
    const company = companies.find(item => item.id == companyId);

    if (!company) {
        throw new Error(`Company with id: ${companyId} not found`);
    }

    return company;
}

function deleteById(companyId) {
    const companyIndex = companies.findIndex(item => item.id == companyId);

    if (companyIndex == -1) {
        throw new Error(`Company with id: ${companyId} not found`);
    }

    return companies.splice(companyIndex, companyIndex + 1)[0];
}

module.exports = {
    companies,
    getAll,
    save,
    getById,
    deleteById,
};