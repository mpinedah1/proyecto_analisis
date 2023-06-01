const columns = [
  {
    name: 'Id',
    selector: (row: { id: string }) => row.id,
    sortable: true,
  },
  {
    name: 'Empleado',
    selector: (row: { empleado: string }) => row.empleado,
    sortable: true,
  },
  {
    name: 'Fecha de inicio ',
    selector: (row: { fechaI: any }) => row.fechaI.toDate().toISOString(),
    sortable: true,
  },
  {
    name: 'Fecha de fin ',
    selector: (row: { fechaF: any }) => row.fechaF.toDate().toISOString(),
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: string }) => row.descripcion,
    sortable: true,
  },
];

export default columns;
