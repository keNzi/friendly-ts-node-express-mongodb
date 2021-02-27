import mongoose, { ModelOptions } from 'mongoose';

interface IApiItem {
    title: string;
    description: string;
}

interface ApiItemModelInterface extends mongoose.Model<ApiItemDoc> {
    build(attr: IApiItem): ApiItemDoc
}

interface ApiItemDoc extends mongoose.Document {
    title: string;
    description: string;
}

const apiItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

apiItemSchema.statics.build = (attr: IApiItem) => {
    return new ApiItem(attr);
}

const ApiItem = mongoose.model<ApiItemDoc, ApiItemModelInterface>("ApiItem", apiItemSchema)

ApiItem.build({
    title: 'Some Title',
    description: 'Some Description'
})

export { ApiItem }
