package com.empresa.proyecto.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.empresa.proyecto.dao.FacturaDao;
import com.empresa.proyecto.dto.request.FacturaBuscar;
import com.empresa.proyecto.dto.response.Factura;
import com.empresa.proyecto.dto.response.FacturaDetalle;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.service.FacturaService;

@Service
public class FacturaServiceImpl implements FacturaService {

	@Autowired
	FacturaDao facturaDao;

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public OutResponse<Factura> registrarFactura(Factura c) throws Exception {
		OutResponse<Factura> out = facturaDao.registrarFactura(c);

		for (FacturaDetalle fd : c.getListaDetalle()) {
			facturaDao.registrarFacturaDetalle(out.getObjeto().getId(), fd);
		}
		return out;
	}

	@Override
	@Transactional(rollbackFor = { Exception.class })
	public OutResponse<?> modificarFactura(Factura c) throws Exception {
		OutResponse<?> out = facturaDao.modificarFactura(c);

		for (FacturaDetalle fd : c.getListaDetalle()) {
			if (fd.getId() == null) {
				facturaDao.registrarFacturaDetalle(c.getId(), fd);
			} else {
				facturaDao.modificarFacturaDetalle(fd);
			}
		}
		return out;
	}

	@Override
	public OutResponse<List<Factura>> listarFactura(Factura r) {
		return facturaDao.listarFactura(r);
	}

	@Override
	public OutResponse<?> eliminarFacturaLogica(Factura r) {
		return facturaDao.eliminarFacturaLogica(r);
	}

	@Override
	public OutResponse<?> eliminarFactura(Factura r) {
		return facturaDao.eliminarFactura(r);
	}

	@Override
	public OutResponse<List<Factura>> listarFacturaPaginado(FacturaBuscar r) {
		return facturaDao.listarFacturaPaginado(r);
	}

	@Override
	public OutResponse<Factura> buscarFactura(Factura c) {
		return facturaDao.buscarFactura(c);
	}

}
