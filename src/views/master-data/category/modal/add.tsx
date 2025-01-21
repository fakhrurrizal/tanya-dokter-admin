import { queryClient } from "@/pages/_app";
import { useAuth } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormDataBranch from "./FormDataCategorySpecialist";
import { toast } from "react-toastify";
import { useAddCategorySpecialist } from "@/utils/mutations";
import { objectClear } from "@/utils/helpers";
import { ModalCustom } from "@/components";
import {
  CategorySpecialistForm,
  CategorySpecialistSchema,
} from "@/shcemas/category-specialist.schemas";

interface ModalAdd {
  open: boolean;
  toggle: () => void;
}

const AddCategorySpecialist = (props: ModalAdd) => {
  const { open, toggle } = props;

  const { mutateAsync: add_Branch } = useAddCategorySpecialist();

  const addCategorySpecialistForm = useForm<CategorySpecialistForm>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      image: "",
      status: 1,
    },
    resolver: zodResolver(CategorySpecialistSchema),
  });
  const { reset } = addCategorySpecialistForm;

  const onSubmit: any = async (data: CategorySpecialistForm) => {
    try {
      const BranchData = objectClear<CategorySpecialistForm>(data);

      await add_Branch(BranchData);

      queryClient.invalidateQueries({
        queryKey: ["LIST_CATEGORY_SPECIALIST_ALL"],
      });

      toggle();
      reset();
    } catch (error: any) {
      console.log("errors", error?.response.status);
    }
  };

  const handleClose = () => {
    toggle();
    reset();
  };

  return (
    <>
      <ModalCustom
        maxWidth="sm"
        open={open}
        title="Tambah Kategori"
        toggle={handleClose}
        buttonOkProps={{
          onClick: addCategorySpecialistForm.handleSubmit(onSubmit),
        }}
      >
        <FormDataBranch form={addCategorySpecialistForm} />
      </ModalCustom>
    </>
  );
};

export default AddCategorySpecialist;
