import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { Court, CourtDocument } from '@modules/court/court.schema';
import { Model, Types, FilterQuery } from 'mongoose';
import { CreateBookingDto, UpdateBookingDto, QueryBookingDto } from './dtos';
import { paginate } from '@shared/utils';
import { CacheService } from '@shared/services/cache.service';
import { BookingStatus, CourtStatus } from '@shared/enums';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private BookingModel: Model<BookingDocument>,
    @InjectModel(Court.name) private CourtModel: Model<CourtDocument>,
    private readonly cacheService: CacheService,
  ) {}

  async create(dto: CreateBookingDto, userId: string) {
    const court = await this.CourtModel.findById(dto.courtId);
    if (!court || court.status !== CourtStatus.ACTIVE) {
      throw new NotFoundException('Court not available');
    }

    const overlap = await this.BookingModel.findOne({
      courtId: new Types.ObjectId(dto.courtId),
      status: BookingStatus.CONFIRMED,
      $or: [
        { startTime: { $lt: dto.endTime }, endTime: { $gt: dto.startTime } },
      ],
    });

    if (overlap) {
      throw new BadRequestException('Court already booked in this time range');
    }

    const durationHours =
      (new Date(dto.endTime).getTime() - new Date(dto.startTime).getTime()) /
      (1000 * 60 * 60);
    const totalPrice = durationHours * court.pricePerHour;

    return await this.BookingModel.create({
      userId: new Types.ObjectId(userId),
      courtId: new Types.ObjectId(dto.courtId),
      startTime: dto.startTime,
      endTime: dto.endTime,
      totalPrice,
      status: BookingStatus.PENDING,
    });
  }

  async findAll(query: QueryBookingDto) {
    const { page = 1, limit = 10, status, userId, courtId } = query;
    const skip = (page - 1) * limit;

    const baseFilter: FilterQuery<BookingDocument> = { isDeleted: false };
    if (status) baseFilter.status = status;
    if (userId) baseFilter.userId = new Types.ObjectId(userId);
    if (courtId) baseFilter.courtId = new Types.ObjectId(courtId);

    const cacheKey = `bookings:all:${JSON.stringify(baseFilter)}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.BookingModel.find(baseFilter)
        .skip(skip)
        .limit(limit)
        .populate('userId courtId'),
      this.BookingModel.countDocuments(baseFilter),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findById(id: string) {
    const booking = await this.BookingModel.findOne({
      _id: id,
      isDeleted: false,
    }).populate('userId courtId');
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async update(id: string, dto: UpdateBookingDto) {
    const updated = await this.BookingModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Booking not found');

    await this.cacheService.deleteByPattern('bookings:*');
    return updated;
  }

  async restore(id: string) {
    const booking = await this.BookingModel.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true },
    );
    if (!booking) throw new NotFoundException('Booking not found');

    await this.cacheService.deleteByPattern('bookings:*');
    return booking;
  }

  async hardDelete(id: string) {
    const deleted = await this.BookingModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Booking not found');

    await this.cacheService.deleteByPattern('bookings:*');
    return deleted;
  }

  async softDelete(id: string) {
    const booking = await this.BookingModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
    if (!booking) throw new NotFoundException('Booking not found');

    await this.cacheService.deleteByPattern('bookings:*');
    return booking;
  }

  async findAllForPublic(query: QueryBookingDto, userId: string) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<BookingDocument> = {
      isDeleted: false,
      userId: new Types.ObjectId(userId),
    };
    if (status) filter.status = status;

    const cacheKey = `bookings:public:${userId}:${status || 'all'}:p${page}:l${limit}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) return cached;

    const result = await paginate(
      this.BookingModel.find(filter)
        .skip(skip)
        .limit(limit)
        .populate('courtId'),
      this.BookingModel.countDocuments(filter),
      page,
      limit,
    );

    await this.cacheService.set(cacheKey, result, 60);
    return result;
  }

  async findPublicById(id: string, userId: string) {
    const booking = await this.BookingModel.findOne({
      _id: id,
      isDeleted: false,
      userId: new Types.ObjectId(userId),
    }).populate('courtId');
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async cancel(id: string, userId: string) {
    const booking = await this.BookingModel.findOne({
      _id: id,
      isDeleted: false,
      userId: new Types.ObjectId(userId),
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (
      booking.status !== BookingStatus.PENDING &&
      booking.status !== BookingStatus.CONFIRMED
    ) {
      throw new BadRequestException(
        `Booking cannot be cancelled when status is ${booking.status}`,
      );
    }

    booking.status = BookingStatus.CANCELLED;
    booking.cancelledBy = new Types.ObjectId(userId);
    booking.cancelledAt = new Date();

    await booking.save();

    await this.cacheService.deleteByPattern('bookings:*');

    return booking;
  }
}
