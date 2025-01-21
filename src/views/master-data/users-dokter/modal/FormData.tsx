import { CustomTextField } from "@/components";
import { ServerSideAutoComplete } from "@/components/auto-complete/server-side-auto-complete.component";
import { UsersForm } from "@/shcemas/users.schemas";
import Grid from "@mui/material/Grid";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<UsersForm>;
  readOnly?: boolean;
}

const FormDataUsers = ({ form, readOnly = false }: Props) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <>
      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name="code"
            label="Kode Dokter"
            placeholder="Masukan Kode Dokter"
            textUppercase
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name="fullname"
            label="Nama Dokter"
            placeholder="Masukan Nama Dokter"
            InputLabelProps={{ shrink: true }}
            isReadOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name="email"
            label="Email Dokter"
            placeholder="Masukan Email Dokter"
            InputLabelProps={{ shrink: true }}
            isReadOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <ServerSideAutoComplete<UsersForm, { id: number; label: string }, any>
            control={control}
            endpoint="category_specialst"
            name="category_id"
            label="Pilih Kategori"
            formatOptions={(response) => {
              const options = response.data;

              if (!options) return [];

              return options.map((option: any) => ({
                id: option.id,
                label: option.name,
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            control={control}
            name="experience"
            label="Pengalaman"
            placeholder="Masukan Pengalaman Dokter"
            isReadOnly={readOnly}
            multiline
            minRows={4}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FormDataUsers;
