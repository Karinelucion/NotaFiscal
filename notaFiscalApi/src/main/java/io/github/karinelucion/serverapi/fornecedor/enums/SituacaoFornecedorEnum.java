package io.github.karinelucion.serverapi.fornecedor.enums;

public enum SituacaoFornecedorEnum {
    ATIVO("Ativo"),
    BAIXADO("Baixado"),
    SUSPENSO("Suspenso");

    private final String descricao;

    SituacaoFornecedorEnum(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public static SituacaoFornecedorEnum fromDescricao(String descricao) {
        for (SituacaoFornecedorEnum tipo : SituacaoFornecedorEnum.values()) {
            if (tipo.getDescricao().equals(descricao)) {
                return tipo;
            }
        }
        throw new IllegalArgumentException("Descricao inválida: " + descricao);
    }
}
