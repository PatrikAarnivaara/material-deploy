import { ColumnDefinitionType } from '../../shared/types/ColumnDefenitionType';
import TableHeader  from './header/TableHeader';
import TableRows from './row/TableRows'

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const style = {
    borderCollapse: 'collapse'
} as const

const TableGeneric = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
    return (
        <table style={style}>
            <TableHeader columns={columns} />
            <TableRows
                data={data}
                columns={columns}
            />
        </table>
    );
};

export default TableGeneric;