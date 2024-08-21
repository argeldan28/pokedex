import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'; 

  constructor(private http: HttpClient) { }

  // Ottieni la lista dei Pokémon
  getPokemonList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?limit=151`);
  }

  // Ottieni i dettagli di un Pokémon
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`);
  }
}