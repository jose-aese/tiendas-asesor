import { Injectable } from '@angular/core';
import { Buffer, createDecipheriv ,createCipheriv} from 'browser-crypto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Cypher {
  private request = environment.request;
  private response = environment.response;
  private vector = environment.vector
  // constructor() {}
  encrypt = textPain => {
    let cipher = createCipheriv('aes-256-cbc', this.request, this.vector);
    let encrypted = cipher.update(textPain + '', 'utf8', 'base64');
    return encrypted += cipher.final('base64');
    // return encrypted;
  };

  decrypt = encrypted => {
    try {
    let decipher = createDecipheriv('aes-256-cbc', this.response, this.vector);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
    } catch (err) {
      console.log(err);
      // throw new Exception(400, ERROR_400_0001, MENSAJE_ERROR_400_0001, err);
    }
  };


  decryptStorage = encrypted => {
    try {
    let decipher = createDecipheriv('aes-256-cbc', this.request, this.vector);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
    } catch (err) {
      console.log(err);
      // throw new Exception(400, ERROR_400_0001, MENSAJE_ERROR_400_0001, err);
    }
  };

  /**
 * 
 * 
 * @param schema  JSONSchema para iterar
 * @param objeto  obteto descrito por el JSONSchema
 * @param units   Funcion que actuara como cipher
 */
  doFinal = async function (schema, objeto, cipher) {
    // console.log('schema', JSON.stringify(schema));
    // console.log('keys', JSON.stringify(Object.keys(schema)));
    // console.info('objeto', JSON.stringify(objeto));
    var fieldNames = Object.keys(schema.properties);
    var schemaProperties = schema.properties;
    var limit = fieldNames.length;
    for (var i = 0; i < limit; i++) {
      var fieldName = fieldNames[i];
      var schemaValue = schemaProperties[fieldName];
      //console.log('schemaValue', JSON.stringify(schemaValue));
      var objectValue = objeto[fieldName];
      //console.log('fieldName', fieldName, 'encriptado', schemaValue.encrypted);
      //console.log('objectValue', JSON.stringify(objectValue));

      if (fieldName == 'estrellas' && objectValue) {
        objeto[fieldName] = objectValue.toFixedDown(1);
        continue;
      }

      if (objectValue && schemaValue.type == 'object' && schemaValue.encrypted) {
        await this.doFinal(schemaValue, objectValue, cipher);
        continue;
      }

      if (objectValue && schemaValue.type == 'array' && schemaValue.items.type == 'object' && schemaValue.encrypted) {
        var arrayItemSchema = schemaValue.items;
        for (var j = 0; j < objectValue.length; j++) {
          await this.doFinal(arrayItemSchema, objectValue[j], cipher);
        }
        continue;
      }

      if (objectValue && schemaValue.type == 'array' && schemaValue.items.type == 'string' && schemaValue.encrypted) {
        var promesas = [];
        for (let j = 0; j < objectValue.length; j++) {
          promesas.push(cipher(objectValue[j]));
        }
        objeto[fieldName] = await Promise.all(promesas); //requiere try catch pero en este esquema dejaremos que la excepcion se propague al catch principal
        continue;
      }

      if (!objectValue && schemaValue.default) {
        objectValue = schemaValue.default;
        objeto[fieldName] = objectValue;
      }
      if ((objectValue || objectValue == '') && schemaValue.encrypted) {
        try {
          objeto[fieldName] = await cipher(objectValue);
        }
        catch (err) {
          console.log("errro")
          console.log(err);
          console.log("errro2")
          // throw new Exception(400, ERROR_400_0001, MENSAJE_ERROR_400_0001, err);
        }
        //console.log('objectValue', objeto[fieldName]);
        continue;
      }

    }
  };
}