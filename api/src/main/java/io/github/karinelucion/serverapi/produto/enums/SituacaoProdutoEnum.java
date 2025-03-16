package io.github.karinelucion.serverapi.produto.enums;

public enum SituacaoProdutoEnum {
    ATIVO("Ativo"),
    INATIVO("Inativo");

    private final String descricao;

    SituacaoProdutoEnum(String descricao) {
        this.descricao = descricao;
    }
}
