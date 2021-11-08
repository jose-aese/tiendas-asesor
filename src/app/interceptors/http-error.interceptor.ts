import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, TimeoutError } from 'rxjs';
import { catchError, map, timeoutWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Spiner } from '../services/spiner.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    urlSinNoti: string;
    urlSinEncry: string;
    constructor(
        public spiner: Spiner,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spiner.open()
        return next.handle(req).pipe(timeoutWith(15000,
            throwError(new TimeoutError())), map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    event = event.clone(event);
                    event = event.clone(this.validacionRespuesta(event));
                    return event;
                }
            }),
            catchError(error => {
                console.log(error);
                let errorMessage = '';
                if (error instanceof TimeoutError) {
                    errorMessage = "Error al Intentar conectar con el Servidor. Por favor, vuelva a intentarlo más tarde."
                } else {
                    if (error instanceof ErrorEvent) {
                        const errorMSG = error.error;
                        errorMessage = ` ${errorMSG.message}`;
                    } else {
                        switch (error.status) {
                            case 0:
                                errorMessage = "Surgió un Error. Por favor, vuelva a intentarlo más tarde."
                                break;
                            case 401:
                                if (error.error.message == "Unauthorized")
                                    errorMessage = "Error en las credenciales";
                                else if (error.error.message == "jwt expired")
                                    errorMessage = "La sesión ya expiro";
                                else
                                    errorMessage = "No tienes permiso para ejecutar esta operación.";
                                break;
                            case 403:
                                errorMessage = "No tienes permiso para ejecutar esta operación.";
                                break;
                            case 200:
                                errorMessage = "Recurso no encontrado.";
                                break;
                            case 400:
                                errorMessage = error.error.mensaje ||  "Surgió un Error.";;
                                break;
                            case 404:
                                    errorMessage = error.error.mensaje ||  "Surgió un Error.";
                                    break;
                            default:
                                errorMessage = "Surgió un Error."
                                break;
                        }
                    }
                }

                Swal.fire({
                    icon: 'error',
                    text: errorMessage,
                    timer: 4000,
                    timerProgressBar: true,
                    showCloseButton: false,
                    showConfirmButton: false
                });
                return throwError({
                    errorMessage,
                    status: error.status,
                    error
                });
            })
        );
    }


    private validacionRespuesta(event) {
        let errorMessage = ""
        if (event.body === null) {
            errorMessage = "La Respuesta Obtenida es Nula"
            Swal.fire({
                icon: 'error',
                text: errorMessage,
                timer: 4000,
                timerProgressBar: true,
                showCloseButton: false,
                showConfirmButton: false
            });
            throw new HttpErrorResponse({
                error: {
                    error: 'Error del Servidor',
                    message: errorMessage
                },
                headers: event.headers,
                status: 300,
                statusText: 'Warning',
                url: event.url,
            });
        } else {
            return event;
        }

    }
}
