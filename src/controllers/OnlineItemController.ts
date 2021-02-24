import ErrorHandler from '../models/ErrorHandler';

const Number1: number = 1;
const Number2: number = 2;

function addNumbers(num1: number, num2: number) {
    return num1 + num2;
}

class OnlineItem {
    defaultMethod() {
        // return {
        //     text: `You have reached ${this.constructor.name} defaultMethod`
        // }
        // throw new ErrorHandler(501, 'Not implemented method');
        return "Treść plus wynik: " + addNumbers(Number1, Number2)
    }
}

export = new OnlineItem();
