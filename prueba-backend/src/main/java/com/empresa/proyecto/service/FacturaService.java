package com.empresa.proyecto.service;

import java.util.List;

import com.empresa.proyecto.dto.request.FacturaBuscar;
import com.empresa.proyecto.dto.response.Factura;
import com.empresa.proyecto.dto.response.OutResponse;

public interface FacturaService {

	public OutResponse<Factura> registrarFactura(Factura c) throws Exception;

	public OutResponse<?> modificarFactura(Factura c) throws Exception;

	public OutResponse<List<Factura>> listarFactura(Factura r);

	public OutResponse<?> eliminarFacturaLogica(Factura r);

	public OutResponse<?> eliminarFactura(Factura c);

	public OutResponse<List<Factura>> listarFacturaPaginado(FacturaBuscar r);
	
	public OutResponse<Factura> buscarFactura(Factura c);
}
