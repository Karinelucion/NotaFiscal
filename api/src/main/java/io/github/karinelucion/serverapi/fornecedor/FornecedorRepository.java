package io.github.karinelucion.serverapi.fornecedor;

import io.github.karinelucion.serverapi.crud.CrudRepository;
import io.github.karinelucion.serverapi.fornecedor.enums.SituacaoFornecedorEnum;
import io.github.karinelucion.serverapi.produto.Produto;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;

import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import java.util.List;

@RequestScoped
public class FornecedorRepository extends CrudRepository<Fornecedor> {
    public List<Fornecedor> buscarPorRazaoSocial(String razaosocial) {
        return buscarPorCampo("razaosocial", razaosocial);
    }

    public List<Fornecedor> buscarPorSituacaoAtivo(SituacaoFornecedorEnum situacao) {
        return buscarPorValorExato("situacao", situacao);
    }

    @Transactional
    public boolean verificarFornecedorReferenciadoEmNotaFiscal(Long fornecedorId) {
        Long count = getEntityManager()
                .createQuery("SELECT COUNT(i) FROM NotaFiscal i WHERE i.fornecedor.id = :fornecedorId", Long.class)
                .setParameter("fornecedorId", fornecedorId)
                .getSingleResult();

        return count > 0;
    }

    public boolean existePorCnpj(String cnpj, Long idFornecedorAtual) {
        if (idFornecedorAtual == null) {
            return find("cnpj", cnpj).firstResult() != null;
        } else {
            return find("cnpj = :cnpj AND id != :idFornecedorAtual",
                    Parameters.with("cnpj", cnpj).and("idFornecedorAtual", idFornecedorAtual))
                    .firstResult() != null;
        }
    }
}
