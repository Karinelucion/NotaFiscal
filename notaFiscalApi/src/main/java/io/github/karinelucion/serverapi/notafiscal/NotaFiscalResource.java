package io.github.karinelucion.serverapi.notafiscal;

import io.github.karinelucion.serverapi.endereco.Endereco;
import io.github.karinelucion.serverapi.endereco.EnderecoRepository;
import io.github.karinelucion.serverapi.endereco.EnderecoResource;
import io.github.karinelucion.serverapi.fornecedor.Fornecedor;
import io.github.karinelucion.serverapi.fornecedor.FornecedorRepository;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.ItemNotaFiscal;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto.ItemNotaFiscalRequest;
import io.github.karinelucion.serverapi.notafiscal.dto.NotaFiscalRequest;
import io.github.karinelucion.serverapi.produto.Produto;
import io.github.karinelucion.serverapi.produto.ProdutoRepository;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@RequestScoped
public class NotaFiscalResource {

    @Inject
    EnderecoResource enderecoResource;

    @Inject
    FornecedorRepository fornecedorRepository;

    @Inject
    EnderecoRepository enderecoRepository;

    @Inject
    NotaFiscalRepository notaFiscalRepository;

    @Inject
    ProdutoRepository produtoRepository;

    @Transactional
    public NotaFiscal criarNotaFiscalComItem(NotaFiscalRequest dto) {
        Endereco endereco = enderecoResource.buscarEnderecoPorCep(dto.getCep());
        enderecoRepository.persist(endereco);

        Fornecedor fornecedor = fornecedorRepository.findById(dto.getFornecedorid());
        if (fornecedor == null) {
            throw new NotFoundException("Fornecedor não encontrado!");
        }

        NotaFiscal notaFiscal = NotaFiscalMapper.toEntity(dto, endereco, fornecedor);

        List<ItemNotaFiscal> itens = new ArrayList<>();
        float valortotal = 0.0F;

        for (ItemNotaFiscalRequest itemRequest : dto.getItens()) {

            System.out.println("ITENS NO DTO: " + dto.getItens());
            Produto produto = produtoRepository.findById(itemRequest.getProdutoid());

            ItemNotaFiscal item = new ItemNotaFiscal();
            item.setQuantidade(itemRequest.getQuantidade());
            item.setValorunitario(itemRequest.getValorunitario());
            item.setValortotal(item.getValorunitario() * item.getQuantidade());
            if (produto == null) {
                throw new NotFoundException("Produto não encontrado!");
            }

            item.setProduto(produto);
            item.setNotaFiscal(notaFiscal);

            valortotal += itemRequest.getQuantidade() * itemRequest.getValorunitario();
            itens.add(item);
        }

        notaFiscal.setItens(itens);
        notaFiscal.setValortotal(valortotal);

        notaFiscalRepository.persist(notaFiscal);

        System.out.println("Nota Fiscal criada com ID: " + notaFiscal.getId());
        return notaFiscal;
    }


    public List<NotaFiscal> listarTodasNotasFiscais() {
        return notaFiscalRepository.findAll().list();
    }

    @Transactional
    public Response deletarNotaFiscal(Long id) {
        NotaFiscal notaFiscal = notaFiscalRepository.findById(id);

        if (notaFiscal != null) {
            notaFiscalRepository.delete(notaFiscal);
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    public NotaFiscal atualizarNotaFiscal(Long id, NotaFiscalRequest dto) {
        NotaFiscal notaFiscal = notaFiscalRepository.findById(id);

        Endereco endereco = enderecoResource.buscarEnderecoPorCep(dto.getCep());
        enderecoRepository.persist(endereco);

        Fornecedor fornecedor = fornecedorRepository.findById(dto.getFornecedorid());
        if (fornecedor == null) {
            throw new NotFoundException("Fornecedor não encontrado!");
        }

        notaFiscal.setNumero(dto.getNumero());
        notaFiscal.setDatahora(dto.getDatahora());
        notaFiscal.setEndereco(endereco);
        notaFiscal.setFornecedor(fornecedor);

        List<ItemNotaFiscal> itens = new ArrayList<>();
        float valortotal = 0.0F;

        for (ItemNotaFiscalRequest itemRequest : dto.getItens()) {
            Produto produto = produtoRepository.findById(itemRequest.getProdutoid());

            if (produto == null) {
                throw new NotFoundException("Produto não encontrado!");
            }

            ItemNotaFiscal item = new ItemNotaFiscal();
            item.setQuantidade(itemRequest.getQuantidade());
            item.setValorunitario(itemRequest.getValorunitario());
            item.setValortotal(item.getValorunitario() * item.getQuantidade());
            item.setProduto(produto);
            item.setNotaFiscal(notaFiscal);

            valortotal += item.getValortotal();
            itens.add(item);
        }

        notaFiscal.getItens().clear();
        notaFiscal.getItens().addAll(itens);
        notaFiscal.setValortotal(valortotal);

        notaFiscalRepository.persist(notaFiscal);

        return notaFiscal;
    }

}
