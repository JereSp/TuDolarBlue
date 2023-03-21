

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';



function App(): JSX.Element {
  const [dolarBlueCompra, setDolarBlueCompra ] = useState()
  const [dolarBlueVenta, setDolarBlueVenta ] = useState()

  async function getPrice(){
    let response = await fetch('https://www.dolarsi.com/api/api.php?type=dolar');
    let data = await response.json()
    console.log('soy data', data)
    let blueData = data.filter((element: any) => element.casa.nombre === 'Blue')
    console.log('soy blue data', blueData)
    let precio = blueData[0]?.casa?.compra
    console.log('soy compra', precio)
    let precioVenta = blueData[0]?.casa?.venta
    setDolarBlueCompra(precio)
    setDolarBlueVenta(precioVenta)
  } 

  useEffect(() => {
    getPrice()
  }, [])


  return (
        <View style={styles.container}>
          <Text>{ dolarBlueCompra ? `el precio del dolar blue hoy es ${dolarBlueCompra} para la compra `: 'cargando' }</Text>
          <Text>{ dolarBlueVenta ? `y para la venta es ${dolarBlueVenta}`: 'cargando' }</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  }
});


export default App;
