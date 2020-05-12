const resolvers = {
  Query: {
    companies: (_source, _args, { dataSources }) => {
      return dataSources.MigrationApi.getCompanies();
    },
    company: (_source, { id }, { dataSources }) => {
      return dataSources.MigrationApi.getCompany(id);
    },
    employees: (_source, { companyId }, { dataSources }) => {
      return dataSources.MigrationApi.getCompanyEmployees(companyId);
    },
    employee: (_source, { id }, { dataSources }) => {
      return dataSources.MigrationApi.getEmployee(id);
    },
  },
  Mutation: {
    createCompany: (_source, { title, address }, { dataSources }) => {
      return dataSources.MigrationApi.createCompany(title, address);
    },
    deleteCompany: (_source, { id }, { dataSources }) => {
      return dataSources.MigrationApi.deleteCompany(id);
    },
    createEmployee: (
      _source,
      { companyId, name, jobName },
      { dataSources }
    ) => {
      return dataSources.MigrationApi.createEmployee(companyId, name, jobName);
    },
    deleteEmployee: (_source, { id }, { dataSources }) => {
      return dataSources.MigrationApi.deleteEmployee(id);
    },
  },
  Employee: {
    company: ({ companyId }, _, { dataSources }) => {
      return dataSources.MigrationApi.getCompany(companyId);
    },
  },
  Company: {
    employees: ({ id }, _, { dataSources }) => {
      return dataSources.MigrationApi.getCompanyEmployees(id);
    },
  },
};

module.exports = resolvers;
