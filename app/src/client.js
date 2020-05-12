import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:3001/graphql",
  }),
});

export const CREATE_COMPANY = gql`
  mutation createCompany($title: String!, $address: String!) {
    createCompany(title: $title, address: $address) {
      id
      title
      address
    }
  }
`;

export const GET_COMPANIES = gql`
  query getCompanies {
    companies {
      id
      title
      address
    }
  }
`;

export const GET_COMPANY = gql`  
  query getCompany($companyId: ID!) {
    company(id: $companyId) {
      id
      title
      address
      employees {
        id
        name
        jobName
      }
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation deleteCompany($companyId: ID!) {
    deleteCompany(id: $companyId) {
      id
      title
      address
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($companyId: ID!, $name: String!, $jobName: String!) {
    createEmployee(companyId: $companyId, name: $name, jobName: $jobName) {
      id
      name
      jobName
    }
  }
`;
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
      name
      jobName
    }
  }
`;
