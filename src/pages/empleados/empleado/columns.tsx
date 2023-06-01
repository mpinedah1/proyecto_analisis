const columns = [
  {
    name: 'Id',
    selector: (row: { id: string }) => row.id,
    sortable: true,
  },
  {
    name: 'Nombres',
    selector: (row: { nombres: string }) => row.nombres,
    sortable: true,
  },
  {
    name: 'Apellidos ',
    selector: (row: { apellidos: any }) => row.apellidos,
    sortable: true,
  },
  {
    name: 'Correo ',
    selector: (row: { correo: any }) => row.correo,
    sortable: true,
  },
  {
    name: 'Direccion ',
    selector: (row: { direccion: any }) => row.direccion,
    sortable: true,
  },
  {
    name: 'DPI ',
    selector: (row: { dpi: any }) => row.dpi,
    sortable: true,
  },
  {
    name: 'estado ',
    selector: (row: { estado: any }) => row.estado,
    sortable: true,
  },
  {
    name: 'Genero ',
    selector: (row: { genero: any }) => row.genero,
    sortable: true,
  },
];

export default columns;
