import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrScanner = () => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        const onScanError = (decodedText) => {
            // Handle the decoded text, for example, redirect to another page
        };
        const onScanSuccess = (decodedText: string) => {
            // Handle the decoded text, for example, redirect to another page
            window.location.href = decodedText;
        };

        scanner.render(onScanSuccess, onScanError);

        // Clean up on unmount
        return () => {
            scanner.clear().catch((error) => {
                console.error('Failed to clear html5QrcodeScanner', error);
            });
        };
    }, []);

    return (
        <div className='text-white'>
            <h1>Scan QR Code</h1>
            <div id="reader" style={{ width: "100%" }}></div>
        </div>
    );
};

export default QrScanner;
