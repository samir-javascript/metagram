
import * as z from "zod"
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 characters" }),
  media:z.custom() ,
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});
  export const UserFormValidation = z.object({
    name: z.string().min(3, { message: "Minimum 3 characters." }).max(150, { message: "Maximum 150 characters." }),
    username: z.string().min(3, { message: "Minimum 3 characters." }).max(150, { message: "Maximum 150 characters." }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(50, { message: "Password cannot exceed 50 characters." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    gender: z.string(),
  });
  export const UserLoginFormValidation = z.object({
   
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string().min(3,{message:"Please make sure to fill out this feild"})
  });
  const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(50, { message: "Password cannot exceed 50 characters." })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  });

export const ResetPasswordValidation = z.object({
  password: passwordSchema,
  confirmPassword: z.string()
});
  export const UserValidation = z.object({
   
    email: z.string().email({ message: "Invalid email format" }),
    name: z.string().min(3,{message:"Please make sure to fill out this feild"}),
      username: z.string().min(3,{message:"Please make sure to fill out this feild"}),
      gender: z.string(),
      picture: z.custom(),
      bio: z.string().nullish(),
      location: z.string().nullish()
   });
  
   export const ForgetPasswordValidation = z.object({
   
    email: z.string().email({ message: "Invalid email format" }),
    
   });
  