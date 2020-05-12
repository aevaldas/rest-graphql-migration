const { RESTDataSource } = require("apollo-datasource-rest");

class MigrationApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/api/";
  }

  getCompanies() {
    return this.get("companies");
  }

  getCompany(id) {
    return this.get(`companies/${id}`);
  }

  createCompany(title, address) {
    return this.post("companies", { title, address });
  }

  deleteCompany(id) {
    return this.delete(`companies/${id}`);
  }

  getCompanyEmployees(companyId) {
    return this.get(`companies/${companyId}/employees`);
  }

  getEmployee(id) {
    return this.get(`employees/${id}`);
  }

  createEmployee(companyId, name, jobName) {
    return this.post("employees", { companyId, name, jobName });
  }

  deleteEmployee(id) {
    return this.delete(`employees/${id}`);
  }
}

module.exports = MigrationApi;
