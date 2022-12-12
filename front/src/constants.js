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


