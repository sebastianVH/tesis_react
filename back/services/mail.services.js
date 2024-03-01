import { createTransport } from "nodemailer";
import {google} from "googleapis"
const OAuth2 = google.auth.OAuth2


async function SendUserEmail(email) {

    const transporter = createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: 'huellasacasa.app@gmail.com',
        pass: 'Huellasacasa01!',
        clientId: "310466289574-umbhqff2ud2923iofmb66rpjbbipffa2.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken:"1//044bCv1F2DiOTCgYIARAAGAQSNwF-L9Ir2SmM1vxGvDviyO_ApfQSy8hDHGEKwSdAb7wv2yZXYlupvNghJN7OnjUy221I8mI54Jc"
      }
    });

    const messageOptions = {
        from: 'huellasacasa.app@gmail.com',
        to: email,
        subject: 'Gracias por unirte a "Huellas a casa"',
        text: 'Esperamos que nuestra app nos acerque cada vez mas a que todas las mascotas perdidas vuelvan a encontrar a sus dueños',
        // html: '<img src="cid:huellasacasa.app@gmail.com" />',
        // attachments:[{
        //     filename:"portada_inicio_ilustracion_mascotas.png",
        //     path: "front/src/assets/img/portada_inicio_ilustracion_mascotas.png",
        //     cid: "huellasacasa.app@gmail.com"
        // }] 
    }

    try {
        const info = await transporter.sendMail(messageOptions);
        return info
    } catch (error) {
        console.log({error});
        return error
    }

}

const SendEmailMascota = async ({email, nombre},mensaje) => {

  const transporter = createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: 'huellasacasa.app@gmail.com',
      pass: 'Huellasacasa01!',
      clientId: "310466289574-umbhqff2ud2923iofmb66rpjbbipffa2.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:"1//044bCv1F2DiOTCgYIARAAGAQSNwF-L9Ir2SmM1vxGvDviyO_ApfQSy8hDHGEKwSdAb7wv2yZXYlupvNghJN7OnjUy221I8mI54Jc"
    }
  });

  const messageOptions = {
      from: 'huellasacasa.app@gmail.com',
      to: email,
      subject: `Tenemos info acerca de ${nombre}!!!`,
      text: `Un usuario te ha dejado un mensaje: ${mensaje}
            Esperemos pronto vuelvas a reencontrarte con tu mascota!!!!
      `,
      // html: '<img src="cid:huellasacasa.app@gmail.com" />',
      // attachments:[{
      //     filename:"portada_inicio_ilustracion_mascotas.png",
      //     path: "front/src/assets/img/portada_inicio_ilustracion_mascotas.png",
      //     cid: "huellasacasa.app@gmail.com"
      // }] 
  }

  try {
      const info = await transporter.sendMail(messageOptions);
      return info
  } catch (error) {
    console.error(error);
      throw new Error(error)
  }
}

export {SendUserEmail,SendEmailMascota}
