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
    const foodEmojis = ["🍕", "🍔", "🍜", "🍱", "🍣", "🍗", "🥘", "🥗"];
    const [currentEmojiIndex, setCurrentEmojiIndex] = React.useState(0);
    const [dots, setDots] = React.useState('');

    React.useEffect(() => {
        // Emoji animation
        const emojiInterval = setInterval(() => {
            setCurrentEmojiIndex((prev) => (prev + 1) % foodEmojis.length);
        }, 1000);

        // Dots animation
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        return () => {
            clearInterval(emojiInterval);
            clearInterval(dotsInterval);
        };
    }, []);

    return (
        <div className="relative min-h-[600px] bg-white rounded-2xl shadow-xl p-8">
            {/* Single Emoji Animation */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div 
                    key={currentEmojiIndex}
                    className="text-7xl animate-fadeInOut"
                >
                    {foodEmojis[currentEmojiIndex]}
                </div>
            </div>

            {/* Loading text */}
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-2xl font-medium text-gray-800 mb-4 flex items-center gap-2">
                    Preparing your bill
                    <span className="inline-block w-12 text-left">{dots}</span>
                </div>
                <div className="text-sm text-gray-600">
                    This will just take a moment
                </div>
            </div>
        </div>
    );
};

const Bill = ({ bill }) => {
    if (!bill) return null;
    
    const formattedDate = formatDate(bill.createdAt);

    return (
        <Card className="shadow-xl rounded-2xl overflow-hidden bg-white border border-gray-200 relative transform transition-all duration-300 hover:shadow-2xl">
            {/* Professional paper texture */}
            <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_48%,_#fafafa_49%,_#f5f5f5_51%,_transparent_52%)] bg-[length:20px_20px] opacity-30"></div>
            
            {/* Left binding effect */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-100 to-transparent"></div>

            <CardHeader className="relative z-10 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200 p-8 shadow-sm">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-serif text-gray-900">
                            {bill.hotelId?.name}
                        </h1>
                        <p className="text-sm text-gray-600 font-medium">{bill.hotelId?.address}</p>
                    </div>
                    <div className="text-right space-y-2">
                        <Badge variant="outline" className="px-4 py-1.5 bg-gradient-to-r from-gray-50 to-white border-gray-300 text-gray-700 font-medium shadow-sm">
                            Invoice #{bill._id}
                        </Badge>
                        <p className="text-sm text-gray-500">{formattedDate}</p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-8 relative z-10">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="border-b-2 border-blue-600 bg-[#1877F2] hover:bg-[#1877F2]">
                            <TableHead className="font-serif text-white text-base">Item</TableHead>
                            <TableHead className="text-center font-serif text-white text-base">Qty</TableHead>
                            <TableHead className="text-right font-serif text-white text-base">Price</TableHead>
                            <TableHead className="text-right font-serif text-white text-base">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bill.orderedItems?.map((item, index) => (
                            <TableRow key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-300">
                                <TableCell className="font-medium text-gray-900">{item.dishId?.name}</TableCell>
                                <TableCell className="text-center text-gray-700">{item.quantity}</TableCell>
                                <TableCell className="text-right text-gray-600">₹{item.dishId?.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right font-medium text-gray-900">
                                    ₹{(item.quantity * item.dishId?.price).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Subtle watermark */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                    <div className="text-[120px] font-serif text-gray-900 rotate-[-30deg]">PAID</div>
                </div>
            </CardContent>

            <CardFooter className="relative z-10 bg-gradient-to-b from-white to-gray-50 p-8 border-t border-gray-200">
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-xl font-serif font-semibold text-gray-900">₹{bill.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Discount</p>
                        <p className="text-xl font-serif font-semibold text-green-600">
                            - ₹{(bill.totalDiscount || 0).toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Final Amount</p>
                        <p className="text-2xl font-serif font-bold text-gray-900 animate-in slide-in-from-bottom duration-700">
                            ₹{(bill.totalAmount - (bill.totalDiscount || 0)).toFixed(2)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-700 font-medium">Thank you for dining with us!</p>
                        <p className="text-xs text-gray-500 mt-1">This is a computer-generated bill</p>
                    </div>
                </div>
            </CardFooter>

            {/* Professional corner fold effect */}
            <div className="absolute bottom-0 right-0 w-16 h-16">
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent via-gray-100 to-gray-200 transform rotate-45 translate-x-8 translate-y-8"></div>
            </div>
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


