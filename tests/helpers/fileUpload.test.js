import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'jautestcloud',
  api_key: '355234386336646',
  api_secret: 'ZGFG0B5KpamUP9iPC7XdNlrqWGU',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('debe de subir el archivo correctamente a claudinary', async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&w=1000&q=80';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    // console.log(url);
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');

    const cloudResp = await cloudinary.api.delete_resources([imageId], {
      resource_type: 'image',
    });
    // console.log({ cloudResp });
  });

  test('debe retornar null', async () => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
