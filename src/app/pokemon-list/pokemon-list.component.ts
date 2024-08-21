import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];

  typeColors: { [key: string]: string } = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#F0B6BC',
    normal: '#A8A878',
    // Aggiungi altri tipi e colori se necessario
  };

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(response => {
      this.pokemonList = response.results.map((pokemon: any) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        console.log(pokemon.url);
        return {
          id: id,
          name: pokemon.name,
          types: []
        };
      });

      this.pokemonList.forEach(pokemon => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe(details => {
          pokemon.types = details.types.map((typeInfo: any) => typeInfo.type.name);
        });
      });

      this.filteredPokemonList = [...this.pokemonList];
    });
  }

  onSearch(event: any): void {
    const searchValue = event.target.value.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchValue) ||
      pokemon.types.some((type: string) => type.toLowerCase().includes(searchValue))
    );
  }

  getCardBackgroundColor(types: string[]): string {
    if (types.length > 0) {
      const primaryType = types[0];
      return this.typeColors[primaryType] || '#fff'; 
    }
    return '#fff';
  }
}