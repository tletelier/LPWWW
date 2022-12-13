import { gql } from '@apollo/client';

export const GRAPHQL_API = 'http://localhost:8090/graphql';

export const GET_SERVICIOS_QUERY = gql`
  query Query {
    getServicios {
      id
      nombre
      perfil
      horarioInicio
      horarioFin
      valor
    }
  }
`;

export const GET_PERFILES_QUERY = gql`
  query Query {
    getPerfiles {
      id
      nombre
      servicios
    }
  }
`;

export const GET_FUNCIONARIOS_PERFIL_QUERY = gql`
  query Query($perfilId: ID!) {
    getFuncionariosPerfil(perfilId: $perfilId) {
      id
      nombres
      apellidos
      codigoFuncionario
      correo
    }
  }
`;

export const LOGIN_ADMIN_MUTATION = gql`
  mutation Mutation($codigoAdmin: String!, $password: String!) {
    loginAdmin(codigoAdmin: $codigoAdmin, password: $password) {
      message
      token
      code
    }
  }
`;
