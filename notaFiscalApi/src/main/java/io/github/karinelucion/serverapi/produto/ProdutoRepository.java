package io.github.karinelucion.serverapi.produto;

import io.github.karinelucion.serverapi.crud.CrudRepository;
import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;
import java.util.List;

@RequestScoped
public class ProdutoRepository extends CrudRepository<Produto> {
    public List<Produto> buscarPorDescricao(String descricao) {
        return buscarPorValorExato("descricao", descricao);
    }

    public List<Produto> buscarPorSituacaoAtivo(SituacaoProdutoEnum situacao) {
        return buscarPorValorExato("situacao", situacao);
    }
}
