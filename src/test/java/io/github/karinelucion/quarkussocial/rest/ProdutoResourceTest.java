package io.github.karinelucion.quarkussocial.rest;

import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.net.URL;
import java.util.Set;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
class ProdutoRequestValidationTest {
    @TestHTTPResource("/produto")
    URL apiURL;
    private Validator validator;
    private static Long produtoId;

    @BeforeEach
     public void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        this.validator = factory.getValidator();
    }

    @Test
    @DisplayName("deve exibir erro ao criar um produto sem descricao")
    public void deveExibirErroAoCriarProdutoSemDescricao() {
        ProdutoRequest request = new ProdutoRequest();
        request.setDescricao(null);
        request.setPreco(100.0f);
        request.setSituacao(SituacaoProdutoEnum.ATIVO);

        Set<ConstraintViolation<ProdutoRequest>> violacoes = validator.validate(request);

        assertFalse(violacoes.isEmpty());
        assertTrue(violacoes.stream().anyMatch(v -> v.getMessage().equals("A descricao é obrigatória")));
    }

    @Test
    @DisplayName("deve exibir erro ao criar um produto com descricao vazia")
    public void deveExibirErroAoCriarProdutoComDescricaoVazia() {
        ProdutoRequest request = new ProdutoRequest();
        request.setDescricao("");
        request.setPreco(100.0f);
        request.setSituacao(SituacaoProdutoEnum.ATIVO);

        Set<ConstraintViolation<ProdutoRequest>> violacoes = validator.validate(request);

        assertFalse(violacoes.isEmpty());
        assertTrue(violacoes.stream().anyMatch(v -> v.getMessage().equals("A descricao é obrigatória")));
    }

    @Test
    @DisplayName("deve exibir erro quando a descricao estiver abaixo do tamanho mínimo")
    public void deveExibirErroQuandoDescricaoForCurta() {
        ProdutoRequest request = new ProdutoRequest();
        request.setDescricao("Oi");
        request.setPreco(100.0f);
        request.setSituacao(SituacaoProdutoEnum.ATIVO);

        Set<ConstraintViolation<ProdutoRequest>> violacoes = validator.validate(request);

        assertFalse(violacoes.isEmpty());
        assertTrue(violacoes.stream().anyMatch(v -> v.getMessage().equals("O tamanho da descricao deve estar entre 3 e 100 caracteres")));
    }

    @Test
    @DisplayName("deve exibir erro quando a descricao estiver acima do tamanho máximo")
    public void deveExibirErroQuandoDescricaoForLonga() {
        ProdutoRequest request = new ProdutoRequest();
        request.setDescricao("A".repeat(101)); // 101 caracteres
        request.setPreco(100.0f);
        request.setSituacao(SituacaoProdutoEnum.ATIVO);

        Set<ConstraintViolation<ProdutoRequest>> violacoes = validator.validate(request);

        assertFalse(violacoes.isEmpty());
        assertTrue(violacoes.stream().anyMatch(v -> v.getMessage().equals("O tamanho da descricao deve estar entre 3 e 100 caracteres")));
    }

    @Test
    @DisplayName("deve exibir erro ao criar um produto sem situacao")
    public void deveExibirErroAoCriarProdutoSemSituacao() {
        ProdutoRequest request = new ProdutoRequest();
        request.setDescricao("Produto válido");
        request.setPreco(100.0f);
        request.setSituacao(null);

        Set<ConstraintViolation<ProdutoRequest>> violacoes = validator.validate(request);

        assertFalse(violacoes.isEmpty());
        assertTrue(violacoes.stream().anyMatch(v -> v.getMessage().equals("A situação é obrigatória")));
    }

    @Test
    @DisplayName("deve validar com sucesso quando os dados estiverem corretos")
    public void deveValidarComSucessoQuandoDadosEstiveremCorretos() {
        ProdutoRequest request = new ProdutoRequest();
        request.setDescricao("Produto Válido");
        request.setPreco(100.0f);
        request.setSituacao(SituacaoProdutoEnum.ATIVO);

        Set<ConstraintViolation<ProdutoRequest>> violacoes = validator.validate(request);

        assertTrue(violacoes.isEmpty());
    }

    @Test
    @DisplayName("deve listar produtos com sucesso")
    public void deveListarProdutosComSucesso() {


        given()
                .when()
                .get(apiURL)
                .then()
                .statusCode(200)
                .body("$.size()", greaterThan(0));
    }

    @Test
    @DisplayName("deve editar um produto com sucesso")
    public void deveEditarProdutoComSucesso() {
        var produtoAtualizado = new ProdutoRequest();
        produtoAtualizado.setDescricao("Produto Editado");
        produtoAtualizado.setPreco(25.50F);
        produtoAtualizado.setSituacao(SituacaoProdutoEnum.INATIVO);

        given()
                .contentType(ContentType.JSON)
                .body(produtoAtualizado)
                .when()
                .put(apiURL + "/" + produtoId)
                .then()
                .statusCode(200)
                .body("descricao", equalTo("Produto Editado"))
                .body("preco", equalTo(25.50F))
                .body("situacao", equalTo("INATIVO"));
    }

    @Test
    @DisplayName("deve exibir erro ao editar um produto inexistente")
    public void deveExibirErroAoEditarProdutoInexistente() {
        var produtoInexistente = new ProdutoRequest();
        produtoInexistente.setDescricao("Novo Produto");
        produtoInexistente.setPreco(30.00F);
        produtoInexistente.setSituacao(SituacaoProdutoEnum.ATIVO);

        given()
                .contentType(ContentType.JSON)
                .body(produtoInexistente)
                .when()
                .put(apiURL + "/9999")
                .then()
                .statusCode(404);
    }

    @Test
    @DisplayName("deve excluir um produto com sucesso")
    public void deveExcluirProdutoComSucesso() {
        given()
                .when()
                .delete(apiURL + "/" + produtoId)
                .then()
                .statusCode(204);
    }

    @Test
    @DisplayName("deve exibir erro ao excluir um produto inexistente")
    public void deveExibirErroAoExcluirProdutoInexistente() {
        given()
                .when()
                .delete(apiURL + "/9999")
                .then()
                .statusCode(404);
    }
}
