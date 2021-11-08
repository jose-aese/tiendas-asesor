// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ws: 'https://portal.dev-chambeador.com/api',
  request: Buffer.from("Bx5blE0lEZSL+9riM0gzuGgt8pxpyX7HOL0N2MusYqU=", 'base64'),
  response: Buffer.from("Bx5blE0lEZSL+9riM0gzuP/fIXZEJSanMaqLW5p7aZE=", 'base64'),
  vector: Buffer.from('2dbd37de1c10d57f86822899fd007da7', 'hex'),
  hostImagenes:'https://minegocio.bazappgs.com/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
