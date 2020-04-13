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
<<<<<<< HEAD:app/src/surveys/components/finalTable_previous.jsx
<<<<<<< HEAD

//import makeData from "./makeData";
=======
import makeData from "./makeData";
import {getSurveys} from '../../actions/api';
>>>>>>> 0c021f77e47ef4ac8779a8dd19a6036d4f16fe0b
=======
import makeData from "./makeData";
import {getSurveys} from '../../actions/api';
>>>>>>> 1fc9e03247c3779e40d3d3735eba922c3a5bc4d7:app/src/surveys/components/finalTable.jsx
//import getData from "./getData";
=======
import {getSurveys} from '../../actions/api';
>>>>>>> f8051312c62020ba1a4acb6dfbc877e7c80dd13e

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

function Table({ columns, data, updateMyData, skipReset }) {
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
        <tbody {...getTableBodyProps()}>
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
        </tbody>
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
          },
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
					}
        ]
      }
    ],
    []
  );

<<<<<<< HEAD
<<<<<<< HEAD:app/src/surveys/components/finalTable_previous.jsx
<<<<<<< HEAD
<<<<<<< HEAD
  const [data] = React.useState(() => makeData(10000));

  React.useEffect(() => {}, [data]);

  return (
    <div>
      <Table columns={columns} data={data} id="surveys" />
=======
  function GetSurveys() {
    //const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
=======
  // function GetSurveys() {
  //   const [isLoading, setLoading] = useState(true);
  //   const [data, setData] = useState([]);
>>>>>>> 1fc9e03247c3779e40d3d3735eba922c3a5bc4d7:app/src/surveys/components/finalTable.jsx
  
    const auth = useSelector(state => state.auth);

<<<<<<< HEAD:app/src/surveys/components/finalTable_previous.jsx
    useEffect(() => {
      fetch('http://159.203.100.198:5000/api/survey/index', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.accessToken
        }
      })
        .then((response) => {
          if (response.ok) {
            setData(response.data)
          }
        })
        .catch((error) => console.error(error))
    })

    return (
      'Test'
    )
  }
=======
  // function GetSurveys() {
  //   const [isLoading, setLoading] = useState(true);
  //   const [data, setData] = useState([]);
  
  //   const auth = useSelector(state => state.auth);

=======
>>>>>>> 1fc9e03247c3779e40d3d3735eba922c3a5bc4d7:app/src/surveys/components/finalTable.jsx
    //return 
  //       useEffect(() => {
  //         return fetch('http://159.203.100.198:5000/api/survey/index', {
	// 	    method: 'GET',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 			Authorization: 'Bearer '+auth.accessToken
	// 	  	}
	// 	  }) 
  //         .then((response) => response.json())
  //         .then((json) => setData(json))
  //         .catch((error) => console.error(error))
  //         .finally(() => setLoading(false))
  //       })
  // }
<<<<<<< HEAD:app/src/surveys/components/finalTable_previous.jsx
>>>>>>> 0c021f77e47ef4ac8779a8dd19a6036d4f16fe0b

<<<<<<< HEAD:app/src/surveys/components/finalTable.jsx
	/*GetSurveys().then(function(value) {
		console.log(value);
	})*/

<<<<<<< HEAD
=======
>>>>>>> 721b47acf3b06d1dafe49427cecdf1638da2354b:app/src/surveys/components/finalTable_previous.jsx
  console.log('Surveys: ' + GetSurveys());
=======
>>>>>>> 1fc9e03247c3779e40d3d3735eba922c3a5bc4d7:app/src/surveys/components/finalTable.jsx

	// GetSurveys().then(function(value){
	// 	console.log(value);
	// })

<<<<<<< HEAD:app/src/surveys/components/finalTable_previous.jsx
  //const [data] = React.useState(() => GetSurveys());
  // React.useEffect(() => {}, [data]);

  return (
    <div>
		  {/* <Table columns={columns} data={data} id="surveys" /> */}
		  {/* <Table columns={columns} data={data} id="surveys" /> */}
>>>>>>> 91103b72eb5f0a838f8cef247d2987dff97694ce
=======
=======
>>>>>>> 1fc9e03247c3779e40d3d3735eba922c3a5bc4d7:app/src/surveys/components/finalTable.jsx
  const [data] = React.useState(() => makeData(10000));
=======
>>>>>>> f8051312c62020ba1a4acb6dfbc877e7c80dd13e
  const [isLoading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState([]);
  const auth = useSelector(state => state.auth);

   useEffect(() => {
       getSurveys(auth.accessToken).then(function (responseJson) {
        setSurveys(responseJson)
        setLoading(false);
      })
   }, []);

  console.log('Survey value -> ' + surveys);		
  return (
    <div>
		  <Table columns={columns} data={surveys} id="surveys" />
<<<<<<< HEAD
		  {/* <Table columns={columns} data={data} id="surveys" /> */}
>>>>>>> 0c021f77e47ef4ac8779a8dd19a6036d4f16fe0b
=======
>>>>>>> f8051312c62020ba1a4acb6dfbc877e7c80dd13e
    </div>
  );
}

export default App;
