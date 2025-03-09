package io.github.karinelucion.serverapi.notafiscal;

import io.github.karinelucion.serverapi.notafiscal.NotaFiscal;
import io.github.karinelucion.serverapi.notafiscal.dto.NotaFiscalRequest;
import io.github.karinelucion.serverapi.produto.Produto;
import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.ItemNotaFiscal;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto.ItemNotaFiscalRequest;
import io.github.karinelucion.serverapi.endereco.Endereco;
import io.github.karinelucion.serverapi.fornecedor.Fornecedor;

import java.util.List;
import java.util.stream.Collectors;

public class NotaFiscalMapper {
    public static NotaFiscal toEntity(NotaFiscalRequest dto, Endereco endereco, Fornecedor fornecedor) {
        NotaFiscal notaFiscal = new NotaFiscal();
        notaFiscal.setNumero(dto.getNumero());
        notaFiscal.setDatahora(dto.getDatahora());
        notaFiscal.setValortotal(dto.getValortotal());
        notaFiscal.setEndereco(endereco);
        notaFiscal.setFornecedor(fornecedor);

        if (dto.getItens() != null) {
            List<ItemNotaFiscal> itens = dto.getItens().stream().map(NotaFiscalMapper::toItemNotaFiscalEntity).collect(Collectors.toList());
            itens.forEach(item -> item.setNotaFiscal(notaFiscal));
            notaFiscal.setItens(itens);
        }
        return notaFiscal;
    }

    public static NotaFiscalRequest toDTO(NotaFiscal notaFiscal) {
        NotaFiscalRequest dto = new NotaFiscalRequest();
        dto.setNumero(notaFiscal.getNumero());
        dto.setDatahora(notaFiscal.getDatahora());
        dto.setValortotal(notaFiscal.getValortotal());
        dto.setCep(notaFiscal.getEndereco().getCep());
        dto.setFornecedorid(notaFiscal.getFornecedor().getId());

        if (notaFiscal.getItens() != null) {
            List<ItemNotaFiscalRequest> itensDTO = notaFiscal.getItens().stream().map(NotaFiscalMapper::toItemNotaFiscalDTO).collect(Collectors.toList());
            dto.setItens(itensDTO);
        }
        return dto;
    }

    private static ItemNotaFiscal toItemNotaFiscalEntity(ItemNotaFiscalRequest dto) {
        ItemNotaFiscal item = new ItemNotaFiscal();
        item.setValorunitario(dto.getValorunitario());
        item.setQuantidade(dto.getQuantidade());
        Produto produto = new Produto();
        produto.setId(dto.getProdutoid());
        item.setProduto(produto);
        return item;
    }

    private static ItemNotaFiscalRequest toItemNotaFiscalDTO(ItemNotaFiscal item) {
        ItemNotaFiscalRequest dto = new ItemNotaFiscalRequest();
        dto.setValorunitario(item.getValorunitario());
        dto.setQuantidade(item.getQuantidade());
        dto.setProdutoid(item.getProduto().getId());
        return dto;
    }

    private static Produto toProdutoEntity(ProdutoRequest dto) {
        Produto produto = new Produto();
        produto.setDescricao(dto.getDescricao());
        produto.setPreco(dto.getPreco());
        produto.setSituacao(dto.getSituacao());
        return produto;
    }

    private static ProdutoRequest toProdutoDTO(Produto produto) {
        ProdutoRequest dto = new ProdutoRequest();
        dto.setDescricao(produto.getDescricao());
        dto.setPreco(produto.getPreco());
        dto.setSituacao(produto.getSituacao());
        return dto;
    }
}
