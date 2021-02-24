class Api {
    defaultMethod() {
        return `You have reached ${this.constructor.name} defaultMethod`;
    }
}

export = new Api();
