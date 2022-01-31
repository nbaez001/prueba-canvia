package com.empresa.proyecto.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.proyecto.dao.ClienteDao;
import com.empresa.proyecto.dto.request.ClienteBuscar;
import com.empresa.proyecto.dto.response.Cliente;
import com.empresa.proyecto.dto.response.OutResponse;
import com.empresa.proyecto.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {

	@Autowired
	ClienteDao clienteDao;

	@Override
	public OutResponse<Cliente> registrarCliente(Cliente c) {
		return clienteDao.registrarCliente(c);
	}

	@Override
	public OutResponse<?> modificarCliente(Cliente c) {
		return clienteDao.modificarCliente(c);
	}

	@Override
	public OutResponse<List<Cliente>> listarCliente(Cliente r) {
		return clienteDao.listarCliente(r);
	}

	@Override
	public OutResponse<?> eliminarClienteLogica(Cliente r) {
		return clienteDao.eliminarClienteLogica(r);
	}

	@Override
	public OutResponse<?> eliminarCliente(Cliente r) {
		return clienteDao.eliminarCliente(r);
	}

	@Override
	public OutResponse<List<Cliente>> listarClientePaginado(ClienteBuscar r) {
		return clienteDao.listarClientePaginado(r);
	}

}
