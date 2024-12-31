// "use client";

// import { MoreVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Image from "next/image";
// const defaultDishLogo = "https://static.vecteezy.com/system/resources/previews/010/354/788/original/main-dish-icon-colorful-flat-design-illustration-graphics-free-vector.jpg"
// import { useRouter } from "next/navigation";


// export default function DishCard({ dish, onEdit }) {
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(price);
//   };
  
//   const router = useRouter();

//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="relative h-48 w-full">
//         <Image
//           src={dish.logo ? dish.logo : defaultDishLogo}
//           alt={dish.name}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//       </div>
//       <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//         <CardTitle className="text-xl font-bold">{dish.name}</CardTitle>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => router.push(`/dashboard/configuration/dishes/dish-details/${dish._id}`)}>
//               Edit Dish
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           <div>
//             <p className="text-sm font-medium text-muted-foreground mb-2">
//               Ingredients:
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {dish.ingredients.map((ingredient, index) => (
//                 <Badge key={index} variant="secondary">
//                   {ingredient.name}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-muted-foreground">Price:</span>
//             <span className="text-lg font-bold text-primary">
//               {formatPrice(dish.price)}
//             </span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }   


// this id the updated code of dish card by CHIRAG 
// added best seller , offer and out of stock tags
"use client";

import { MoreVertical, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
const defaultDishLogo = "https://static.vecteezy.com/system/resources/previews/010/354/788/original/main-dish-icon-colorful-flat-design-illustration-graphics-free-vector.jpg"
import { useRouter } from "next/navigation";
import { useDeleteDish } from '@/hooks/dish/useDeleteDish';

export default function DishCard({ dish, onEdit }) {
  const {loading , handleDeleteDish} = useDeleteDish();
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleDeleteDishLocal = (dishId)=>{
    handleDeleteDish(dishId)
  }
  
  const router = useRouter();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={dish.logo ? dish.logo : defaultDishLogo}
          alt={dish.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {dish.offer && (
            <Badge className="absolute top-2 right-28 bg-green-500 text-white">
            {dish.offer.description}
          </Badge>
          )}
        {dish.bestSeller && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
            Best Seller
          </Badge>
        )}
        {dish.outOfStock && (
          <Badge className="absolute bottom-2 right-2 bg-red-500 text-white">
            Out of Stock
          </Badge>
        )}
      </div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-bold">{dish.name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/dashboard/configuration/dishes/dish-details/${dish._id}`)}>
              Edit Dish
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteDishLocal(dish?._id?.toString())}>
             <span className="text-red-600">Delete Dish</span>  <Trash2 color='red'/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Ingredients:
            </p>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary">
                  {ingredient.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price:</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(dish.price)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

