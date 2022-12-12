import { gql, useQuery } from '@apollo/client'

export const GRAPHQL_API = 'http://localhost:8090/graphql';

export const GET_SERVICIOS_QUERY = gql`
  query GetServicios {
    getServicios {
      id
      nombre
      horarioInicio
      horarioFin
    }
  }
  `;
