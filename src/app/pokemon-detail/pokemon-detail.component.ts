import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
 

  
  typeColors: { [key: string]: string } = {
    'grass': '#78C850',
    'fire': '#F08030',
    'water': '#6890F0',
    'bug': '#A8B820',
    'normal': '#A8A878',
    'electric': '#F8D030',
    'fighting': '#C03028',
    'psychic': '#F85888',
    'rock': '#B8A038',
    'ghost': '#705898',
    'ice': '#98D8D8',
    'dragon': '#7038F8',
    'dark': '#705848',
    'fairy': '#F0B6BC',
    'steel': '#B8B8D0',
    'poison': '#A040A0',
    'ground': '#E0C068'
  };

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.pokemonService.getPokemonDetails(name!).subscribe(response => {
      this.pokemon = response;
      
    });
  }

  
  getBackgroundColor(): string {
    if (this.pokemon && this.pokemon.types && this.pokemon.types.length > 0) {
      const type = this.pokemon.types[0].type.name;
      return this.typeColors[type] || '#fff'; 
    }
    return '#fff'; 
  }

  goBack(): void {
    this.router.navigate(['/']); // Modifica il percorso in base alla tua configurazione
  }

}
