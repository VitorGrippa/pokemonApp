import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent  implements OnInit {

  public pokemons: any = []
  public isModalOpen = false;
  public selectedPokemon: any;
  public pesquisarTermo: string= '';
  public filtroPokemon: any[] = [];
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemon().subscribe((data) => {
      this.pokemons = data.results;
      this.filtroPokemon = this.pokemons
    })
  }
  fecharModal() {
    this.isModalOpen = false
  }

  openModal(pokemon: any) {
    this.pokemonService.getPokemonDetalhes(pokemon.name)
    .subscribe((detalhes) => {
      this.selectedPokemon = detalhes
      this.isModalOpen = true;
    })
  }

  filtrarPokemon() {
    if(!this.pesquisarTermo.trim()) {
      this.filtroPokemon = this.pokemons;
    } else{
      this.filtroPokemon = this.pokemons.filter((p: any) => 
        p.name.toLowerCase().includes(this.pesquisarTermo.toLowerCase())
      );
    }
  }

}