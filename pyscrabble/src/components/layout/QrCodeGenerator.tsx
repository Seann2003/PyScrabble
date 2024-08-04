import React from 'react';
import QRCode from 'qrcode.react';

const QrCodeGenerator = ({ url }) => {
    return (
        <div className='flex flex-col items-center'>
            <QRCode value={url} size={256} />
            <p>Scan this QR code to go to the Easy Question page.</p>
        </div>
    );
};

export default QrCodeGenerator;
