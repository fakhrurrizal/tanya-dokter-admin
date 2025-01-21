import { ModalCustom } from "@/components";
import axiosInterceptor from "@/config/axios.config";
import { queryClient } from "@/pages/_app";

import { UsersForm, UsersSchema } from "@/shcemas/users.schemas";
import { getApi } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import FormDataBranch from "./FormData";

interface ModalEdit {
  open: boolean;
  toggle: () => void;
  row: any;
}

const EditUsers = (props: ModalEdit) => {
  const { open, toggle, row } = props;

  console.log(row);

  const endpoints = queryString.stringifyUrl({
    url: getApi("user"),
  });

  const editUsersForm = useForm<UsersForm>({
    defaultValues: {
      fullname: row?.fullname,
      email: row?.email,
      code: row?.code,
      role_id: row?.role_id,
      experience: row?.experience,
      category_id: {
        id: row?.category?.id,
        label: row?.category?.name,
      },
    },
    resolver: zodResolver(UsersSchema),
  });
  const {
    reset,
    formState: { errors },
  } = editUsersForm;

  const onSubmit = async (data: UsersForm) => {
    try {
      await axiosInterceptor.put(`${endpoints}/${row?.id}`, {
        ...data,
      });

      queryClient.invalidateQueries({ queryKey: ["LIST_GET_USERS"] });

      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    toggle();
    reset();
  };

  return (
    <ModalCustom
      maxWidth="sm"
      open={open}
      title="Edit Dokter"
      toggle={handleClose}
      buttonOkProps={{
        onClick: editUsersForm.handleSubmit(onSubmit),
        children: "Ubah",
      }}
    >
      <FormDataBranch form={editUsersForm} />
    </ModalCustom>
  );
};

export default EditUsers;
