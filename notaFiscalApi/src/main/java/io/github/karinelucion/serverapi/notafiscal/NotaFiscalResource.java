package io.github.karinelucion.serverapi.notafiscal;

import io.github.karinelucion.serverapi.endereco.Endereco;
import io.github.karinelucion.serverapi.endereco.EnderecoRepository;
import io.github.karinelucion.serverapi.endereco.EnderecoResource;
import io.github.karinelucion.serverapi.error.ResponseError;
import io.github.karinelucion.serverapi.fornecedor.Fornecedor;
import io.github.karinelucion.serverapi.fornecedor.FornecedorRepository;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.ItemNotaFiscal;
import io.github.karinelucion.serverapi.notafiscal.ItemNotaFiscal.dto.ItemNotaFiscalRequest;
import io.github.karinelucion.serverapi.notafiscal.dto.NotaFiscalRequest;
import io.github.karinelucion.serverapi.notafiscal.dto.NotaFiscalResponse;
import io.github.karinelucion.serverapi.produto.Produto;
import io.github.karinelucion.serverapi.produto.ProdutoRepository;
import io.github.karinelucion.serverapi.produto.dto.ProdutoRequest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RequestScoped
public class NotaFiscalResource {

    private FornecedorRepository fornecedorRepository;
    private Validator validator;
    private NotaFiscalRepository notaFiscalRepository;

    @Inject
    public NotaFiscalResource(NotaFiscalRepository notaFiscalRepository, FornecedorRepository fornecedorRepository, Validator validator){
        this.notaFiscalRepository = notaFiscalRepository;
        this.fornecedorRepository = fornecedorRepository;
        this.validator = validator;
    }

    @Transactional
    public NotaFiscal criarNotaFiscalComItem(NotaFiscalRequest dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(dto.getFornecedorid());
        if (fornecedor == null) {
            throw new NotFoundException("Fornecedor não encontrado!");
        }

        NotaFiscal notaFiscal = NotaFiscalMapper.toEntity(dto, dto.getEndereco(), fornecedor);

        List<ItemNotaFiscal> itens = new ArrayList<>();
        float valortotal = 0.0F;

        for (ItemNotaFiscalRequest itemRequest : dto.getItens()) {

            ItemNotaFiscal item = new ItemNotaFiscal();
            item.setQuantidade(itemRequest.getQuantidade());
            item.setValorunitario(itemRequest.getValorunitario());
            item.setValortotal(item.getValorunitario() * item.getQuantidade());
            item.setProduto(itemRequest.getProduto());
            item.setNotaFiscal(notaFiscal);

            valortotal += itemRequest.getQuantidade() * itemRequest.getValorunitario();
            itens.add(item);
        }

        notaFiscal.setItens(itens);
        notaFiscal.setValortotalnota(valortotal);

        notaFiscalRepository.persist(notaFiscal);

        return notaFiscal;
    }


    public List<NotaFiscal> listarTodasNotasFiscais() {
        return notaFiscalRepository.findAll().list();
    }

    public List<NotaFiscal> buscarNotaficalFiltro(String numero) {
        return notaFiscalRepository.buscarPorNumero(numero);
    }

    @Transactional
    public Response deletarNotaFiscal(Long id) {
        NotaFiscal notaFiscal = notaFiscalRepository.findById(id);

        if (notaFiscal != null) {
            notaFiscalRepository.delete(notaFiscal);
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    public NotaFiscalResponse buscarNotafiscalPorId(Long id){
        return NotaFiscalMapper.toDTOResponse(notaFiscalRepository.findById(id));
    }


    @Transactional
    public Response atualizarNotaFiscal(Long id, NotaFiscalRequest dto) {

        Set<ConstraintViolation<NotaFiscalRequest>> violations = validator.validate(dto);

        if(!violations.isEmpty()){
            return ResponseError.validaCriacaoDoForm(violations)
                    .comStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }
        NotaFiscal notaFiscal = notaFiscalRepository.findById(id);

        if(notaFiscal != null) {
            Fornecedor fornecedor = fornecedorRepository.findById(dto.getFornecedorid());
            if (fornecedor == null) {
                throw new NotFoundException("Fornecedor não encontrado!");
            }

            notaFiscal.setNumero(dto.getNumero());
            notaFiscal.setDatahora(dto.getDatahora());
            notaFiscal.setEndereco(dto.getEndereco());
            notaFiscal.setFornecedor(fornecedor);

            List<ItemNotaFiscal> itens = new ArrayList<>();
            float valortotal = 0.0F;

            for (ItemNotaFiscalRequest itemRequest : dto.getItens()) {
                ItemNotaFiscal item = new ItemNotaFiscal();
                item.setQuantidade(itemRequest.getQuantidade());
                item.setValorunitario(itemRequest.getValorunitario());
                item.setValortotal(itemRequest.getValorunitario() * item.getQuantidade());
                item.setProduto(itemRequest.getProduto());
                System.out.println();
                System.out.println(item.getProduto());
                item.setNotaFiscal(notaFiscal);

                valortotal += item.getValortotal();
                itens.add(item);
            }

            notaFiscal.getItens().clear();
            notaFiscal.getItens().addAll(itens);
            notaFiscal.setValortotalnota(valortotal);

            return Response.noContent().build();

        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }

}
