import IconifyIcon from "@/components/icon";
import {
  Button,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";

type View = "card" | "table";

interface Props {
  searchValue?: string;
  handleSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFilter?: () => void;
  disabledFilter?: boolean;
  toggleAdd?: () => void;
  addButtonLabel?: string;
  disabledAdd?: boolean;
  disabledSearch?: boolean;
  enableViewOptions?: boolean;
  view?: string;
  handleView?: (_event: React.MouseEvent<HTMLElement>, newView: View) => void;
  buttonDownload?: () => void;
  buttonUpload?: () => void;
  disabledDownload?: boolean;
  disableUpload?: boolean;
  filterInfo?: any;
  selectedItem?: boolean;
  numSelected?: number;
  selectedButtonLabel?: any;
  selectAllButtonLabel?: string;
  onClickButtonSelected?: any;
}

const ToolbarSectionTableCustom = ({
  searchValue,
  handleSearch,
  toggleFilter,
  disabledFilter,
  toggleAdd,
  addButtonLabel,
  disabledAdd,
  enableViewOptions,
  view,
  handleView,
  buttonDownload,
  buttonUpload,
  disabledSearch,
  filterInfo,
  selectedItem = false,
  numSelected = 0,
  selectedButtonLabel = "",
  onClickButtonSelected,
}: Props) => {
  return (
    <div className="transition-all duration-500">
      {!selectedItem && (
        <section className="p-5 duration-300 transition-all">
          <div className="flex justify-between">
            {/* option button left */}

            <div className="flex gap-2 items-center">
              {/* <Button
                                variant='outlined'
                                // onClick={() => setAddOpen(true)}
                                className='!p-2 !min-w-0 disabled:!cursor-not-allowed !text-slate-400 !border-slate-400 hover:!text-red-500 hover:!border-red-500 hover:!bg-white !shadow-sm'
                            >
                                <IconifyIcon icon='material-symbols:delete-outline' />
                            </Button> */}
              <ButtonGroup variant="contained">
                {buttonDownload && (
                  <Tooltip title="Download data">
                    <Button
                      variant="outlined"
                      onClick={buttonDownload}
                      className="!p-1 !min-w-[120px] disabled:!cursor-not-allowed !text-slate-400 !border-slate-400 hover:!text-blue-500 hover:!border-blue-500 hover:!bg-white"
                      startIcon={
                        <IconifyIcon icon="material-symbols:download" />
                      }
                    >
                      Download
                    </Button>
                  </Tooltip>
                )}
                {buttonUpload && (
                  <Tooltip title="Upload data">
                    <Button
                      variant="outlined"
                      onClick={buttonUpload}
                      className="!p-1 !min-w-[120px] disabled:!cursor-not-allowed !text-slate-400 !border-slate-400 hover:!text-blue-500 hover:!border-blue-500 hover:!bg-white"
                      startIcon={<IconifyIcon icon="material-symbols:upload" />}
                    >
                      Upload
                    </Button>
                  </Tooltip>
                )}
              </ButtonGroup>
            </div>

            {/* option button left */}

            <div className="flex gap-3 items-center">
              {/* option button right */}
              {enableViewOptions && (
                <div>
                  <ToggleButtonGroup
                    exclusive
                    color="primary"
                    value={view}
                    onChange={handleView}
                  >
                    <ToggleButton
                      value="table"
                      className="!p-1 !min-w-0 disabled:!cursor-not-allowed !text-slate-400 !border-slate-400 hover:!text-blue-500 hover:!border-blue-500 hover:!bg-white"
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ color: "white" }}>
                            Table View
                          </Typography>
                        }
                      >
                        <IconifyIcon icon="mynaui:table" />
                      </Tooltip>
                    </ToggleButton>

                    <ToggleButton
                      value="card"
                      className="!p-1 !min-w-0 disabled:!cursor-not-allowed !text-slate-400 !border-slate-400 hover:!text-blue-500 hover:!border-blue-500 hover:!bg-white"
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ color: "white" }}>
                            Grid View
                          </Typography>
                        }
                      >
                        <IconifyIcon icon="mingcute:grid-line" />
                      </Tooltip>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              )}
              {/* option button right */}

              {/* search bar */}
              <div>
                <div className="min-w-[350px] w-full">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only "
                  >
                    Search
                  </label>
                  <div className="relative focus:outline-none">
                    <div className="flex items-center">
                      {filterInfo && (
                        <div className="flex align-middle justify-center mr-5">
                          {filterInfo}
                        </div>
                      )}
                      <div className="relative">
                        {!disabledSearch && (
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer active:outline-none">
                            <svg
                              className="w-4 h-4 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className={`flex justify-end w-full`}>
                        {!disabledSearch && (
                          <input
                            id="default-search"
                            className={`block w-full py-2  ps-10 text-sm text-gray-900 border border-slate-400 rounded-l-md focus:!outline-none focus:border-blue-500 hover:border-blue-500 focus:outline-blue-500 ${
                              disabledFilter ? "!rounded-r-md" : ""
                            }`}
                            placeholder="Search..."
                            value={searchValue}
                            onChange={handleSearch}
                          />
                        )}

                        {!disabledFilter && (
                          <Button
                            type="submit"
                            variant="outlined"
                            size="large"
                            className={`bg-blue-700  focus:outline-none focus:ring-blue-300 !font-medium !text-sm !rounded-md !text-slate-500 !border-slate-400 hover:!text-blue-500 hover:!border-blue-500 hover:!bg-white ${
                              disabledSearch
                                ? "!rounded-l-md"
                                : "!rounded-l-none !border-l-0"
                            }`}
                            startIcon={<IconifyIcon icon="cil:filter" />}
                            onClick={toggleFilter}
                          >
                            Filter
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* search bar */}

              {/* button create new */}
              {!disabledAdd && (
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    className="!font-semibold !text-sm"
                    onClick={toggleAdd}
                  >
                    {addButtonLabel}
                  </Button>
                </div>
              )}
              {/* button create new end */}
            </div>
          </div>
        </section>
      )}

      {selectedItem && (
        <section className="p-5 transition-all duration-500">
          <div className="flex justify-between h-full rounded-md bg-blue-100">
            <div className="flex-1 flex items-center px-[10px] py-[13px] rounded-l-md">
              <p className="text-sm font-semibold">
                Row Selected: {numSelected}
              </p>
            </div>

            <div className="flex gap-3 items-center">
              {/* button create new */}
              <div>
                <Button
                  variant="contained"
                  size="large"
                  className="!font-semibold !text-sm !mr-[6px]"
                  onClick={onClickButtonSelected}
                >
                  {selectedButtonLabel}
                </Button>
              </div>
              {/* button create new end */}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ToolbarSectionTableCustom;
