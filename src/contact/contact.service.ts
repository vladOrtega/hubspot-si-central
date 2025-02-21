import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CatalogoService } from './catalogo.service';
import * as https from 'https'
import axios from 'axios';



@Injectable()
export class ContactService {

  private hubspotApiUrl: string;
  private meditexApiUrl: string;
  private hubspotApiKey: string;
  private meditexApiKey: string;

  constructor(private configService: ConfigService, private readonly catalogoService: CatalogoService) {
    this.hubspotApiUrl = this.configService.get<string>('URL_HUBSPOT','');
    this.meditexApiUrl = this.configService.get<string>('URL_MEDITEX','');
    this.hubspotApiKey = this.configService.get<string>('API_KEY_HUBSPOT','');
    this.meditexApiKey = this.configService.get<string>('KEY_MEDITEX','');
  }


  async getContactIdByEmail(email:string) {
      const url = `${this.hubspotApiUrl}search`;
      
      const headers = {
        Authorization: `Bearer ${this.hubspotApiKey}`,
        'Content-Type': 'application/json',
      };

      const data = {
          "filterGroups": [
              {
                  "filters": [
                      {
                          "propertyName": "email",
                          "operator": "EQ",
                          "value": email
                      }
                  ]
              }
          ]
      };

      try {
          const response = await axios.post(url, data, { headers });
          if (response.data.total > 0) {
              return response.data.results[0].id; 
          } else {
              return null;
          }
      } catch (error) {
          console.error("Error buscando contacto:", error.response?.data || error.message);
          return null;
      }
  }

 
  async sendToMeditexBase(data: any, endpoint: string, service:any) {
    try {

        let Nombre, APaterno, FNacimiento, NHC, Email;
  
        service == 1 ? Nombre = data.nombre : Nombre = data.nombre_pareja;
        service == 1 ? APaterno = data.apaterno : APaterno = data.apellidop_pareja; 
        service == 1 ? FNacimiento = data.fechanac : FNacimiento = data.fechanac_pareja; 
        service == 1 ? NHC = data.nhc : NHC = data.nhc_pareja; 
        service == 1 ? Email = data.email : Email = ''; 
        let Sucursal  = this.catalogoService.getEquivalenteSucursal(data.sucursal);
        let Tipo  = this.catalogoService.getEquivalenteSubTipoPaciente(data.tipopaciente);

        const strpost = {
            "PAD": [
              {
                "PAD121": `${Nombre}`,
                "PAD122": `${APaterno}`,
                "PAD178": 'W',
                "PAD53": `${FNacimiento}`,
                "PAD58": `${Sucursal}`,
                "PAD141": `${NHC}`,
                "PAD140": `${Email}`,
                "PAD51": `Paciente ${Tipo}`
              }
            ]
          }

      const response = await axios.post(
        endpoint,
        strpost,
        {
          headers: {
            Authorization: `${this.meditexApiKey}`,
            'Content-Type': 'application/json',
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          })
        },
      );
      return response.data;
    } catch (error) {
      console.log("----****----",error )
      throw new HttpException(        
        `Error enviando a Meditex: ${error.response?.data?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  async sendToMeditex(data: any) {        
    let MeditexPaciente = await this.sendToMeditexBase(data,  `${this.meditexApiUrl}create_patient`, 1);
    let MeditexPareja=""
    data.nhc_pareja ? MeditexPareja = await this.sendToMeditexBase(data, `${this.meditexApiUrl}create_patient`, 2):"";
    
    return { "Patient": MeditexPaciente,  "Partner": MeditexPareja }
  }
  
  async sendToMeditexPartner(data: any) {
    return this.sendToMeditexBase(data, `${this.meditexApiUrl}create_patient`, 2);
  }
}

