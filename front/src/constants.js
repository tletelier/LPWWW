export const GRAPHQL_API = 'http://localhost:8090/graphql';

export const GET_SERVICIOS_QUERY = `
  query GetServicios {
    getServicios {
      id
      nombre
      horarioInicio
      horarioFin
    }
  }
  `;
