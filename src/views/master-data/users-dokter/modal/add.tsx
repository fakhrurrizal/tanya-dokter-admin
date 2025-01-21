import { ModalCustom } from "@/components";
import { queryClient } from "@/pages/_app";
import { UsersForm, UsersSchema } from "@/shcemas/users.schemas";
import { objectClear } from "@/utils/helpers";
import { useAddUsers } from "@/utils/mutations/use-users.mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormDataBranch from "./FormData";

interface ModalAdd {
  open: boolean;
  toggle: () => void;
}

const AddCategorySpecialist = (props: ModalAdd) => {
  const { open, toggle } = props;

  const { mutateAsync: add_users } = useAddUsers();

  const addUserForm = useForm<UsersForm>({
    defaultValues: {
      fullname: "",
      code: "",
      experience: "",
      category_id: null,
      role_id: 3,
      email: "",
      password: "Password@123",
    },
    resolver: zodResolver(UsersSchema),
  });
  const { reset } = addUserForm;

  const onSubmit: any = async (data: UsersForm) => {
    try {
      const BranchData = objectClear<UsersForm>(data);

      await add_users(BranchData);

      queryClient.invalidateQueries({ queryKey: ["LIST_GET_USERS"] });

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
        title="Tambah Dokter"
        toggle={handleClose}
        buttonOkProps={{ onClick: addUserForm.handleSubmit(onSubmit) }}
      >
        <FormDataBranch form={addUserForm} />
      </ModalCustom>
    </>
  );
};

export default AddCategorySpecialist;
