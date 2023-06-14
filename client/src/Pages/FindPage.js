import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Header from "../Header/Header";
import Table from "react-bootstrap/Table";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Items = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100vh", width: "100%" }), []);
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "ID",
      valueGetter: "node.rowIndex+1",
      width: 75,
      filter: true,
    },
    { field: "rack", filter: true },
    { field: "row", filter: true },
    { field: "column", filter: true },
    { field: "name", filter: true },
    { field: "amount" },
  ]);

  const onGridReady = useCallback((params) => {
    fetch("http://192.168.254.116:3000/items")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }));

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  return (
    <div style={containerStyle}>
      <Header />
      <div className="outer-div">
        <div className="button-bar"></div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              onFirstDataRendered={onFirstDataRendered}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
