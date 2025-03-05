export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const APIURL = 'http://localhost:3000';

export const ApiEndpoint = {
  AuthEndpoint: {
    login: `${APIURL}/auth/login`,
    logout: `${APIURL}/auth/logout`,
    changePassword: `${APIURL}/auth/change-password`,
    me: `${APIURL}/auth/me`,
  },
  RoleEndpoint: `${APIURL}/roles`,
  TaskEndpoint: `${APIURL}/tasks`,
  AppPageEndpoint: `${APIURL}/app-pages`,
  DepartmentEndpoint: `${APIURL}/departments`,
  UserEndpoint: `${APIURL}/users`,
  EmployeeEndpoint: `${APIURL}/employees`,
};
