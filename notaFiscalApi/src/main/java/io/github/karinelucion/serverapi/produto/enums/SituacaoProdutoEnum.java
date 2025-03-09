package io.github.karinelucion.serverapi.produto.enums;

public enum SituacaoProdutoEnum {
    ATIVO("Ativo"),
    INATIVO("Inativo");

    private final String descricao;

    SituacaoProdutoEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static SituacaoProdutoEnum fromDescricao(String descricao) {
        for (SituacaoProdutoEnum tipo : SituacaoProdutoEnum.values()) {
            if (tipo.getDescricao().equals(descricao)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("Descricao inválida: " + descricao);
    }
}
