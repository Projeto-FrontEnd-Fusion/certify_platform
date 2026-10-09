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
  activityName: z.string().min(5, "Informe ao menos 5 caracteres para o nome da atividade").max(200),
  workload: z.string().refine(value => Number.isInteger(Number(value)) && Number(value) > 0, 'Informe uma carga horária inteira maior que zero'),
  startDate: z.string().min(1, 'Informe a data de início'),
  endDate: z.string().min(1, 'Informe a data de término'),
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
        name: z.string().min(2, "Informe ao menos 2 caracteres para o nome"),
        email: z.email("E-mail inválido"),
      }),
    )
    .min(1, "Adicione ao menos um participante")
    .max(200, 'O limite é de 200 participantes por lote'),
});

export const certificateFormSchema = z
  .object({
    variant: variantSchema,
    ...stepOneSchema.shape,
    ...stepTwoSchema.shape,
  })
  .superRefine((data, ctx) => {
    if (data.endDate < data.startDate) {
      ctx.addIssue({code: 'custom', path: ['endDate'], message: 'A data de término deve ser igual ou posterior ao início'});
    }
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
