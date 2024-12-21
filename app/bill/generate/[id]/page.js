"use client";

import React from 'react';
import { useRouter, useParams } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Ban, CreditCard, RefreshCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGetUser } from "@/hooks/auth/useGetUser";
import { useGetTableBill } from "@/hooks/bill/useGetTableBill";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
};

const BillShimmer = () => {
    return (
        <div className="animate-pulse">
            <Card className="shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200/30 relative">
                {/* Professional binding effect shimmer */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-200/40 via-slate-100/30 to-transparent"></div>
                
                {/* Texture overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/20"></div>

                <CardHeader className="bg-gradient-to-r from-slate-50/40 to-white/30 border-b border-slate-200/30 p-8">
                    <div className="flex justify-between items-center relative z-10">
                        <div className="space-y-3">
                            <div className="h-10 w-64 bg-gradient-to-r from-slate-200/60 to-slate-100/60 rounded-lg"></div>
                            <div className="h-4 w-48 bg-gradient-to-r from-slate-100/60 to-slate-50/60 rounded"></div>
                        </div>
                        <div className="space-y-2 text-right">
                            <div className="h-8 w-36 bg-gradient-to-r from-slate-100/60 to-slate-50/60 rounded-full"></div>
                            <div className="h-4 w-24 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded ml-auto"></div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-8 relative">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow className="border-b-2 border-slate-200/30">
                                {['w-24', 'w-16', 'w-20', 'w-24'].map((width, i) => (
                                    <TableHead key={i} className={i > 0 ? 'text-right' : ''}>
                                        <div className={`h-5 ${width} bg-gradient-to-r from-slate-200/60 to-slate-100/60 rounded ${i > 0 ? 'ml-auto' : ''}`}></div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3].map((item) => (
                                <TableRow key={item} className="border-b border-slate-100/30">
                                    <TableCell><div className="h-5 w-40 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded"></div></TableCell>
                                    <TableCell className="text-center"><div className="h-5 w-8 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded mx-auto"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-5 w-20 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded ml-auto"></div></TableCell>
                                    <TableCell className="text-right"><div className="h-5 w-24 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded ml-auto"></div></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Professional corner effect */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent via-slate-100/20 to-slate-200/30 transform rotate-45 translate-x-8 translate-y-8"></div>
                </CardContent>

                <CardFooter className="bg-gradient-to-b from-transparent via-slate-50/30 to-slate-100/20 p-8 border-t border-slate-200/30">
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="space-y-2">
                                <div className="h-4 w-20 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded"></div>
                                <div className="h-7 w-28 bg-gradient-to-r from-slate-200/60 to-slate-100/60 rounded"></div>
                            </div>
                        ))}
                        <div className="text-right space-y-2">
                            <div className="h-4 w-32 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded ml-auto"></div>
                            <div className="h-4 w-24 bg-gradient-to-r from-slate-100/40 to-slate-50/40 rounded ml-auto"></div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

const Bill = ({ bill }) => {
    if (!bill) return null;
    
    const formattedDate = formatDate(bill.createdAt);

    return (
        <Card className="shadow-2xl rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 relative transform transition-all duration-300 hover:scale-[1.002] hover:shadow-slate-200/50">
            {/* Professional binding effect */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-200 via-slate-100 to-transparent shadow-inner"></div>
            
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>

            <CardHeader className="bg-gradient-to-r from-slate-50/80 to-white/90 border-b border-slate-200/50 p-8">
                <div className="flex justify-between items-center relative z-10">
                    <div className="space-y-3">
                        <h1 className="text-4xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
                            {bill.hotelId?.name}
                        </h1>
                        <p className="text-sm text-slate-600 font-medium tracking-wide">{bill.hotelId?.address}</p>
                    </div>
                    <div className="space-y-2 text-right">
                        <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-slate-50/80 border-slate-200/80 text-slate-700 backdrop-blur-sm">
                            Bill ID: {bill._id}
                        </Badge>
                        <p className="text-xs text-slate-500 font-medium">{formattedDate}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-8 relative backdrop-blur-sm backdrop-saturate-150">
                <Table className="w-full relative z-10">
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b-2 border-slate-200/50">
                            <TableHead className="font-serif font-semibold text-slate-800">Item</TableHead>
                            <TableHead className="text-center font-serif font-semibold text-slate-800">Qty</TableHead>
                            <TableHead className="text-right font-serif font-semibold text-slate-800">Price</TableHead>
                            <TableHead className="text-right font-serif font-semibold text-slate-800">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bill.orderedItems?.map((item, index) => (
                            <TableRow key={index} className="hover:bg-slate-50/30 transition-colors duration-200 border-b border-slate-100">
                                <TableCell className="font-medium text-slate-700">{item.dishId?.name}</TableCell>
                                <TableCell className="text-center text-slate-600">{item.quantity}</TableCell>
                                <TableCell className="text-right text-slate-600">₹{item.dishId?.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right font-medium text-slate-700">
                                    ₹{(item.quantity * item.dishId?.price).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Professional corner fold */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent via-slate-100/30 to-slate-200/40 transform rotate-45 translate-x-8 translate-y-8 backdrop-blur-sm"></div>
            </CardContent>

            <CardFooter className="bg-gradient-to-b from-transparent via-slate-50/30 to-slate-100/20 p-8 border-t border-slate-200/50">
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="backdrop-blur-sm">
                        <p className="text-sm text-slate-600">Subtotal</p>
                        <p className="text-xl font-serif font-bold text-slate-800">₹{bill.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="backdrop-blur-sm">
                        <p className="text-sm text-slate-600">Discount</p>
                        <p className="text-xl font-serif font-bold text-emerald-600">
                            - ₹{(bill.totalDiscount || 0).toFixed(2)}
                        </p>
                    </div>
                    <div className="backdrop-blur-sm">
                        <p className="text-sm text-slate-600">Final Amount</p>
                        <p className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
                            ₹{(bill.totalAmount - (bill.totalDiscount || 0)).toFixed(2)}
                        </p>
                    </div>
                    <div className="text-right backdrop-blur-sm">
                        <p className="text-sm text-slate-600 font-medium">Thank you for dining with us!</p>
                        <p className="text-xs text-slate-500 mt-1 italic">Visit again</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};

export default function BillPage() {
    const router = useRouter();
    const { id } = useParams();
    const { user } = useGetUser();
    const { bill, loading, refreshBill } = useGetTableBill(id);

    const hotelId = user?.hotelId;

    const handleCancelBill = () => {
        router.push('/bill/table/' + id);
    };

    const handlePaymentConfirm = () => {
        router.push('/order-page/' + hotelId);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
                    <div className="flex justify-end mb-4">
                        <div className="h-9 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <BillShimmer />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700">
                            Generate Bill
                        </h1>
                        <p className="text-slate-600 mt-1">Review and process customer bill</p>
                    </div>
                    
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={refreshBill}
                        className="gap-2 hover:bg-slate-50 transition-colors"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Refresh Bill
                    </Button>
                </div>

                <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-pink-500/10 rounded-full blur-2xl" />
                    
                    {/* Main content */}
                    <div className="relative backdrop-blur-sm">
                        <Bill bill={bill} />
                        
                        <div className="mt-8 flex justify-between items-center">
                            <Button 
                                variant="outline" 
                                size="lg"
                                onClick={handleCancelBill}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                            >
                                <Ban className="h-5 w-5 mr-2" />
                                Cancel Bill
                            </Button>
                            
                            <div className="flex gap-4">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    onClick={() => window.print()}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <Printer className="h-5 w-5 mr-2" />
                                    Print Bill
                                </Button>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button 
                                            size="lg"
                                            className="bg-green-600 hover:bg-green-700 text-white transition-colors gap-2"
                                        >
                                            <CreditCard className="h-5 w-5" />
                                            Complete Payment
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-2xl font-serif">
                                                Confirm Payment
                                            </AlertDialogTitle>
                                            <AlertDialogDescription className="text-slate-600">
                                                Please confirm that the customer has completed the payment.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="hover:bg-slate-50">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handlePaymentConfirm}
                                                className="bg-green-600 hover:bg-green-700 text-white transition-colors"
                                            >
                                                Confirm Payment
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


