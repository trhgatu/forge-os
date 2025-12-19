import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../../application/ports/user.repository';
import { User, UserDocument } from '../schemas/iam-user.schema';
import { CreateUserDto, UpdateUserDto } from '../../dto';
import { paginate } from '@shared/utils';

@Injectable()
export class MongoUserRepository implements UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        return this.userModel.create(dto);
    }

    async findAll(query: any): Promise<any> {
        const { page = 1, limit = 10, keyword } = query;
        const skip = (page - 1) * limit;
        const search = keyword ? { name: { $regex: keyword, $options: 'i' } } : {};

        return paginate(
            this.userModel
                .find(search)
                .skip(skip)
                .limit(limit)
                .populate('roleId')
                .select('-password -refreshToken'),
            this.userModel.countDocuments(search),
            Number(page),
            Number(limit),
        );
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).populate('roleId').exec();
    }

    async findByIdWithRoleAndPermissions(id: string): Promise<User | null> {
        return this.userModel
            .findById(id)
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permissions',
                },
            })
            .exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).populate('roleId').exec();
    }

    async update(id: string, dto: UpdateUserDto): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async updateRefreshToken(
        id: string,
        refreshToken: string | null,
    ): Promise<void> {
        await this.userModel.findByIdAndUpdate(id, { refreshToken }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).exec();
    }
}
