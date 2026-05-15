interface LoanCalculationInput {
    principalAmount: number;
    interestRate: number;
    tenureMonths: number;
}

export const calculateLoanDetails = (payload: LoanCalculationInput) => {
    const { principalAmount, interestRate, tenureMonths, } = payload;
    const yearlyInterest = (principalAmount * interestRate) / 100;
    const totalInterest = (yearlyInterest * tenureMonths) / 12;
    const totalRepayment = principalAmount + totalInterest;
    const monthlyEMI = totalRepayment / tenureMonths;

    return {
        totalInterest: Number(totalInterest.toFixed(2)),
        totalRepayment: Number(totalRepayment.toFixed(2)),
        monthlyEMI: Number(monthlyEMI.toFixed(2)),
    };
};