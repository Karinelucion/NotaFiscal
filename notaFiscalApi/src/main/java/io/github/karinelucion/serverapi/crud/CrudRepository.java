package io.github.karinelucion.serverapi.fornecedor;

import io.github.karinelucion.serverapi.produto.Produto;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;
import java.util.List;

@RequestScoped
public class FornecedorRepository implements PanacheRepository<Fornecedor> {
    public List<Fornecedor> buscarPorRazaoSocial(String razaosocial) {
        return find("LOWER(razaosocial) LIKE LOWER(?1)", "%" + razaosocial.toLowerCase() + "%").list();
    }

    public List<Fornecedor> buscarPorSituacaoAtivo(String situacao) {
        return find("situacao = ?1", situacao).list();
    }

}
