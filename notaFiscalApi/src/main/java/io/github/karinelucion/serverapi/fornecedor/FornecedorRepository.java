package io.github.karinelucion.serverapi.fornecedor;

import io.github.karinelucion.serverapi.crud.CrudRepository;
import io.github.karinelucion.serverapi.fornecedor.enums.SituacaoFornecedorEnum;
import io.github.karinelucion.serverapi.produto.Produto;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;
import java.util.List;

@RequestScoped
public class FornecedorRepository extends CrudRepository<Fornecedor> {
    public List<Fornecedor> buscarPorRazaoSocial(String razaosocial) {
        return buscarPorValorExato("razaosocial", razaosocial);
    }

    public List<Fornecedor> buscarPorSituacaoAtivo(SituacaoFornecedorEnum situacao) {
        return buscarPorValorExato("situacao", situacao);
    }
}
