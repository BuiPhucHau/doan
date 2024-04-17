import { Module } from '@nestjs/common';
import { NewService } from './new.service';
import { NewController } from './new.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageSchema } from 'src/storage/entities/storage.entity';
import { NewSchema } from './entities/new.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
       { name: 'New', schema: NewSchema},
       {name: 'Storage', schema: StorageSchema},
        
      ]),
  ],
  controllers: [NewController],
  providers: [NewService],
  exports: [NewService]
})
export class NewModule {}