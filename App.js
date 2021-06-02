import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { rando, pokeFetch } from './util';

// how many pokemon are in the API?
const maxPoke = 898;

export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pokemonImage: { uri: ''},
      pokemon: {},
      types: [],
    }
  }

  updatePokemon = async () =>
  {
    const pokemon = await pokeFetch('pokemon', rando(1, maxPoke));
    this.setState({
      pokemon,
      pokemonImage: {uri: pokemon.sprites.front_default},
      types: pokemon.types.map((type, i) =>
      {
        return <Text key={`type_${i}`}>{type.type.name}</Text>
      }),
    });
  }
  componentDidMount() {
    this.updatePokemon();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={[styles.pokemonImage]} 
          source={this.state.pokemonImage}
        />
        <Text>Name: {this.state.pokemon.name}</Text>
        <View>
          <Text>Types:</Text>
          {this.state.types}
        </View>
        <Button
          title="Change"
          onPress={this.updatePokemon}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    resizeMode: 'contain',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    width: 200,
    height: 200,
  },
});
