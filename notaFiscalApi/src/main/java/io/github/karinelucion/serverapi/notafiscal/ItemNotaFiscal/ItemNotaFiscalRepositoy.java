package io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class ItemNotaFiscalRepositoy implements PanacheRepository<ItemNotaFiscal> {
}
