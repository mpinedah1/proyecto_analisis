import { IPlainObject } from 'definitions/IPlainObjects';
import DataTable from 'react-data-table-component';

const Tabla: React.FC<IPlainObject> = ({ columns, data }) => {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
};
export default Tabla;
