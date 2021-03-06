import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect
} from "react-table";
import styling from '../../css/survey.css'
import { getSurveys } from '../../actions/api';

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function handleDelete(id, accessToken) {
  fetch("http://159.203.100.198:5000/api/survey/delete?surveyId=" + id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    },
  })
    .then((response) => {
      response.json().then(responseJson => {
        return responseJson;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function Table({ columns, data, updateMyData, skipReset, accessToken}) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );

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
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      updateMyData,
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: "selection",

            groupByBoundary: true
          },
          ...columns
        ];
      });
    }
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.map((surveyData) => {
            return (
              <tr key={surveyData.id}>
                <td>&nbsp;</td>
                <td>{surveyData.id}</td>
                <td>{surveyData.siteAddress}</td>
                <td>{surveyData.customerName}</td>
                <td>{surveyData.surveyStatus.name}</td>
                <td><button type="submit" value="Submit" id="edit-button">edit</button></td>
                <td><button type="submit" value="Submit" id="delete-button" onClick={() => handleDelete(surveyData.id, accessToken)}>delete</button></td>
                <td>&nbsp;</td>
              </tr>
            );
          })}
        </tbody>
        {/* <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        <>
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody> */}
      </table>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
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

function App() {
  const auth = useSelector(state => state.auth);
  const columns = React.useMemo(
    () => [
      {
        Header: "Filter By:",
        columns: [
          {
            Header: "Survey ID",
            accessor: "surveyID",
            aggregate: "count",
            Aggregated: ({ cell: { value } }) => `${value} (med))`
          },
          {
            Header: "Survey Location",
            accessor: "surveyLocation",
            aggregate: "uniqueCount",
            Aggregated: ({ cell: { value } }) => `${value} Unique Names`
          },
          {
            Header: "Client Name",
            accessor: "clientName",
            aggregate: "uniqueCount",
            Aggregated: ({ cell: { value } }) => `${value} Unique Names`
          },
          {
            Header: "Status",
            accessor: "status",
            Filter: SelectColumnFilter,
            filter: "includes"
          }/*,
					{
					  width: 'fit-content',
						Header: '',
					  accessor: 'edit',
						Cell: () => (
						  <button className={styling.button} id="edit-button" name="action" value="edit">edit</button>
            )
					},
					{
					  width: 'fit-content',
						Header: '',
					  accessor: 'delete',
						Cell: () => (
						  <button className={styling.button} id="delete-button" name="action" value="delete" onClick={(item) => { if (window.confirm('Are you sure you sure you want to delete this survey')) { this.deleteItem(item) } else { this.onCancel(item) } }}>delete</button>
            )
					}*/
        ]
      }
    ]
  );

  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    getSurveys(auth.accessToken).then(function (responseJson) {
      setSurveys(responseJson)
    })
  }, []);

  return (
    <div>
      <Table columns={columns} data={surveys} accessToken={auth.accessToken} id="surveys" />
    </div>
  );
}

export default App;
