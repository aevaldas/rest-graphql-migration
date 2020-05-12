import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "http://localhost:3001/api",
  typePatcher: {
    CompaniesPayload: (data) => {
      if (data.results != null) {
        data.results = data.results.map((company) => ({
          __typename: "Company",
          ...company,
        }));
      }
      return data;
    },
    EmployeesPayload: (data) => {
      if (data.results != null) {
        data.results = data.results.map((employee) => ({
          __typename: "Employee",
          ...employee,
        }));
      }
      return data;
    },
  },
});

export default new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export const CREATE_COMPANY = gql`
  mutation createCompany($data: PublishablePostInput!) {
    createCompany: createCompany(input: $data)
      @rest(type: "Company", path: "/companies", method: "POST") {
      id
      title
      address
    }
  }
`;

export const GET_COMPANIES = gql`
  query getCompanies {
    companies @rest(type: "CompaniesPayload", path: "/companies") {
      id
      title
      address
    }
  }
`;

export const GET_COMPANY = gql`
  query getCompany($companyId: String!) {
    company: company(companyId: $companyId)
      @rest(type: "Company", path: "/companies/{args.companyId}") {
      id @export(as: "companyId")
      title
      address
      employees
        @rest(
          type: "EmployeesPayload"
          path: "/companies/:companyId/employees"
        ) {
        id
        name
        jobName
      }
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($companyId: String!) {
    deleteCompany: deleteCompany(companyId: $companyId)
      @rest(
        type: "Company"
        path: "/companies/{args.companyId}"
        method: "DELETE"
      ) {
      id
      title
      address
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($data: PublishablePostInput!) {
    createEmployee: createEmployee(input: $data)
      @rest(type: "Employee", path: "/employees", method: "POST") {
      id
      name
      jobName
    }
  }
`;
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: String!) {
    deleteEmployee: deleteEmployee(id: $id)
      @rest(type: "Employee", path: "/employees/{args.id}", method: "DELETE") {
      id
      name
      jobName
    }
  }
`;
