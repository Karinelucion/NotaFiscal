package io.github.karinelucion.serverapi.produto;

import javax.enterprise.context.RequestScoped;

import io.github.karinelucion.serverapi.fornecedor.Fornecedor;
import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@RequestScoped
public class ProdutoResource {
        private ProdutoRepository repository;
        private Validator validator;

        @Inject
        public ProdutoResource(ProdutoRepository repository, Validator validator){
            this.repository = repository;
            this.validator = validator;
        }

        @Transactional
        public Response criar(ProdutoRequest produtoRequest){
            Set<ConstraintViolation<ProdutoRequest>> violations = validator.validate(produtoRequest);

            if(!violations.isEmpty()){
                return ResponseError.validaCriacaoDoForm(violations)
                        .comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
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

        public List<Produto> listarTodosProdutos(){
            return repository.findAll().list();
        }

        public Produto buscarProdutoPorId(Long id){
            return repository.findById(id);
        }


        public List<Produto> buscarProdutoFiltro(String descricao) {
            return repository.buscarPorDescricao(descricao);
        }

         public List<Produto> buscarProdutoAtivo() {
        return repository.buscarPorSituacaoAtivo(SituacaoProdutoEnum.ATIVO);
    }



    @Transactional
        public Response deletarProduto(Long id){
            Produto produto = repository.findById(id);

            if(produto != null){
                repository.delete(produto);
                return Response.noContent().build();
            }
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        @Transactional
        public Response atualizarProduto(Long id, ProdutoRequest produtoRequest){
            Set<ConstraintViolation<ProdutoRequest>> violations = validator.validate(produtoRequest);

            if(!violations.isEmpty()){
                return ResponseError.validaCriacaoDoForm(violations)
                        .comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
            }

            Produto produto = repository.findById(id);

            if(produto != null){
                produto.setDescricao(produtoRequest.getDescricao());
                produto.setPreco(produtoRequest.getPreco());
                produto.setSituacao(produtoRequest.getSituacao());

                return Response.noContent().build();
            }
            return Response.status(Response.Status.NOT_FOUND).build();
        }


    }