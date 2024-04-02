import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationSchema } from './entities/location.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageSchema } from 'src/storage/entities/storage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
       { name: 'Location', schema: LocationSchema},
       {name: 'Storage', schema: StorageSchema},
        
      ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService]
})
export class LocationModule {}
