import axios from 'axios';
import { z } from 'zod';

// Define Schemas
export const HerbItemSchema = z.object({
  name: z.string(),
  totalValue: z.number(),
});

export const HerbSummarySchema = z.object({
  year: z.coerce.number(),
  grandTotal: z.coerce.number(),
  herbs: z.array(HerbItemSchema),
});

const ApiResponseSchema = z.object({
  status: z.string(),
  message: z.string().optional(),
  data: HerbSummarySchema,
});

//  Export Types
export type HerbSummary = z.infer<typeof HerbSummarySchema>;
export type HerbItem = z.infer<typeof HerbItemSchema>;

const API_URL = import.meta.env.VITE_GOOGLE_API_URL;

export default {
  async getHerbSummary(year: number): Promise<HerbSummary> {
    if (!API_URL)
      throw new Error('VITE_GOOGLE_API_URL is not defined');

    try {
      const response = await axios.get(
        `${API_URL}?path=getHerbSummary&year=${year}`,
      );

      const parsedResult = ApiResponseSchema.safeParse(response.data);

      if (!parsedResult.success) {
        console.error('❌ Validation Error:', parsedResult.error.format());
        throw new Error('Invalid data structure received from API');
      }

      const { status, data, message } = parsedResult.data;

      if (status === 'success') {
        return data;
      }
      else {
        throw new Error(message || 'Failed to fetch herb summary');
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Network Error: ${error.message}`);
      }
      throw error;
    }
  },
};
