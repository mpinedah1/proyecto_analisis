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
    name: 'Fecha ',
    selector: (row: { fechaI: any }) => row.fechaI.toDate().toISOString(),
    sortable: true,
  },
  {
    name: 'hora de inicio ',
    selector: (row: { horaI: any }) => row.horaI,
    sortable: true,
  },
  {
    name: 'hora de fin ',
    selector: (row: { horaF: any }) => row.horaF,
    sortable: true,
  },
  {
    name: 'Descripcion',
    selector: (row: { descripcion: string }) => row.descripcion,
    sortable: true,
  },
];

export default columns;
