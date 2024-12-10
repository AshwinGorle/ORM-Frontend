// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import Link from "next/link";
// import { Building2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";

// const formSchema = z.object({
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(1, "Password is required"),
// });

// export default function LoginPage() {
//     const router = useRouter();
//     const { toast } = useToast();
//     const [isLoading, setIsLoading] = useState(false);

//     const form = useForm({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//         email: "",
//         password: "",
//         },
//     });

//     const onSubmit = async (values) => {
//         setIsLoading(true);
//         try {
//             console.log(values);
//             toast({
//                 title: "Success!",
//                 description: "You have successfully logged in.",
//             });
//             router.push("/dashboard");
//         } 
//         catch (error) {
//         toast({
//             title: "Error",
//             description: "Invalid credentials. Please try again.",
//             variant: "destructive",
//         });
//         }
//         finally {
//         setIsLoading(false);
//         }
//     };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <Building2 className="mx-auto h-12 w-12 text-primary" />
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Or{" "}
//             <Link href="/signup" className="text-primary hover:text-primary/90">
//               create a new account
//             </Link>
//           </p>
//         </div>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email address</FormLabel>
//                   <FormControl>
//                     <Input type="email" placeholder="john@example.com" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="••••••••" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing in..." : "Sign in"}
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { parseCookies } from "nookies";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "@/hooks/auth";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["hotelowner", "superadmin"]),
});

console.log("server URl", process.env.NEXT_PUBLIC_SERVER_URL)

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {loading, handleLogin} = useLogin();

  useEffect(() => {
    const cookies = parseCookies();
    console.log("cookies check ", cookies);
    if (cookies.token) {
      router.push("/dashboard/owners");
    }
  }, [router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("hook-login-req : ", values);
    handleLogin(values)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Building2 className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-3xl">Sign in</CardTitle>
          <p className="text-sm text-muted-foreground">
            Or{" "}
            <Link href="/signup" className="text-primary hover:underline">
              create a new account
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 text-sm text-red-500 bg-red-50 rounded">
              {error}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value); // Update the form state
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="hotelowner">Hotel Owner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}