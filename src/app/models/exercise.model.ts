export interface Exercise {
  id?: number;              // optional (if some exercises don't use id)
  name: string;
  sets: number;
  reps: number | string;    // supports "30 sec"
  image?: string;           // optional if some use video
  videoUrl?: string;        // optional for future expansion
}
