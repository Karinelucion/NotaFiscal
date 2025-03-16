package io.github.karinelucion.serverapi.produto;

import javax.enterprise.context.RequestScoped;

import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import io.github.karinelucion.serverapi.produto.validacoes.ValidacaoProduto;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.util.List;

@RequestScoped
public class ProdutoResource {
    private ProdutoRepository repository;
    private final ValidacaoProduto validacaoProduto;

    @Inject
    public ProdutoResource(ProdutoRepository repository, ValidacaoProduto validacaoProduto) {
        this.repository = repository;
        this.validacaoProduto = validacaoProduto;
    }

    @Transactional
    public Response criar(ProdutoRequest produtoRequest) {
        ResponseError responseError = validacaoProduto.validarPersistenciaProduto(produtoRequest);
        if (responseError != null) {
            return responseError.comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }

        Produto produto = new Produto();
        produto.setDescricao(produtoRequest.getDescricao());
        produto.setPreco(produtoRequest.getPreco());
        produto.setSituacao(produtoRequest.getSituacao());

        repository.persist(produto);

        return Response
                .status(Response.Status.CREATED.getStatusCode())
                .entity(produto)
                .build();
    }

    public List<Produto> listarTodosProdutos() {
        return repository.findAll().list();
    }

    public Produto buscarProdutoPorId(Long id) {
        return repository.findById(id);
    }

    public List<Produto> buscarProdutoFiltro(String descricao) {
        return repository.buscarPorDescricao(descricao);
    }

    public List<Produto> buscarProdutoAtivo() {
        return repository.buscarPorSituacaoAtivo(SituacaoProdutoEnum.ATIVO);
    }

    @Transactional
    public Response deletarProduto(Long id) {
        Produto produto = repository.findById(id);

        if (produto != null) {
            ResponseError responseError = validacaoProduto.validarExclusaoProduto(id);

            if (responseError != null) {
                return responseError.comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
            }

            try {
                repository.delete(produto);
                return Response.noContent().build();
            } catch (Exception e) {
                System.out.println("Erro ao tentar excluir o produto com ID {}: {}" + id + e.getMessage() + e);
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    public Response atualizarProduto(Long id, ProdutoRequest produtoRequest) {
        ResponseError responseError = validacaoProduto.validarPersistenciaProduto(produtoRequest);
        if (responseError != null) {
            return responseError.comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }

        Produto produto = repository.findById(id);

        if (produto != null) {
            produto.setDescricao(produtoRequest.getDescricao());
            produto.setPreco(produtoRequest.getPreco());
            produto.setSituacao(produtoRequest.getSituacao());

            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }


}