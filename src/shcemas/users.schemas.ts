import * as z from 'zod';

export const UsersSchema = z
  .object({
    code: z.string().min(1, { message: 'Kode tidak boleh kosong' }),
    fullname: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
    experience: z.string().min(1, { message: 'Pengalaman tidak boleh kosong' }),
    email: z.string().email().min(1, { message: 'Email tidak boleh kosong' }),
    password: z.string().optional(),
    address: z.string().optional(),
    category_id: z
      .object({
        id: z.number().optional(),
        name: z.number().optional(),
      })
      .nullable(),
  })
  .transform((data) => {
    const newData: any = data;

    if (data.category_id) newData.category_id = data.category_id.id;

    return newData;
  });

export type UsersForm = z.infer<typeof UsersSchema>;
