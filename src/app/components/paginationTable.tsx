import { useTable, usePagination, useExpanded } from 'react-table'

interface PaginationTableProps {

  columns: any;

  data: Array<Record<string, any>>;

  pageSize: any;

}

function PaginationTable({
  columns,
  data,
  pageSize: controlledPageSize
}: PaginationTableProps) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: controlledPageSize },
    },
    useExpanded,
    usePagination

  )

  const debug = false;

  // Render the UI for your table
  return (
    <>
      <pre>
        {debug &&
          <code>
            {JSON.stringify(
              {
                pageIndex,
                pageSize,
                pageCount,
                canNextPage,
                canPreviousPage,
              },
              null,
              2
            )}
          </code>
        }
      </pre>
      <div className='overflow-x-auto'>
        <table className='min-w-full table table-striped table-hover' {...getTableProps()}>
          <thead>
          {headerGroups.map(headerGroup => {
  const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
  return (
    <tr key={headerGroupKey} {...headerGroupProps}>
      {headerGroup.headers.map(column => {
        const { key: columnKey, ...columnProps } = column.getHeaderProps();
        return (
          <th key={columnKey} {...columnProps}>{column.render('Header')}</th>
        );
      })}
    </tr>
  );
})}
</thead>
<tbody {...getTableBodyProps()}>
  {page.map((row: any, i: number) => {
    prepareRow(row);
    const { key: rowKey, ...rowProps } = row.getRowProps();
    return (
      <tr key={rowKey} {...rowProps} className='odd:bg-gray-100 even:bg-white pb-2' onClick={() => { }}>
        {row.cells.map(cell => {
          const { key: cellKey, ...cellProps } = cell.getCellProps();
          return (
            <td key={cellKey} {...cellProps}>
              {cell.render('Cell')}
            </td>
          );
        })}
      </tr>
    );
  })}
</tbody>
</table>
</div>
<div className="pagination">
  <button type='button' className='btn btn-solaceColor mx-1' onClick={() => previousPage()} disabled={!canPreviousPage}>
    {'<'}
  </button>{' '}
  <button type='button' className='btn btn-solaceColor mx-1' onClick={() => nextPage()} disabled={!canNextPage}>
    {'>'}
  </button>{' '}

  <span className='mt-2 mx-2'>
    <strong>
      {`Page ${pageIndex + 1} of ${pageCount}`}
    </strong>{' '}
  </span>
  <select
    value={pageSize}
    onChange={e => {
      setPageSize(Number(e.target.value));
    }}
  >
    {[10, 20, 30, 40, 50].map(pageSize => (
      <option key={pageSize} value={pageSize}>
        Show {pageSize}
      </option>
    ))}
  </select>
</div>
</>
);
}

export default PaginationTable;