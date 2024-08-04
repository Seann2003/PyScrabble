import React, { useState } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose, DialogOverlay } from './Dialog.tsx'; // Assuming you have these components already created
import { FaPlus, FaMinus } from "react-icons/fa";


const PointsDialog = () => {
    const [points, setPoints] = useState(0);
    const [toggles, setToggles] = useState({
        "2W": false,
        "3W": false,
        "2L": false,
        "3L": false,
    });

    const handleToggle = (key: string) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handlePointsChange = (amount: number) => {
        setPoints(points + amount);
    };
    const incrementPoints = () => setPoints((prevPoints) => prevPoints + 1);
  const decrementPoints = () => setPoints((prevPoints) => (prevPoints > 0 ? prevPoints - 1 : 0));
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="button">Add Points</button>
                </DialogTrigger>
                <DialogContent className="max-w-md mx-auto p-6 bg-slate-500 rounded-lg">
                    <DialogTitle>Enter the Amount of Points</DialogTitle>
                    <div className="flex justify-center items-center mt-4">
                        <button onClick={decrementPoints} className="p-2 border-2 border-slate-700 rounded-lg"><FaMinus /></button>
                        <div className="flex flex-col items-center mx-4">
                            <span className="text-lg font-bold">{points} PTS</span>
                        </div>
                        <button onClick={incrementPoints} className="p-2 border-2 border-slate-700 rounded-lg"><FaPlus /></button>
                    </div>
                    <div className="flex justify-center mt-4 gap-2">
                        {["2W", "3W", "2L", "3L"].map((item) => (
                            <button
                                key={item}
                            onClick={() => handleToggle(item)}
                            className={`p-2 border rounded-lg ${toggles[item] ? "bg-gray-700 text-white" : "bg-gray-300"}`}
                        >
                            {item}
                        </button>
                    ))}
                    </div>
                    <button className="mt-4 p-2 bg-gray-700 text-white rounded-lg w-full">Submit</button>

                </DialogContent>
            </Dialog>

        </>
    );
};

export default PointsDialog;
