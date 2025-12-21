import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { UserRepository } from '../../application/ports/user.repository';
import { User, UserDocument } from '../schemas/iam-user.schema';
import { CreateUserDto, UpdateUserDto } from '../../dto';
import { QueryUserDto } from '../../dto/query-user.dto';
import { PaginatedResult } from '@shared/interfaces/paginated-result.interface';
import { paginate } from '@shared/utils/paginate';
import { User as UserEntity } from '../../domain/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const createdUser = new this.userModel(dto);
    const savedUser = await createdUser.save();
    return UserMapper.toDomain(savedUser);
  }

  async findAll(query: QueryUserDto): Promise<PaginatedResult<UserEntity>> {
    const { page = 1, limit = 10, keyword } = query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Default to isDeleted: false if not specified
    const isDeleted = query.isDeleted
      ? String(query.isDeleted) === 'true'
      : false;

    const search: FilterQuery<UserDocument> = { isDeleted };
    if (keyword) {
      search.name = { $regex: keyword, $options: 'i' };
    }

    const result = await paginate(
      this.userModel
        .find(search)
        .skip(skip)
        .limit(limitNum)
        .populate('roleId')
        .select('-password -refreshToken'),
      this.userModel.countDocuments(search),
      pageNum,
      limitNum,
    );

    return {
      ...result,
      data: result.data.map((doc) => UserMapper.toDomain(doc as UserDocument)),
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).populate('roleId');
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByIdWithRoleAndPermissions(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).populate({
      path: 'roleId',
      populate: { path: 'permissions' },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).populate('roleId');
    return user ? UserMapper.toDomain(user) : null;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('roleId');
    return updatedUser ? UserMapper.toDomain(updatedUser) : null;
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }

  async restore(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      isDeleted: false,
      deletedAt: null,
    });
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { refreshToken });
  }

  async save(user: UserEntity): Promise<void> {
    // DDD-style save if we manipulate entity directly
    // This requires converting Entity back to Persistence format
    const persistence = UserMapper.toPersistence(user);
    await this.userModel.updateOne(
      { _id: user.id.toString() },
      { $set: persistence },
      { upsert: true },
    );
  }
}
