import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { List } from './list.model';

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class Board {
  @prop({ required: [true, 'missing title!'] })
  title: string;

  @prop({
    ref: 'List',
  })
  kanbanListOrder: Ref<List>[];

  @prop({ required: [true, 'missing userId!'] })
  userId: string;
}
