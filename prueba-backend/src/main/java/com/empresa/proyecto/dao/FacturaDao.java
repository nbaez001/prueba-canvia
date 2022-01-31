package com.empresa.proyecto.dao;

import java.util.List;

import com.empresa.proyecto.dto.request.FacturaBuscar;
import com.empresa.proyecto.dto.response.Factura;
import com.empresa.proyecto.dto.response.FacturaDetalle;
import com.empresa.proyecto.dto.response.OutResponse;

public interface FacturaDao {

	public OutResponse<Factura> registrarFactura(Factura c) throws Exception;

	public OutResponse<?> registrarFacturaDetalle(Long idFactura, FacturaDetalle c) throws Exception;

	public OutResponse<?> modificarFactura(Factura c) throws Exception;

	public OutResponse<?> modificarFacturaDetalle(FacturaDetalle c) throws Exception;

	public OutResponse<List<Factura>> listarFactura(Factura r);

	public OutResponse<?> eliminarFacturaLogica(Factura r);

	public OutResponse<?> eliminarFactura(Factura c);

	public OutResponse<List<Factura>> listarFacturaPaginado(FacturaBuscar r);
	
	public OutResponse<Factura> buscarFactura(Factura c);
}
