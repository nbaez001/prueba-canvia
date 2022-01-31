package com.empresa.proyecto.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.proyecto.dto.request.FacturaBuscar;
import com.empresa.proyecto.dto.response.Factura;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.service.FacturaService;

@RestController
@RequestMapping("/factura")
public class FacturaController {

	Logger log = LoggerFactory.getLogger(FacturaController.class);

	@Autowired
	FacturaService facturaService;

	@PostMapping("/registrarFactura")
	public OutResponse<Factura> registrarFactura(@RequestBody Factura c) {
		OutResponse<Factura> out;
		try {
			out = facturaService.registrarFactura(c);
		} catch (Exception e) {
			out = new OutResponse<>();
			out.setRCodigo(500);
			out.setRMensaje(e.getMessage());
		}
		return out;
	}

	@PostMapping("/modificarFactura")
	public OutResponse<?> modificarFactura(@RequestBody Factura c) {
		OutResponse<?> out;
		try {
			out = facturaService.modificarFactura(c);
		} catch (Exception e) {
			out = new OutResponse<>();
			out.setRCodigo(500);
			out.setRMensaje(e.getMessage());
		}
		return out;
	}

	@PostMapping("/listarFactura")
	public OutResponse<List<Factura>> listarFactura(@RequestBody Factura c) {
		return facturaService.listarFactura(c);
	}

	@PostMapping("/eliminarFacturaLogica")
	public OutResponse<?> eliminarFacturaLogica(@RequestBody Factura c) {
		return facturaService.eliminarFacturaLogica(c);
	}

	@PostMapping("/eliminarFactura")
	public OutResponse<?> eliminarFactura(@RequestBody Factura c) {
		return facturaService.eliminarFactura(c);
	}

	@PostMapping("/listarFacturaPaginado")
	public OutResponse<List<Factura>> listarFacturaPaginado(@RequestBody FacturaBuscar r) {
		return facturaService.listarFacturaPaginado(r);
	}
	
	@PostMapping("/buscarFactura")
	public OutResponse<Factura> buscarFactura(@RequestBody Factura c) {
		return facturaService.buscarFactura(c);
	}
}
