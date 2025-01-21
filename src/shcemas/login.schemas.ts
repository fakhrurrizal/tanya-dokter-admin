import { z } from "zod";

export const loginSchemas = z.object({
  email: z.string().min(1, { message: "Email tidak boleh kosong" }).email(),
  password: z
    .string()
    .min(1, { message: "Password tidak boleh kosong" })
    .superRefine((password, context) => {
      if (password.length < 8) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password harus lebih dari 8 huruf",
        });
      }
    }),
});

export type LoginForm = z.infer<typeof loginSchemas>;
