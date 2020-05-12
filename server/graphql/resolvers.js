const companyRepository = require('../repositories/companyRepository')
const employeeRepository = require('../repositories/employeeRepository')

const resolvers = {
  Query: {
    companies: (_source, _args) => {
      return companyRepository.getAll();
    },
    company: (_source, { id }) => {
      return companyRepository.getById(id);
    },
    employees: (_source, { companyId }) => {
      return employeeRepository.getAllByCompanyId(companyId);
    },
    employee: (_source, { id }) => {
      return employeeRepository.getById(id);
    },
  },
  Mutation: {
    createCompany: (_source, { title, address }) => {
      return companyRepository.save({title, address});
    },
    deleteCompany: (_source, { id }) => {
      return companyRepository.deleteById(id);
    },
    createEmployee: (
      _source,
      { companyId, name, jobName }
    ) => {
      return employeeRepository.save({companyId, name, jobName});
    },
    deleteEmployee: (_source, { id }) => {
      return employeeRepository.deleteById(id);
    },
  },
  Employee: {
    company: ({ companyId }, _) => {
      return companyRepository.getById(companyId);
    },
  },
  Company: {
    employees: ({ id }, _) => {
      return employeeRepository.getAllByCompanyId(id);
    },
  },
};

module.exports = resolvers;
