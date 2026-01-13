import { Schema, Query, Document } from 'mongoose';

export interface SoftDeleteDocument extends Document {
  isDeleted: boolean;
  deletedAt?: Date;
}

type SoftDeleteQuery = Query<unknown, SoftDeleteDocument>;

export function SoftDeletePlugin(schema: Schema) {
  schema.add({
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  });

  schema.pre(/^find/, function (this: SoftDeleteQuery, next) {
    if (this.getFilter().isDeleted === undefined) {
      this.where({ isDeleted: false });
    }
    next();
  });

  schema.pre('countDocuments', function (this: SoftDeleteQuery, next) {
    if (this.getFilter().isDeleted === undefined) {
      this.where({ isDeleted: false });
    }
    next();
  });
}
