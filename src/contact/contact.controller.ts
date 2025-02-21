import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './contact.dto';
import { DatabaseService } from 'src/database/database.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('contact')
@ApiTags('Actualizacion Contacto')
export class ContactController {
  constructor(private readonly siService: ContactService, private readonly databaseService: DatabaseService) {}

  @Post()
  @ApiOperation({summary: 'Actualiza el contacto y la pareja en Hubspot-Meditex-Central'})
  @ApiResponse({
      status: 200,
      description:"{ message: 'Datos enviados exitosamente', hubspot: {}, meditex: {}, central: {} }"
    })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() data: ContactDto) {
    try{
      console.log("***** DATOS DE Hubspot ***** : ",data)
      const centralResponse = await this.databaseService.updateData(data)

      return({
          ok: true,
          status: 200,
          msg: centralResponse 
      });
    }catch (err) {
      return({ 
          ok: false,
          status: err.response?.status || 500, 
          msg: err.response?.data || err.message || 'Error desconocido'
      })           
    }
  }
}
