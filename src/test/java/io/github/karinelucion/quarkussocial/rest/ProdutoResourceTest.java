package io.github.karinelucion.quarkussocial.rest;

import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.*;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;
import static io.restassured.RestAssured.given;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ProdutoResourceTest {
    @TestHTTPResource("/produto")
    URL apiURL;

    @Test
    @DisplayName("deve criar um produto com sucesso")
    @Order(1)
    public void createUserTest(){
        var produto = new ProdutoRequest();
        produto.setDescricao("Produto");
        produto.setSituacao(SituacaoProdutoEnum.ATIVO);
        produto.setPreco(6.84F);

        var response = given()
                .contentType(ContentType.JSON)
                .body(produto)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(201, response.statusCode());
        assertNotNull(response.jsonPath().getString("id"));

    }
}