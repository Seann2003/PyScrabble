import React from "react";
import QRCode from "qrcode.react";
import { Button } from "../components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";
const EasyQuestionPageUrl = "http://localhost:3001/easyQuestion";
const MediumQuestionPageUrl = "http://localhost:3001/mediumQuestion";
const HardQuestionPageUrl = "http://localhost:3001/hardQuestion";
const InsaneQuestionPageUrl = "http://localhost:3001/insaneQuestion";


const QrCodePage = () => {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col items-center gap-y-10 justify-center  text-white">
            <Button onClick={() => navigate(-1)} className='bg-slate-700 p-3 text-2xl md:text-3xl font-medium lg:text-4xl hover:bg-slate-800 text-white self-start mt-10 w-36 h-auto rounded-none' size={'lg'}>Back</Button>
            <h1 className="text-4xl font-bold">PRINT THIS PAGE OUT</h1>

            <div className="flex  items-center text-3xl gap-x-6 justify-center">
                <span>2 LETTER</span>      
                <QRCode value={EasyQuestionPageUrl} size={200} />
                <span>3 LETTER</span>    
                <QRCode value={MediumQuestionPageUrl} size={200} />
            </div>
            <div className="flex  items-center text-3xl justify-center">
                
            </div>
            <div className="flex  items-center text-3xl gap-x-6 justify-center">
                <span>2 WORD</span>
                <QRCode value={HardQuestionPageUrl} size={200} />
                <span>3 WORD</span>
                <QRCode value={InsaneQuestionPageUrl} size={200} />
            </div>

            <div className="flex  items-center text-3xl justify-center">
                
            </div>
        </section>
    );
};

export default QrCodePage;