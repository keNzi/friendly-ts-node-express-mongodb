import ErrorHandler from '../models/ErrorHandler';

class OnlineItem {
    defaultMethod() {
        // return {
        //     text: `You have reached ${this.constructor.name} defaultMethod`
        // }
        throw new ErrorHandler(501, 'Not implemented method');
    }
}

export = new OnlineItem();
