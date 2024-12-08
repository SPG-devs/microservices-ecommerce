import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define the schema for the Product model
@Schema({ versionKey: false })
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
