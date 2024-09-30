import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import firebase from '../config';

const TermsScreen = ({ route, navigation }) => {
  const { email } = route.params;

  const acceptTerms = async () => {
    try {
      const userRef = firebase.firestore().collection('users').doc(email);
      await userRef.update({ termsAccepted: true });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al aceptar términos y condiciones:', error);
    }
  };

  return (
    <ScrollView 
      style={{ flex: 1, padding: 20 }} 
      contentContainerStyle={{ paddingBottom: 30 }} // Asegura que haya espacio extra al final
    >
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Términos y Condiciones</Text>
        <Text style={{ marginVertical: 10 }}>
          Bienvenido a ROOMIEONE ("nosotros", "nuestro", "la aplicación"). Al utilizar nuestra aplicación, aceptas los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, por favor, no utilices la aplicación.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          1. Aceptación de los Términos: Al acceder o utilizar ROOMIEONE, aceptas que has leído, entendido y estás de acuerdo en cumplir con estos Términos y Condiciones. Si no aceptas estos términos, no podrás utilizar la aplicación.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          2. Descripción del Servicio: ROOMIEONE es una plataforma que conecta a arrendadores y arrendatarios para facilitar la renta de cuartos. La aplicación permite a los usuarios buscar, listar y arrendar cuartos de manera eficiente.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          3. Registro de Usuario: Para utilizar ciertos servicios de la aplicación, deberás registrarte y crear una cuenta. Al registrarte, te comprometes a proporcionar información veraz, precisa y actualizada. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran en tu cuenta.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          4. Obligaciones del Usuario: Al utilizar la aplicación, te comprometes a: utilizar la aplicación solo para fines legales y de acuerdo con estos términos; no publicar información falsa o engañosa sobre los cuartos; no acosar, amenazar ni discriminar a otros usuarios; y cumplir con todas las leyes y regulaciones aplicables en tu localidad.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          5. Propiedad Intelectual: Todo el contenido de la aplicación, incluidos pero no limitados a textos, gráficos, logotipos, imágenes, y software, es propiedad de ROOMIEONE o de sus licenciantes y está protegido por las leyes de propiedad intelectual. No puedes reproducir, distribuir o modificar el contenido sin nuestro consentimiento previo por escrito.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          6. Limitación de Responsabilidad: ROOMIEONE no es responsable de las acciones de los usuarios, ni de la calidad o disponibilidad de los cuartos ofrecidos. No garantizamos que el uso de la aplicación sea ininterrumpido o libre de errores. En la medida máxima permitida por la ley, no seremos responsables por daños directos, indirectos, incidentales, especiales o consecuentes que surjan de o estén relacionados con el uso de la aplicación.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          7. Indemnización: Te comprometes a indemnizar y mantener indemne a ROOMIEONE y a sus afiliados de cualquier reclamo, demanda, pérdida, responsabilidad, daños, costos y gastos (incluidos los honorarios de abogados) que surjan de tu uso de la aplicación o de tu violación de estos términos.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          8. Modificaciones de los Términos: Nos reservamos el derecho de modificar estos términos en cualquier momento. Cualquier cambio será efectivo inmediatamente después de su publicación en la aplicación. Es tu responsabilidad revisar estos términos periódicamente para estar al tanto de cualquier modificación.
        </Text>
        <Text style={{ marginVertical: 10 }}>
          9. Ley Aplicable: Estos términos se regirán e interpretarán de acuerdo con las leyes de México, sin tener en cuenta sus principios de conflictos de leyes. Cualquier disputa que surja en relación con estos términos se resolverá en los tribunales competentes de [Tu Ciudad/Estado].
        </Text>
        <Text style={{ marginVertical: 10 }}>
          10. Contacto: Si tienes preguntas sobre estos términos, puedes contactarnos a través de easyappscompany.com.mx.
        </Text>
      </View>

      {/* Sección del botón con márgenes adicionales */}
      <View style={{ marginTop: 20 }}>
        <Button title="Aceptar Términos y Condiciones" onPress={acceptTerms} />
      </View>
    </ScrollView>
  );
};

export default TermsScreen;
