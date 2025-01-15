// See examples: https://github.com/TanStack/table/tree/v7/examples/pagination

import { useState, useMemo } from 'react'
import PaginationTable from './paginationTable';


const advocatesTable = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    Cell: ({ cell: { value } }: { cell: { value: string } }) => value || '-'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Cell: ({ cell: { value } }: { cell: { value: string } }) => value || '-'
  },
  {
    Header: 'City',
    accessor: 'city',
    Cell: ({ cell: { value } }: { cell: { value: string } }) => value || '-'
  },
  {
    Header: 'Degree',
    accessor: 'degree',
    Cell: ({ cell: { value } }: { cell: { value: string } }) => value || '-'
  },
  {
    Header: 'Specialties',
    accessor: 'specialties',
    Cell: ({ cell: { value } }: { cell: { value: any } }) => value || '-'
  },
  {
    Header: 'Years of Experience',
    accessor: 'yearsOfExperience',
    Cell: ({ cell: { value } }: { cell: { value: number } }) => value || '-'
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
    Cell: ({ cell: { value } }: { cell: { value: number } }) => value || '-'
  }
]

interface AdvocatesProps {
  header: string;
  data: any[];
}


function AdvocatesTable({
  header,
  data,
}: AdvocatesProps) {

  const columns = useMemo(
    () => [
      {
        Header: header,
        columns: advocatesTable
      }
    ],
    []
  )

  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(10)

  return (
    <div className='overflow-x-auto'>
      <div className='min-w-full'>
        <PaginationTable
          columns={columns}
          data={data}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}

export default AdvocatesTable;