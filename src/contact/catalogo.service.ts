import { Injectable } from '@nestjs/common';

@Injectable()

export class CatalogoService {
  private catalogoTipoProfesion = {
    11: "Comerciante",
    12: "Desempleado",
    13: "Empleado no profesionista",
    14: "Empleado profesionista",
    15: "Empresario",
    16: "Hogar",
    17: "Otro"
  };
  private catalogoECivil = {
    1: "Single",
    'casado': "Married",
    3: "Free union",
    4: "Otro",
  };
  private catalogoPais = {   
    'Estados Unidos': "United States",
  };
  private catalogoServicio = {
    1: "Programas de Fertilidad",
    2: "Subrogado",
    3: "More",
  };
  private catalogoSucursal = {
    "Masculino": "M",
    "Femenino": "F",
    "No especificado": "N",
  };
  private catalogoSubTipoPaciente = {
    1: "Programas de Fertilidad",
    2: "Subrogado",
    3: "More",
  };
  getEquivalenteProfesion(valor: string): string {
    return this.catalogoTipoProfesion[valor] || valor;
  }
  getEquivalentePais(valor: string): string {
    return this.catalogoPais[valor] || valor;
  }
  getEquivalenteECivil(valor: string): string {
    return this.catalogoECivil[valor] || valor; 
  }
  getEquivalenteSucursal(valor: string): string {
    return this.catalogoSucursal[valor] || valor; 
  }  
  getEquivalenteTipoServicio(valor: string): string {
    return this.catalogoServicio[valor] || valor; 
  }  
  getEquivalenteSubTipoPaciente(valor: string): string {
    return this.catalogoSubTipoPaciente[valor] || valor; 
  }   
}

