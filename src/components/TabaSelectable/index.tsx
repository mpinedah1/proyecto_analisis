import { IPlainObject } from 'definitions/IPlainObjects';
import DataTable from 'react-data-table-component';

const TablaSelectable: React.FC<IPlainObject> = ({ columns, data, handleChangeRows, toggledClearRows }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handleChangeRows}
        clearSelectedRows={toggledClearRows}
      />
    </>
  );
};
export default TablaSelectable;
