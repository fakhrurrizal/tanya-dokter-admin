import HeaderSectionTableCustom from "@/components/custom-table/header";
import PaginationSectionTableCustom from "@/components/custom-table/pagination";
import CustomStyledTable from "@/components/custom-table/table/custom-styled-table";
import CustomStyledTableContainer from "@/components/custom-table/table/custom-styled-table-container";
import {
  CustomStyledTableData,
  CustomStyledTableHead,
} from "@/components/custom-table/table/custom-styled-table-head";
import CustomStyledTableRow from "@/components/custom-table/table/custom-styled-table-row";
import TableHeaderCustomTable from "@/components/custom-table/table/header";
import ToolbarSectionTableCustom from "@/components/custom-table/toolbar";
import { useDataDrugsAllParams } from "@/utils/queries/use-data-drugs.quer";
import { SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import { Fragment, useCallback, useEffect, useState } from "react";
import AddCategorySpecialist from "./modal/add";
import RowOptions from "./table/row-options";
import { DataDrugsResponse } from "@/types";

const HeaderItems = [
  {
    label: "No.",
    alignCenter: false,
  },
  {
    label: "Kode Obat",
    alignCenter: false,
  },
  {
    label: "Gambar",
    alignCenter: false,
  },
  {
    label: "Nama Obat",
    alignCenter: false,
  },
  {
    label: "Pemakaian",
    alignCenter: false,
  },
  {
    label: "Keterangan",
    alignCenter: false,
  },
  {
    label: "Action",
    alignCenter: true,
  },
];

const DataDrugsListPageViews = () => {
  const [pageSize, setPageSize] = useState<number>(10);

  const [page, setPage] = useState<number>(1);

  const [searchValue, setSearchValue] = useState("");

  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  const [addOpen, setAddOpen] = useState<boolean>(false);

  dayjs.locale("id");

  const {
    data: { data: DataDrugsList = [], recordsFiltered = 0 } = { data: [] },
    isLoading,
  } = useDataDrugsAllParams({
    limit: Number(pageSize),
    page: Number(page),
    search: debouncedSearchValue,
  });

  const handleLimitChange = useCallback((e: SelectChangeEvent) => {
    setPageSize(parseInt(e.target.value, 10));
  }, []);

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const toggleAdd = () => setAddOpen(!addOpen);

  return (
    <>
      <div className="custom__styled__container">
        <HeaderSectionTableCustom title={"Data Obat"} />

        <ToolbarSectionTableCustom
          searchValue={searchValue}
          handleSearch={handleSearch}
          toggleAdd={toggleAdd}
          addButtonLabel={"Buat Baru"}
          disabledFilter={true}
        />
        <CustomStyledTableContainer
          isLoading={isLoading}
          recordsFiltered={recordsFiltered}
        >
          <CustomStyledTable>
            <TableHeaderCustomTable data={HeaderItems} />

            <tbody className="text-xs">
              {!isLoading &&
                Array.isArray(DataDrugsList) &&
                DataDrugsList?.map(
                  (item: DataDrugsResponse["data"], index: number) => {
                    const noUrut = index + 1 + (page - 1) * pageSize;

                    return (
                      <Fragment key={index}>
                        <CustomStyledTableRow>
                          <CustomStyledTableHead>
                            {noUrut}
                          </CustomStyledTableHead>
                          <CustomStyledTableHead>
                            {item?.code}
                          </CustomStyledTableHead>
                          <CustomStyledTableHead>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src={item?.image}
                              alt={item?.code}
                            />
                          </CustomStyledTableHead>

                          <CustomStyledTableData>
                            {item?.name}
                          </CustomStyledTableData>
                          <CustomStyledTableData>
                            {item?.usage}
                          </CustomStyledTableData>
                          <CustomStyledTableData>
                            {item?.description}
                          </CustomStyledTableData>

                          <CustomStyledTableData className="text-center">
                            <RowOptions data={item} />
                          </CustomStyledTableData>
                        </CustomStyledTableRow>
                      </Fragment>
                    );
                  },
                )}
            </tbody>
            {/* table body */}
          </CustomStyledTable>
        </CustomStyledTableContainer>
        {/* table section */}

        {/* Paginasi */}
        <PaginationSectionTableCustom
          page={page}
          pageSize={pageSize}
          recordsFiltered={recordsFiltered}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
        />
        {/* Paginasi */}
      </div>

      {addOpen && <AddCategorySpecialist open={addOpen} toggle={toggleAdd} />}
    </>
  );
};

export default DataDrugsListPageViews;
