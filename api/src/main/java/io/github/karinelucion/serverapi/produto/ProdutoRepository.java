package io.github.karinelucion.serverapi.produto;

import io.github.karinelucion.serverapi.crud.CrudRepository;
import io.github.karinelucion.serverapi.produto.enums.SituacaoProdutoEnum;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import java.util.List;

@RequestScoped
public class ProdutoRepository extends CrudRepository<Produto> {
    public List<Produto> buscarPorDescricao(String descricao) {
        return buscarPorCampo("descricao", descricao);
    }

    public List<Produto> buscarPorSituacaoAtivo(SituacaoProdutoEnum situacao) {
        return buscarPorValorExato("situacao", situacao);
    }

    @Transactional
    public boolean verificarProdutoReferenciadoEmItemNotaFiscal(Long produtoId) {
        Long count = getEntityManager()
                .createQuery("SELECT COUNT(i) FROM ItemNotaFiscal i WHERE i.produto.id = :produtoId", Long.class)
                .setParameter("produtoId", produtoId)
                .getSingleResult();

        return count > 0;
    }
}
