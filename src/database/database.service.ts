import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async updateData(data: any) {
    try {
      const result = await this.dataSource.query(
        "UPDATE Central.dbo.Paciente SET " +
                  "pac_nhc_definitivo = '" + (data.nhc || '') + "' " +          
                  "WHERE pac_email = '" + (data.direccion || '') + "';"      
      );
      return result;
    } catch (error) {
      console.error('Error ejecutando SP:', error);
      throw new Error(`Error ejecutando SP:  ${error.message}`);
    }
  }
}