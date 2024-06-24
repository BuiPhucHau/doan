import { Controller, Get, Post, Body, Patch, Param, Delete ,Query,Put} from '@nestjs/common';
import { NewService } from './new.service';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';

@Controller('new')
export class NewController {
  constructor(private readonly newService: NewService) {}
// post create a new new
  @Post('create')
  async create(@Body() CreateNewDto: CreateNewDto) {
    try {
      const newNew = await this.newService.create(CreateNewDto);
      return newNew;
    } catch (err) {
        throw err
    }
  }
// get all news
  @Get('get-all')
  async findAll() {
    try {
      const news = await this.newService.findAll();
      return news;
    } catch (err) {
      throw err;
    }
  }
// update new
  @Put('update')
  async update(@Query('id') id: string, @Body() updateNewDto: UpdateNewDto) {
    try{
      const updatedNew = await this.newService.update(id, updateNewDto);
      return updatedNew;
    }
    catch(err){
      throw err;
    }
  }
// delete new
  @Delete('delete')
  async remove(@Query('id') id: string) {
    try{
      const deletedNew = await this.newService.remove(id);
      return deletedNew;
    }
    catch(err){
      throw err;
    }
  }
}
