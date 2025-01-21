import { ModalCustom } from "@/components";
import axiosInterceptor from "@/config/axios.config";
import { queryClient } from "@/pages/_app";

import { zodResolver } from "@hookform/resolvers/zod";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import FormDataBranch from "./FormDataDrugs";
import { getApi } from "@/utils/constants";
import { DataDrugsResponse } from "@/types";
import { DataDrugsForm, DataDrugsSchema } from "@/shcemas/data-drugs.schemas";

interface ModalEdit {
  open: boolean;
  toggle: () => void;
  row: DataDrugsResponse["data"];
}

const EditDataDrugs = (props: ModalEdit) => {
  const { open, toggle, row } = props;

  const endpoints = queryString.stringifyUrl({
    url: getApi("data_drugs"),
  });

  const editDataDrugsForm = useForm<DataDrugsForm>({
    defaultValues: {
      name: row?.name,
      code: row?.code,
      description: row?.description,
      image: row?.image,
      usage: row?.usage,
    },
    resolver: zodResolver(DataDrugsSchema),
  });
  const { reset } = editDataDrugsForm;

  const onSubmit = async (data: DataDrugsForm) => {
    try {
      await axiosInterceptor.put(`${endpoints}/${row?.id}`, {
        ...data,
      });

      queryClient.invalidateQueries({ queryKey: ["LIST_DATA_DRUGS_ALL"] });

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
      title="Edit Data Obat"
      toggle={handleClose}
      buttonOkProps={{
        onClick: editDataDrugsForm.handleSubmit(onSubmit),
        children: "Ubah",
      }}
    >
      <FormDataBranch form={editDataDrugsForm} />
    </ModalCustom>
  );
};

export default EditDataDrugs;
