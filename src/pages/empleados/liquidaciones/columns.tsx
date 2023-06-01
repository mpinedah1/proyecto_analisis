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
    name: 'Total a pagar ',
    selector: (row: { total: any }) => row.total,
    sortable: true,
  },
  {
    name: 'Periodo ',
    selector: (row: { periodo: any }) => row.periodo,
    sortable: true,
  },
];

export default columns;
