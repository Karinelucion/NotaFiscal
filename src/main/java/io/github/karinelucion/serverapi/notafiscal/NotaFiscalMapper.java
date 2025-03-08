package io.github.karinelucion.serverapi.notafiscal;

import io.github.karinelucion.serverapi.notafiscal.dto.NotaFiscalRequest;

public class NotaMapper {
    public static NotaFiscal toEntity(NotaFiscalRequest dto){
        NotaFiscal notaFiscal = new NotaFiscal();



        notaFiscal.setNumero(dto.getNumero());
        notaFiscal.setValortotal(dto.getValortotal());
        notaFiscal.setDatahora(dto.getDatahora());
        notaFiscal.setEndereco();
    }
}
