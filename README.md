# Migration from REST to GraphQL

## Simple class schema
![Class schema](https://github.com/aevaldas/rest-graphql-migration/blob/master/class-uml.png)

## REST APIs to migrate
Company:
* `GET /api/companies`  Returns the list of all the company
* `GET /api/companies/:id` Returns the company which has id
* `POST /api/companies` Creates a new company with details in request body
* `DELETE /api/companies/:id` Deletes a company which has id
* `GET /api/companies/:companyId/employees` Returns company's which has companyId employees

Employees:
* `GET /api/employees/:id` Returns employee which has id
* `POST /api/employees` Creates a new employee, with details in request body
* `DELETE /api/employees/:id` Deletes employee which has id