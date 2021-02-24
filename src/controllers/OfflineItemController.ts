class OfflineItem {
    defaultMethod() {
        return {
            text: `You have reached ${this.constructor.name} defaultMethod`
        };
    }
}

export = new OfflineItem();
