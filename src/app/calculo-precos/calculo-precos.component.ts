import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../service/produto.service';
import { FabricanteService } from '../service/fabricante.services';

@Component({
  selector: 'app-calculo-precos',
  templateUrl: './calculo-precos.component.html',
  styleUrls: ['./calculo-precos.component.css']
})
export class CalculoPrecosComponent implements OnInit {
  calculoprecoForm: FormGroup;
  fabricantes: string[] = [];
  produtos: Produto[] = [];
  fabricanteFiltrado = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private fabricanteService: FabricanteService
  ) {
    this.calculoprecoForm = fb.group({
      fabricanteSelecionado: [''],
      codigoFiltrado: ['']
    });

    this.fabricanteFiltrado.valueChanges.subscribe(fabricante => {
      this.filtrarProdutos();
    });
  }

  ngOnInit(): void {
    this.produtos = this.produtoService.getProdutos();
    this.fabricantes = this.fabricanteService.getFabricantes();

    this.fabricanteService.fabricanteAdded.subscribe(() => {
      this.fabricantes = this.fabricanteService.getFabricantes();
    });

  }
  filtrarProdutos() {
    const fabricanteSelecionado = this.calculoprecoForm.get('fabricanteSelecionado')?.value;
    if (!fabricanteSelecionado || fabricanteSelecionado === '') {
      this.produtos = this.produtoService.getProdutos();
      return;
    }

    this.produtos = this.produtoService.getProdutos().filter(produto => produto.fabricante === fabricanteSelecionado);
  }



  calcularDesconto(desconto: number, valor: number): number {
    return valor - (valor * desconto) / 100;
  }

  calcularValorTotalComDesconto(produto: Produto, index: number): number {
    const descontoControl = this.calculoprecoForm.get(`${index}_desconto`);
    const valorControl = this.calculoprecoForm.get(`${index}_valor`);

    if (descontoControl && descontoControl.value !== null) {
      const desconto = Number(descontoControl.value);
      const valorOriginal = valorControl ? Number(valorControl.value) : produto.valor;
      const valorComDesconto = this.calcularDesconto(desconto, valorOriginal);
      return valorComDesconto;
    }

    if (valorControl) {
      const valorAtual = Number(valorControl.value);
      return valorAtual;
    }

    return produto.valor;
  }

  calcularValorTotal(produto: Produto, index: number): number {
    const descontoControl = this.calculoprecoForm.get(`${index}_desconto`);
    const valorOriginal = produto.valor;

    if (descontoControl && descontoControl.value !== null) {
      const desconto = Number(descontoControl.value);
      const valorComDesconto = this.calcularDesconto(desconto, valorOriginal);
      return valorComDesconto;
    }

    return valorOriginal;
  }

  calcularValorTotalSemDesconto(produto: Produto): number {
    return this.calcularDesconto(0, produto.valor);
  }

  atualizarValorTotal(produto: Produto, index: number) {
    const novoValorTotal = this.calcularValorTotalComDesconto(produto, index);
    const valorControl = this.calculoprecoForm.get(`${index}_valor`);
    if (valorControl) {
      valorControl.setValue(novoValorTotal);
    }
  }

  calcularTotalGeral(): number {
    let total = 0;
    this.produtos.forEach((produto, index) => {
      total += this.calcularValorTotalComDesconto(produto, index);
    });
    return total;
  }

  excluirDados() {
    this.calculoprecoForm.reset();
  }
}
