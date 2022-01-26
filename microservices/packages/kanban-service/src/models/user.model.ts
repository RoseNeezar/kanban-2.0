import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class User {
  @prop({
    required: [true, 'Please tell use your name!'],
    unique: true,
    minlength: 5,
  })
  username: string;

  @prop()
  token: string;
}
