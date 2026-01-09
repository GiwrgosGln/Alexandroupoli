export interface User {
  id: string;
  username: string;
  email: string;
  image_url: string;
  role: "user" | "admin";
  created_at: string;
  theme: "light" | "dark";
  language: "en" | "el";
  user_type: "local" | "tourist";
  opt_in_events_push: boolean;
  opt_in_events_email: boolean;
  onboarding_step: number;
  onboarding_completed: boolean;
}
