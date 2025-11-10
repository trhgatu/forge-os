// test.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test, TestDocument } from './test.schema';
import { Model } from 'mongoose';
import { CreateTestInput } from './test.validator';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private readonly testModel: Model<TestDocument>,
  ) {}

  async create(data: CreateTestInput) {
    const doc = new this.testModel(data);
    return doc.save();
  }

  async getAll() {
    return this.testModel.find().sort({ createdAt: -1 });
  }
}
