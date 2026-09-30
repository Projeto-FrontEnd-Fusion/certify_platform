import { z } from "zod";

export const variantSchema = z.enum(["classico", "moderno", "ornamental", "sem-borda"]);

export const selectTemplateSchema = z.object({
  variant: variantSchema,
});

export const uploadedImageSchema = z.object({
  dataUrl: z.string(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
});

export type UploadedImage = z.infer<typeof uploadedImageSchema>;

export const stepOneSchema = z.object({
  activityType: z.string().min(1, "Selecione o tipo de atividade"),
  description: z.string().min(1, "Selecione a descrição"),
  activityName: z.string().min(3, "Informe o nome da atividade"),
  workload: z.string().min(1, "Informe a carga horária"),
  modalityEnabled: z.boolean(),
  modality: z.string().optional(),
  validityEnabled: z.boolean(),
  validity: z.string().optional(),
  syllabusEnabled: z.boolean(),
  syllabus: z.string().optional(),
  logo: uploadedImageSchema.optional(),
  signature: uploadedImageSchema.optional(),
});

export const stepTwoSchema = z.object({
  participants: z
    .array(
      z.object({
        name: z.string().min(1, "Nome obrigatório"),
        email: z.email("E-mail inválido"),
      }),
    )
    .min(1, "Adicione ao menos um participante"),
});

export const certificateFormSchema = z
  .object({
    variant: variantSchema,
    ...stepOneSchema.shape,
    ...stepTwoSchema.shape,
  })
  .superRefine((data, ctx) => {
    if (data.modalityEnabled && !data.modality) {
      ctx.addIssue({ code: "custom", path: ["modality"], message: "Selecione a modalidade" });
    }
    if (data.validityEnabled && !data.validity) {
      ctx.addIssue({ code: "custom", path: ["validity"], message: "Selecione a validade" });
    }

    if (data.syllabusEnabled && (!data.syllabus || data.syllabus.trim() === "")) {
      ctx.addIssue({ 
        code: "custom", 
        path: ["syllabus"], 
        message: "O conteúdo programático é obrigatório" 
      });
    }
  });

export type SelectTemplateData = z.infer<typeof selectTemplateSchema>;
export type CertificateFormData = z.infer<typeof certificateFormSchema>;