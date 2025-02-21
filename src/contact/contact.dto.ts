import { IsString, IsInt, IsOptional, IsNotEmpty, IsEmail, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactDto {  
    @ApiProperty({ example: 'test@gmail.com', description: 'Email de paciente' })
    @IsEmail()
    correo: string;
    
    @ApiProperty({ example: 518233, description: 'Nhc del Usuario' })
    @IsInt()
    @IsNotEmpty()
    nhc: number;
  
    @ApiProperty({ example: 563964980, description: 'Id del pbb del Usuario' })
    @IsInt()
    @IsNotEmpty()
    pbb: number;  

    @ApiProperty({ example: 61151553, description: 'Id del Medico del Usuario' })
    @IsInt()
    @IsNotEmpty()
    medico: number;
  
    @ApiProperty({ example: 61151553, description: 'Id de la enfermera del Usuario' })
    @IsInt()
    @IsNotEmpty()
    enfermera: number;
  }