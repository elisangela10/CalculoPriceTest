import { Injectable } from '@angular/core';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [];

  getProdutos(): Produto[] {
    return this.produtos;
  }

  listarProdutos(): Produto[] {
    // Adicione aqui a lógica para buscar os produtos de alguma fonte (ex: API, banco de dados, etc.)
    // Por enquanto, retornamos os produtos já armazenados na variável 'produtos'
    return this.produtos;
  }

  adicionarProduto(produto: Produto): void {
    this.produtos.push(produto);
  }

  editarProduto(index: number, produto: Produto): void {
    this.produtos[index] = produto;
  }

  excluirProduto(index: number): void {
    this.produtos.splice(index, 1);
  }
}
