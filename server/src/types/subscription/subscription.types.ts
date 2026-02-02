// server/src/types/subscription/subscription.types.ts

export interface ISubscription {
    id: string;
    schoolId: string;
    planId: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISubscriptionPlan {
    id: string;
    name: string;
    price: number;
    durationInMonths: number;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}