package io.github.karinelucion.serverapi.notafiscal;

import io.github.karinelucion.serverapi.crud.CrudRepository;
import io.github.karinelucion.serverapi.fornecedor.Fornecedor;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;
import java.util.List;

@RequestScoped
public class NotaFiscalRepository extends CrudRepository<NotaFiscal> {


    public List<NotaFiscal> buscarPorNumero(String numero) {
        return buscarPorValorExato("numero", numero);
    }
}
