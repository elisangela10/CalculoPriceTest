import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../service/produto.service';
import { FabricanteService } from '../service/fabricante.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {
  produtocadastroForm: FormGroup;
  produtos: Produto[] = [];


  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private fabricanteService: FabricanteService,
    private router: Router
    )
  {
    this.produtocadastroForm = this.fb.group({
      fabricante: ['', Validators.required],
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      valor: [0, Validators.required]

    });
  }

  ngOnInit(): void {
    this.produtos = this.produtoService.listarProdutos();
  }


  adicionarProduto() {
    const novoProduto: Produto = this.produtocadastroForm.value;
    this.produtoService.adicionarProduto(novoProduto);
    this.produtocadastroForm.reset();

    const fabricante = this.produtocadastroForm.get('fabricante')?.value;
    this.fabricanteService.adicionarFabricante(fabricante);

    this.router.navigate(['/calculo-precos']);
  }


  editarProduto(produto: Produto) {
    this.produtocadastroForm.setValue({
      fabricante: produto.fabricante,
      codigo: produto.codigo,
      descricao: produto.descricao,
      valor: produto.valor
    });

    const index = this.produtos.indexOf(produto);
    if (index !== -1) {
      this.produtos.splice(index, 1);
    }
  }

  excluirProduto(produto: Produto) {
    const index = this.produtos.indexOf(produto);
    if (index !== -1) {
      this.produtos.splice(index, 1);
      this.produtoService.excluirProduto(index);
    }
  }
}
