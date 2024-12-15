// "use client";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { X } from "lucide-react";
// import { useCreateDish } from "@/hooks/dish/useCreateDish";
// import { Spinner } from "../ui/spinner";
// import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";

// export function AddDishDialog({ open, onOpenChange, onAdd }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [logo, setLogo] = useState("");
  
  

//   const {loading , handleCreateDish} = useCreateDish(onOpenChange);
//   const {loading : ingredientsLoading, ingredients = []} = useGetAllIngredients();


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleCreateDish({name, price, logo, ingredients});
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New Dish</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter dish name"
//               required
//             />
//           </div> 
//           {
//             ingredientsLoading && <Spinner/>
//           }
          
//           <div className="space-y-2">
//             <Label htmlFor="price">Price (₹)</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Enter price in Rupees"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="logo">Image URL</Label>
//             <Input
//               id="logo"
//               type="url"
//               value={logo}
//               onChange={(e) => setLogo(e.target.value)}
//               placeholder="Enter logo URL"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Ingredients</Label>
//             <div className="flex gap-2">
//               <Input
//                 value={'ingredient here'}
//                 placeholder="Add ingredient"
//               />
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
              
//             </div>
//           </div>

//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button type="submit">{loading ? <Spinner/> : "Add Dish"}</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useCreateDish } from "@/hooks/dish/useCreateDish";
import { Spinner } from "../ui/spinner";
import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import IngredientInput from "./component/SectMultiple";

export function AddDishDialog({ open, onOpenChange, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [logo, setLogo] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, handleCreateDish } = useCreateDish(onOpenChange);


  const handleSubmit = (e) => {
    e.preventDefault();
    const ingredientIds = selectedIngredients.map((ingredient) => ingredient._id);
    handleCreateDish({ name, price, logo, ingredients: ingredientIds });
  };

  const toggleIngredientSelection = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.some((item) => item._id === ingredient._id)
        ? prev.filter((item) => item._id !== ingredient._id)
        : [...prev, ingredient]
    );
  };

  // Filter ingredients based on the search term

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Dish</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">

          <IngredientInput selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter dish name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in Rupees"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Image URL</Label>
            <Input
              id="logo"
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="Enter logo URL"
              required
            />
          </div>

          

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{loading ? <Spinner /> : "Add Dish"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


// "use client";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Checkbox } from "@/components/ui/checkbox";
// import { X } from "lucide-react";
// import { useCreateDish } from "@/hooks/dish/useCreateDish";
// import { Spinner } from "../ui/spinner";
// import { useGetAllIngredients } from "@/hooks/ingredient/useGetAllIngredient";

// export function AddDishDialog({ open, onOpenChange }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [logo, setLogo] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedIngredients, setSelectedIngredients] = useState([]);

//   const { loading, handleCreateDish } = useCreateDish(onOpenChange);
//   const { loading: ingredientsLoading, ingredients = [] } = useGetAllIngredients();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const ingredientIds = selectedIngredients.map((ingredient) => ingredient._id);
//     handleCreateDish({ name, price, logo, ingredients: ingredientIds });
//   };

//   const toggleIngredientSelection = (ingredient) => {
//     setSelectedIngredients((prev) =>
//       prev.some((item) => item._id === ingredient._id)
//         ? prev.filter((item) => item._id !== ingredient._id)
//         : [...prev, ingredient]
//     );
//   };

//   const filteredIngredients = ingredients.filter((ingredient) =>
//     ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New Dish</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter dish name"
//               required
//             />
//           </div>

//           {ingredientsLoading && <Spinner />}

//           <div className="space-y-2">
//             <Label>Ingredients</Label>
//             <div className="relative">
//               <Input
//                 placeholder="Search ingredients..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full"
//               />
//               <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-full">
//                 <ScrollArea className="max-h-60">
//                   {filteredIngredients.map((ingredient) => (
//                     <div
//                       key={ingredient._id}
//                       className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => toggleIngredientSelection(ingredient)}
//                     >
//                       <Checkbox
//                         checked={selectedIngredients.some((item) => item._id === ingredient._id)}
//                         onCheckedChange={() => toggleIngredientSelection(ingredient)}
//                       />
//                       <span className="ml-2">{ingredient.name}</span>
//                     </div>
//                   ))}
//                   {filteredIngredients.length === 0 && (
//                     <div className="p-2 text-sm text-gray-500">No ingredients found</div>
//                   )}
//                 </ScrollArea>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {selectedIngredients.map((ingredient) => (
//                 <Badge key={ingredient._id} className="flex items-center gap-1">
//                   {ingredient.name}
//                   <X
//                     className="h-4 w-4 cursor-pointer"
//                     onClick={() => toggleIngredientSelection(ingredient)}
//                   />
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="price">Price (₹)</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Enter price in Rupees"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="logo">Image URL</Label>
//             <Input
//               id="logo"
//               type="url"
//               value={logo}
//               onChange={(e) => setLogo(e.target.value)}
//               placeholder="Enter logo URL"
//               required
//             />
//           </div>

        

//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//               Cancel
//             </Button>
//             <Button type="submit">{loading ? <Spinner /> : "Add Dish"}</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
