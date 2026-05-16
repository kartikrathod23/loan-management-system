interface LoanCalculationInput {
    principalAmount: number;
    interestRate: number;
    tenureDays: number;
}

export const calculateLoanDetails = (payload: LoanCalculationInput) => {
    const { principalAmount, interestRate, tenureDays, } = payload;
    // const yearlyInterest = (principalAmount * interestRate) / 100;
    const totalInterest =(principalAmount *interestRate *tenureDays) /(365 * 100);
    const totalRepayment =principalAmount +totalInterest;
    const monthlyEMI =totalRepayment/(tenureDays / 30);


    return {
        totalInterest: Number(totalInterest.toFixed(2)),
        totalRepayment: Number(totalRepayment.toFixed(2)),
        monthlyEMI: Number(monthlyEMI.toFixed(2)),
    };
};