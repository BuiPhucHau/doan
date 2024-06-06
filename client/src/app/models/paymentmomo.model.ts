export interface PaymentMomo {
    status: number;
    data: {
        partnerCode: string;
        requestId: string;
        amount: string;
        orderId: string;
        responseTime: string;
        message: string;
        resultCode: number;
        payUrl: string;
        shortLink: string;
    };
    }
