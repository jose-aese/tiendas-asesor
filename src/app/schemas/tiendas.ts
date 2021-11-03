export const tiendasFilter = {
    title: "Tiendas Por Ubicacion Response",
    type: "object",
    properties: {
      tiendas: {
        type: "array",
        encrypted: true,
        items: {
          type: "object",
          properties: {
            idTienda: {
              type: "string",
            },
            nombreTienda: {
              type: "string",
            },
            tiendaFisica: {
              type: "boolean",
            },
            calificacion: {
              type: "number",
            },
            categoria: {
              type: "object",
            },
            horario: {
              type: "object",
            },
            direccion: {
              encrypted: true,
              type: "object",
              properties: {
                calle: {
                  type: "string",
                  encrypted: true,
                },
                numeroExterior: {
                  type: "string",
                  encrypted: true,
                },
                numeroInterior: {
                  type: "string",
                  encrypted: true,
                },
                colonia: {
                  type: "string",
                  encrypted: true,
                },
                codigoPostal: {
                  type: "string",
                  encrypted: true,
                },
                municipio: {
                  type: "string",
                  encrypted: true,
                },
                entidadFederativa: {
                  type: "string",
                  encrypted: true,
                },
                ubicacion: {
                  encrypted: true,
                  type: "object",
                  properties: {
                    latitud: {
                      type: "number",
                      encrypted: true,
                    },
                    longitud: {
                      type: "number",
                      encrypted: true,
                    },
                  },
                },
              },
            },
            logo: {
              type: "object",
            },
            galeria: {
              type: "null",
            },
            activado: {
              type: "boolean",
            },
          },
        },
      },
    },
  };
  