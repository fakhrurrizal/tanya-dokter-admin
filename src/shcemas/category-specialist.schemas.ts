import * as z from 'zod';

export const CategorySpecialistSchema = z.object({
  image: z.string().min(1, { message: 'Gambar tidak boleh kosong' }),
  code: z.string().min(1, { message: 'Kode tidak boleh kosong' }),
  name: z.string().min(1, { message: 'Nama tidak boleh kosong' }),
  description: z.string().min(1, { message: 'Keterangan tidak boleh kosong' }),
  status: z.number().optional(),
});

export type CategorySpecialistForm = z.infer<typeof CategorySpecialistSchema>;
