export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  providerName: string;
  durationMinutes: number;
  tags: string[];
}

export type Category = string;

export interface FormData {
  fullName: string;
  phone: string;
  preferredDate: string;
}

export interface FormErrors {
  fullName?: string;
  phone?: string;
  preferredDate?: string;
}

export type ScreenState = "loading" | "error" | "empty" | "ok";

export type RootStackParamList = {
  Home: undefined;
  Detail: { service: Service };
  Request: { service: Service };
};
