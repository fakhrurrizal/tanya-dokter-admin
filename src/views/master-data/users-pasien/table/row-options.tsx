import { queryClient } from "@/pages/_app";

import ModalDelete from "@/components/modal-delete";
import axiosInterceptor from "@/config/axios.config";
import { getApi } from "@/utils/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import EditUsers from "../modal/edit";

interface Props {
  data: any;
}

const RowOptions = (data: Props) => {
  const UserData = data?.data;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const toggleEdit = () => {
    setOpenEdit(!openEdit);
    handleRowOptionsClose();
  };

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const toggleDelete = () => {
    setOpenDelete(!openDelete);
    handleRowOptionsClose();
  };

  const handleDelete = async () => {
    axiosInterceptor
      .delete(`${getApi("user")}/${UserData?.id}`)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["LIST_GET_USERS"] });
        toggleDelete();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <MoreVertOutlinedIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem sx={{ "& svg": { mr: 1 } }} onClick={toggleEdit}>
          <EditIcon sx={{ fontSize: "17px" }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ "& svg": { mr: 1 } }} onClick={toggleDelete}>
          <DeleteIcon sx={{ fontSize: "17px" }} />
          Hapus
        </MenuItem>
      </Menu>
      {openDelete && (
        <ModalDelete
          toggle={toggleDelete}
          handleDelete={handleDelete}
          name={UserData?.name}
          open={openDelete}
        />
      )}
      {openEdit && (
        <EditUsers toggle={toggleEdit} open={openEdit} row={UserData} />
      )}
    </>
  );
};

export default RowOptions;
