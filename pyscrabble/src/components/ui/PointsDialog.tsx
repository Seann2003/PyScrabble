import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from './Dialog.tsx';
import { FaPlus, FaMinus } from "react-icons/fa";

interface PointsDialogProps {
  onSubmitPoints: (points: number) => void;
}

const PointsDialog: React.FC<PointsDialogProps> = ({ onSubmitPoints }) => {
    const [points, setPoints] = useState(0);

    const handlePointsChange = (amount: number) => {
        setPoints(prevPoints => Math.max(0, prevPoints + amount));
    };

    const handleSubmit = () => {
        onSubmitPoints(points);
        setPoints(0);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="button">Add Points</button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto p-6 bg-slate-500 rounded-lg">
                <DialogTitle>Enter the Amount of Points</DialogTitle>
                <div className="flex justify-center items-center mt-4">
                    <button onClick={() => handlePointsChange(-1)} className="p-2 border-2 border-slate-700 rounded-lg"><FaMinus /></button>
                    <div className="flex flex-col items-center mx-4">
                        <span className="text-lg font-bold">{points} PTS</span>
                    </div>
                    <button onClick={() => handlePointsChange(1)} className="p-2 border-2 border-slate-700 rounded-lg"><FaPlus /></button>
                </div>
                
                <DialogClose asChild>
                    <button onClick={handleSubmit} className="mt-4 p-2 bg-gray-700 text-white rounded-lg w-full">Submit</button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default PointsDialog;